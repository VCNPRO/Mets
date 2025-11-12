
import React, { useState } from 'react';
import { DmdSecData } from '../types';
import Input from './Input';
import Select from './Select';

interface DmdSecFormProps {
  data: DmdSecData | null;
  onChange: (data: DmdSecData) => void;
}

const DmdSecForm: React.FC<DmdSecFormProps> = ({ data, onChange }) => {
  const [showExtendedFields, setShowExtendedFields] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    onChange({
      ...data,
      [id]: value,
    } as DmdSecData);
  };

  const currentData = data || {
    title: '',
    author: '',
    date: '',
    subject: '',
    metadataStandard: 'DublinCore',
  };

  return (
    <div className="space-y-4">
      <Select
        id="metadataStandard"
        label="Estándar de Metadatos"
        value={currentData.metadataStandard}
        onChange={handleChange}
        options={[
          { value: 'DublinCore', label: 'Dublin Core (DC) - 15 elementos' },
          { value: 'MODS', label: 'MODS' },
        ]}
        required
      />

      <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Campos Básicos (Obligatorios)</h4>

        <Input
          id="title"
          label="Título"
          placeholder="Ej: El Quijote"
          value={currentData.title}
          onChange={handleChange}
          required
        />
        <Input
          id="author"
          label="Autor/Creador"
          placeholder="Ej: Miguel de Cervantes"
          value={currentData.author}
          onChange={handleChange}
          required
        />
        <Input
          id="date"
          label="Fecha"
          type="date"
          value={currentData.date}
          onChange={handleChange}
          required
        />
        <Input
          id="subject"
          label="Asunto/Tema"
          placeholder="Ej: Novela clásica española"
          value={currentData.subject}
          onChange={handleChange}
        />
      </div>

      {currentData.metadataStandard === 'DublinCore' && (
        <div>
          <button
            type="button"
            onClick={() => setShowExtendedFields(!showExtendedFields)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2"
          >
            {showExtendedFields ? '▼' : '▶'}
            {showExtendedFields ? 'Ocultar' : 'Mostrar'} Campos Extendidos de Dublin Core (11 adicionales)
          </button>

          {showExtendedFields && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Descripción)
                </label>
                <textarea
                  id="description"
                  value={currentData.description || ''}
                  onChange={handleChange}
                  placeholder="Descripción del recurso"
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <Input
                id="publisher"
                label="Publisher (Editor/Publicador)"
                placeholder="Ej: Editorial Planeta"
                value={currentData.publisher || ''}
                onChange={handleChange}
              />

              <Input
                id="contributor"
                label="Contributor (Contribuidor)"
                placeholder="Ej: Traductor, ilustrador, etc."
                value={currentData.contributor || ''}
                onChange={handleChange}
              />

              <Input
                id="type"
                label="Type (Tipo de Recurso)"
                placeholder="Ej: Text, Image, Sound, Dataset"
                value={currentData.type || ''}
                onChange={handleChange}
              />

              <Input
                id="format"
                label="Format (Formato)"
                placeholder="Ej: application/pdf, image/jpeg"
                value={currentData.format || ''}
                onChange={handleChange}
              />

              <Input
                id="identifier"
                label="Identifier (Identificador)"
                placeholder="Ej: ISBN, DOI, URI"
                value={currentData.identifier || ''}
                onChange={handleChange}
              />

              <Input
                id="source"
                label="Source (Fuente)"
                placeholder="Recurso del cual deriva"
                value={currentData.source || ''}
                onChange={handleChange}
              />

              <Input
                id="language"
                label="Language (Idioma)"
                placeholder="Ej: es, en, fr (código ISO 639)"
                value={currentData.language || ''}
                onChange={handleChange}
              />

              <Input
                id="relation"
                label="Relation (Relación)"
                placeholder="Recurso relacionado"
                value={currentData.relation || ''}
                onChange={handleChange}
              />

              <Input
                id="coverage"
                label="Coverage (Cobertura)"
                placeholder="Ej: España, 1605-1615"
                value={currentData.coverage || ''}
                onChange={handleChange}
              />

              <div>
                <label htmlFor="rights" className="block text-sm font-medium text-gray-700 mb-1">
                  Rights (Derechos)
                </label>
                <textarea
                  id="rights"
                  value={currentData.rights || ''}
                  onChange={handleChange}
                  placeholder="Información sobre derechos de autor y uso"
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mt-3 p-2 bg-white border border-blue-300 rounded text-xs text-blue-800">
                <strong>ℹ️ Dublin Core Completo:</strong> Ahora incluye los 15 elementos estándar de Dublin Core.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DmdSecForm;
