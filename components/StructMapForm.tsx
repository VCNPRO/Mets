
import React, { useState } from 'react';
import { FileEntry, StructMapItem } from '../types';
import Button from './Button';
import Input from './Input';
import Select from './Select';

interface StructMapFormProps {
  structMap: StructMapItem[];
  files: FileEntry[];
  onChange: (structMap: StructMapItem[]) => void;
}

const StructMapForm: React.FC<StructMapFormProps> = ({ structMap, files, onChange }) => {
  const [newLabel, setNewLabel] = useState<string>('');
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  const fileOptions = files.map(file => ({ value: file.id, label: file.name }));

  const handleAddStructMapItem = () => {
    if (newLabel.trim() && selectedFileIds.length > 0) {
      const newItem: StructMapItem = {
        id: `div_${Date.now()}`,
        label: newLabel.trim(),
        fileIds: selectedFileIds,
      };
      onChange([...structMap, newItem]);
      setNewLabel('');
      setSelectedFileIds([]);
    }
  };

  const handleRemoveStructMapItem = (id: string) => {
    onChange(structMap.filter(item => item.id !== id));
  };

  const handleMoveItem = (id: string, direction: 'up' | 'down') => {
    const index = structMap.findIndex(item => item.id === id);
    if (index === -1) return;

    const newStructMap = [...structMap];
    if (direction === 'up' && index > 0) {
      [newStructMap[index - 1], newStructMap[index]] = [newStructMap[index], newStructMap[index - 1]];
    } else if (direction === 'down' && index < newStructMap.length - 1) {
      [newStructMap[index + 1], newStructMap[index]] = [newStructMap[index], newStructMap[index + 1]];
    }
    onChange(newStructMap);
  };

  return (
    <div>
      <div className="mb-6 border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Añadir Nueva División Estructural</h3>
        <Input
          id="new-label"
          label="Etiqueta de la División (Ej: Portada, Capítulo 1, Página 1)"
          placeholder="Ej: Portada"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          containerClassName="mb-3"
        />
        {files.length > 0 ? (
          <Select
            id="associate-files"
            label="Asociar Archivos"
            multiple
            value={selectedFileIds}
            onChange={(e) => {
              // Fix: Explicitly type 'option' as HTMLOptionElement to access its value property.
              const options = Array.from(e.target.selectedOptions, (option: HTMLOptionElement) => option.value);
              setSelectedFileIds(options);
            }}
            options={fileOptions}
            className="h-24"
            containerClassName="mb-4"
          />
        ) : (
          <p className="text-gray-500 italic mb-4">Añade archivos en la sección de Ficheros para asociarlos.</p>
        )}
        <Button onClick={handleAddStructMapItem} disabled={!newLabel.trim() || selectedFileIds.length === 0 || files.length === 0}>
          Añadir División
        </Button>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-3">Divisiones Estructurales Definidas</h3>
      {structMap.length === 0 ? (
        <p className="text-gray-500 italic">No se han definido divisiones estructurales.</p>
      ) : (
        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
          {structMap.map((item, index) => (
            <li key={item.id} className="p-4 flex items-center justify-between bg-white hover:bg-gray-50">
              <div className="flex-grow">
                <p className="font-medium text-gray-800">{item.label}</p>
                <p className="text-sm text-gray-600">
                  Archivos: {item.fileIds.map(id => files.find(f => f.id === id)?.name || `[ID:${id}]`).join(', ')}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button variant="secondary" onClick={() => handleMoveItem(item.id, 'up')} disabled={index === 0} className="p-1 text-sm">
                  ↑
                </Button>
                <Button variant="secondary" onClick={() => handleMoveItem(item.id, 'down')} disabled={index === structMap.length - 1} className="p-1 text-sm">
                  ↓
                </Button>
                <Button variant="danger" onClick={() => handleRemoveStructMapItem(item.id)} className="p-1 text-sm">
                  Eliminar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StructMapForm;