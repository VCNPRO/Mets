
import React, { useState, useCallback } from 'react';
import { MetsState, DmdSecData, AmdSecData, FileEntry, StructMapItem, MetsHdrData } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import SectionCard from './components/SectionCard';
import MetsHdrForm from './components/MetsHdrForm';
import DmdSecForm from './components/DmdSecForm';
import AmdSecForm from './components/AmdSecForm';
import FileSecForm from './components/FileSecForm';
import StructMapForm from './components/StructMapForm';
import MetsOutput from './components/MetsOutput';
import Button from './components/Button';
import { generateMetsXml } from './services/metsService';

const App: React.FC = () => {
  const [metsState, setMetsState] = useState<MetsState>({
    metsHdr: null,
    dmdSec: null,
    amdSec: null,
    fileSec: [],
    structMaps: [],
    structLinks: [],
    structMap: [], // deprecated but kept for compatibility
  });
  const [generatedXml, setGeneratedXml] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMetsHdrChange = useCallback((data: MetsHdrData) => {
    setMetsState(prevState => ({ ...prevState, metsHdr: data }));
  }, []);

  const handleDmdSecChange = useCallback((data: DmdSecData) => {
    setMetsState(prevState => ({ ...prevState, dmdSec: data }));
  }, []);

  const handleAmdSecChange = useCallback((data: AmdSecData) => {
    setMetsState(prevState => ({ ...prevState, amdSec: data }));
  }, []);

  const handleAddFiles = useCallback((newFiles: FileEntry[]) => {
    setMetsState(prevState => ({
      ...prevState,
      fileSec: [...prevState.fileSec, ...newFiles],
    }));
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setMetsState(prevState => ({
      ...prevState,
      fileSec: prevState.fileSec.filter(file => file.id !== id),
      structMap: prevState.structMap.map(item => ({
        ...item,
        fileIds: item.fileIds.filter(fileId => fileId !== id)
      })) // Also remove from structMap if referenced
    }));
  }, []);

  const handleStructMapChange = useCallback((structMap: StructMapItem[]) => {
    setMetsState(prevState => ({ ...prevState, structMap }));
  }, []);

  const handleGenerateXml = useCallback(() => {
    setIsLoading(true);
    setError('');
    try {
      // Basic validation
      if (!metsState.dmdSec || !metsState.dmdSec.title.trim()) {
        throw new Error('Por favor, completa la sección de Metadatos Descriptivos.');
      }
      if (metsState.fileSec.length === 0) {
        throw new Error('Por favor, añade al menos un archivo en la Sección de Ficheros.');
      }

      // Update lastModDate in metsHdr
      const updatedState = {
        ...metsState,
        metsHdr: metsState.metsHdr ? {
          ...metsState.metsHdr,
          lastModDate: new Date().toISOString(),
        } : null,
      };

      const xml = generateMetsXml(updatedState);
      setGeneratedXml(xml);
      setMetsState(updatedState); // Update state with new lastModDate
    } catch (e: any) {
      console.error('Error al generar XML METS:', e);
      setError(e.message || 'Error desconocido al generar XML METS.');
      setGeneratedXml('');
    } finally {
      setIsLoading(false);
    }
  }, [metsState]);

  const handleDownloadXml = useCallback(() => {
    if (generatedXml) {
      const blob = new Blob([generatedXml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mets_document.xml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [generatedXml]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <SectionCard
          title="0. Encabezado METS (metsHdr)"
          description="Información sobre el documento METS mismo (fechas, agente responsable, estado).">
          <MetsHdrForm data={metsState.metsHdr} onChange={handleMetsHdrChange} />
        </SectionCard>

        <SectionCard
          title="1. Metadatos Descriptivos (dmdSec)"
          description="Describe qué es el objeto digital (título, autor, fecha, tema).">
          <DmdSecForm data={metsState.dmdSec} onChange={handleDmdSecChange} />
        </SectionCard>

        <SectionCard
          title="2. Metadatos Administrativos (amdSec)"
          description="Describe cómo se gestiona el objeto (derechos, resolución de escáner, acciones de preservación).">
          <AmdSecForm data={metsState.amdSec} onChange={handleAmdSecChange} />
        </SectionCard>

        <SectionCard
          title="3. Sección de Ficheros (fileSec)"
          description="Inventario de todos los archivos físicos que componen el objeto digital.">
          <FileSecForm
            files={metsState.fileSec}
            onAddFiles={handleAddFiles}
            onRemoveFile={handleRemoveFile}
          />
        </SectionCard>

        <SectionCard
          title="4. Mapa Estructural (structMap)"
          description="Define la jerarquía y el orden de los archivos del objeto digital.">
          <StructMapForm
            structMap={metsState.structMap}
            files={metsState.fileSec}
            onChange={handleStructMapChange}
          />
        </SectionCard>

        <div className="my-8 text-center">
          <Button onClick={handleGenerateXml} disabled={isLoading}>
            {isLoading ? 'Generando...' : 'Generar XML METS'}
          </Button>
        </div>

        <SectionCard
          title="Resultado"
          description="Visualiza y descarga el archivo XML METS generado."
          className="mt-8">
          <MetsOutput xmlString={generatedXml} onDownload={handleDownloadXml} />
        </SectionCard>
      </main>
      <Footer />
    </div>
  );
};

export default App;
