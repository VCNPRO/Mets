
import React, { useState } from 'react';
import { templates, Template } from '../services/templates';
import Button from './Button';

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
  onClose: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleApply = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
    }
  };

  const categoryNames: Record<string, string> = {
    book: 'Libros',
    magazine: 'Revistas',
    photo: 'Fotografía',
    video: 'Video',
    audio: 'Audio',
    document: 'Documentos',
  };

  // Group templates by category
  const groupedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, Template[]>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Seleccionar Plantilla</h2>
              <p className="text-sm text-gray-600 mt-1">Elige una plantilla para comenzar tu proyecto METS</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
            <div key={category} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {categoryNames[category] || category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`text-left p-4 border-2 rounded-lg transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-4xl">{template.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      {selectedTemplate === template.id && (
                        <div className="text-blue-500 text-xl">✓</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {selectedTemplate ? (
              <>Plantilla seleccionada: <strong>{templates.find(t => t.id === selectedTemplate)?.name}</strong></>
            ) : (
              'Selecciona una plantilla para continuar'
            )}
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleApply} disabled={!selectedTemplate}>
              Aplicar Plantilla
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
