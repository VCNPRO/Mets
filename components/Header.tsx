
import React, { useState } from 'react';
import GuideViewer from './GuideViewer';
import AIConfig from './AIConfig';

interface HeaderProps {
  isEuskadi?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isEuskadi = false }) => {
  const [showGuides, setShowGuides] = useState(false);
  const [showAIConfig, setShowAIConfig] = useState(false);

  const headerGradient = isEuskadi
    ? 'bg-gradient-to-r from-green-700 via-green-600 to-red-600'
    : 'bg-gradient-to-r from-blue-600 to-indigo-700';

  return (
    <>
      <header className={`${headerGradient} text-white p-6 shadow-lg mb-8`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-orbitron">annamets XML Builder</h1>
              <p className="mt-2 text-lg opacity-90">Crea archivos METS profesionales para tus objetos digitales</p>
            </div>
            {isEuskadi && (
              <div className="hidden md:flex items-center gap-2 ml-4 px-4 py-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
                <span className="text-3xl">🏴</span>
                <span className="text-sm font-semibold">Euskadi</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAIConfig(true)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2"
              aria-label="Configurar IA"
            >
              <span className="text-xl">🤖</span>
              <span className="hidden md:inline">IA</span>
            </button>
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
      <AIConfig isOpen={showAIConfig} onClose={() => setShowAIConfig(false)} />
    </>
  );
};

export default Header;
