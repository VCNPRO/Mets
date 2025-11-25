
import React, { useState } from 'react';
import GuideViewer from './GuideViewer';

interface HeaderProps {
  isEuskadi?: boolean;
  isHispana?: boolean;
  isGalicia?: boolean;
  onSelectTemplate: (templateId: string) => void;
  onNewProject: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isEuskadi = false, 
  isHispana = false, 
  isGalicia = false,
  onSelectTemplate,
  onNewProject 
}) => {
  const [showGuides, setShowGuides] = useState(false);

  const headerGradient = isEuskadi
    ? 'bg-gradient-to-r from-green-700 via-green-600 to-red-600'
    : isHispana
    ? 'bg-gradient-to-r from-red-600 via-yellow-500 to-red-700'
    : isGalicia
    ? 'bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500'
    : 'bg-gradient-to-r from-blue-600 to-indigo-700';

  const regionLabel = isEuskadi ? '🏴 Euskadi' : isHispana ? '🇪🇸 Hispana' : isGalicia ? '🏴 Galicia' : null;

  const handleTemplateSelection = (templateId: string) => {
    if (confirm('¿Estás seguro? Esto reemplazará tu proyecto actual con la nueva plantilla.')) {
      onSelectTemplate(templateId);
    }
  }

  return (
    <>
      <header className={`${headerGradient} text-white p-6 shadow-lg mb-8`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-orbitron">annamets XML Builder</h1>
              <p className="mt-2 text-lg opacity-90">Crea archivos METS profesionales para tus objetos digitales</p>
            </div>
            {regionLabel && (
              <div className="hidden md:flex items-center gap-2 ml-4 px-4 py-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
                <span className="text-sm font-semibold">{regionLabel}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white bg-opacity-20 rounded-lg p-1 flex gap-1">
              <button
                onClick={onNewProject}
                className="bg-white bg-opacity-10 hover:bg-opacity-30 px-3 py-1 rounded-md text-sm font-semibold transition-all hover:scale-105"
                title="Abrir selector de plantillas"
              >
                🎨 Plantillas
              </button>
              <button
                onClick={() => handleTemplateSelection('euskadi-preservation-nonserial')}
                className="hover:bg-opacity-30 px-3 py-1 rounded-md text-sm font-semibold transition-all hover:scale-105"
                title="Cargar plantilla de Biblioteca Digital de Euskadi"
              >
                🏴 Euskadi
              </button>
              <button
                onClick={() => handleTemplateSelection('hispana-monograph')}
                className="hover:bg-opacity-30 px-3 py-1 rounded-md text-sm font-semibold transition-all hover:scale-105"
                title="Cargar plantilla de Hispana / BVPB"
              >
                🇪🇸 Hispana
              </button>
              <button
                onClick={() => handleTemplateSelection('galicia-monograph')}
                className="hover:bg-opacity-30 px-3 py-1 rounded-md text-sm font-semibold transition-all hover:scale-105"
                title="Cargar plantilla de Biblioteca Dixital de Galicia"
              >
                🏴 Galicia
              </button>
            </div>

            <button
              onClick={() => setShowGuides(true)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2"
              aria-label="Ver guías de usuario"
            >
              <span className="text-xl">📚</span>
              <span className="hidden md:inline">Guías</span>
            </button>
          </div>
        </div>
      </header>
      <GuideViewer isOpen={showGuides} onClose={() => setShowGuides(false)} />
    </>
  );
};

export default Header;
