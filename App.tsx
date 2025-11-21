
import React, { useState, useCallback, useEffect } from 'react';
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
import TemplateSelector from './components/TemplateSelector';
import ChatbotWidget from './components/ChatbotWidget';
import { generateMetsXml } from './services/metsService';
import { applyTemplate } from './services/templates';

const App: React.FC = () => {
  const [showTemplateSelector, setShowTemplateSelector] = useState<boolean>(false);
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
  const [projectName, setProjectName] = useState<string>('Proyecto METS');
  const [currentTemplateId, setCurrentTemplateId] = useState<string>('');

  // Load project from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('metsProject');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.metsState) {
          setMetsState(parsed.metsState);
          setProjectName(parsed.projectName || 'Proyecto METS');
          setCurrentTemplateId(parsed.templateId || '');
        }
      } catch (e) {
        console.error('Error loading saved project:', e);
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem('metsProject', JSON.stringify({
        metsState,
        projectName,
        templateId: currentTemplateId,
        savedAt: new Date().toISOString(),
      }));
    }, 1000); // Debounce 1 second

    return () => clearTimeout(saveTimeout);
  }, [metsState, projectName, currentTemplateId]);

  const handleSelectTemplate = useCallback((templateId: string) => {
    const templateData = applyTemplate(templateId);
    setMetsState(prevState => ({
      ...prevState,
      ...templateData,
    }));
    setCurrentTemplateId(templateId);
    setShowTemplateSelector(false);
  }, []);

  const handleSaveProject = useCallback(() => {
    const projectData = {
      metsState,
      projectName,
      templateId: currentTemplateId,
      savedAt: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(projectData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [metsState, projectName, currentTemplateId]);

  const handleLoadProject = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.metsState) {
          setMetsState(parsed.metsState);
          setProjectName(parsed.projectName || 'Proyecto METS');
          setCurrentTemplateId(parsed.templateId || '');
        }
      } catch (error) {
        setError('Error al cargar el proyecto. Archivo inválido.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  }, []);

  const handleNewProject = useCallback(() => {
    if (confirm('¿Estás seguro de que quieres crear un nuevo proyecto? Los cambios no guardados se perderán.')) {
      setShowTemplateSelector(true);
    }
  }, []);

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

  const isEuskadiTemplate = currentTemplateId.startsWith('euskadi');

  return (
    <div className="flex flex-col min-h-screen">
      <Header isEuskadi={isEuskadiTemplate} />

      {showTemplateSelector && (
        <TemplateSelector
          onSelectTemplate={handleSelectTemplate}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Project Controls */}
        <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="text-xl font-bold border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
            />
            {isEuskadiTemplate && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-600 to-red-600 text-white shadow-md">
                <span className="text-lg">🏴</span>
                Biblioteca Digital Euskadi
              </span>
            )}
            <span className="text-sm text-gray-500">
              {metsState.fileSec.length} archivos • Auto-guardado
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleNewProject}>
              🎨 Nueva Plantilla
            </Button>
            <Button variant="secondary" onClick={handleSaveProject}>
              💾 Guardar Proyecto
            </Button>
            <label className="cursor-pointer">
              <span className="px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-500 inline-block">
                📂 Cargar Proyecto
              </span>
              <input
                type="file"
                accept=".json"
                onChange={handleLoadProject}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Metadata */}
          <div className="space-y-6">
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
          </div>

          {/* Right Column - Files & Structure */}
          <div className="space-y-6">
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
          </div>
        </div>

        {/* Generate Button */}
        <div className="my-8 text-center">
          <Button onClick={handleGenerateXml} disabled={isLoading}>
            {isLoading ? 'Generando...' : 'Generar XML METS'}
          </Button>
        </div>

        {/* Result Section - Full Width */}
        <SectionCard
          title="Resultado"
          description="Visualiza y descarga el archivo XML METS generado."
          className="mt-8">
          <MetsOutput xmlString={generatedXml} onDownload={handleDownloadXml} />
        </SectionCard>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default App;
