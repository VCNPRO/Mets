
import React, { useState } from 'react';
import guiaRapida from '../guides/guia-rapida.md?raw';
import guiaCompleta from '../guides/guia-completa.md?raw';

interface GuideViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const GuideViewer: React.FC<GuideViewerProps> = ({ isOpen, onClose }) => {
  const [selectedGuide, setSelectedGuide] = useState<'rapida' | 'completa'>('rapida');

  if (!isOpen) return null;

  const renderMarkdown = (markdown: string) => {
    // Simple markdown rendering for headings, lists, and basic formatting
    const lines = markdown.split('\n');
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold text-gray-800 mt-4 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold text-purple-700 mt-6 mb-3 border-b-2 border-purple-200 pb-2">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-purple-800 mb-4">{line.replace('# ', '')}</h1>;
      }
      // Bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="mb-2">
            {parts.map((part, i) => i % 2 === 0 ? part : <strong key={i}>{part}</strong>)}
          </p>
        );
      }
      // List items
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return <li key={index} className="ml-6 mb-1 text-gray-700">{line.replace(/^[-•]\s/, '')}</li>;
      }
      // Horizontal rule
      if (line.trim() === '---') {
        return <hr key={index} className="my-6 border-gray-300" />;
      }
      // Table rows (simple detection)
      if (line.startsWith('|')) {
        const cells = line.split('|').filter(cell => cell.trim());
        if (cells[0].includes('---')) return null; // Skip separator row
        return (
          <div key={index} className="grid grid-cols-2 gap-2 border-b border-gray-200 py-2">
            {cells.map((cell, i) => (
              <div key={i} className={i === 0 ? 'font-semibold text-gray-800' : 'text-gray-700'}>
                {cell.trim()}
              </div>
            ))}
          </div>
        );
      }
      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-2"></div>;
      }
      // Regular paragraphs
      return <p key={index} className="mb-2 text-gray-700 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">📚 Guías de Usuario</h2>
            <p className="text-purple-100 text-sm">Documentación de METS Builder</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-purple-800 rounded-full p-2 transition-colors"
            aria-label="Cerrar guías"
          >
            <span className="text-2xl">✕</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setSelectedGuide('rapida')}
            className={`flex-1 px-6 py-3 font-semibold transition-colors ${
              selectedGuide === 'rapida'
                ? 'bg-white text-purple-700 border-b-2 border-purple-700'
                : 'text-gray-600 hover:text-purple-600 hover:bg-gray-100'
            }`}
          >
            🚀 Guía Rápida
          </button>
          <button
            onClick={() => setSelectedGuide('completa')}
            className={`flex-1 px-6 py-3 font-semibold transition-colors ${
              selectedGuide === 'completa'
                ? 'bg-white text-purple-700 border-b-2 border-purple-700'
                : 'text-gray-600 hover:text-purple-600 hover:bg-gray-100'
            }`}
          >
            📖 Guía Completa
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="prose max-w-none">
            {selectedGuide === 'rapida' ? renderMarkdown(guiaRapida) : renderMarkdown(guiaCompleta)}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-600 text-center">
            💬 ¿Tienes dudas? Chatea con <strong>Laia</strong>, tu asistente virtual (botón inferior derecho)
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideViewer;
