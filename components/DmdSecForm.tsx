
import React from 'react';
import { DmdSecData } from '../types';
import Input from './Input';
import Select from './Select';

interface DmdSecFormProps {
  data: DmdSecData | null;
  onChange: (data: DmdSecData) => void;
}

const DmdSecForm: React.FC<DmdSecFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <div>
      <Input
        id="title"
        label="Título del Objeto Digital"
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
        label="Fecha de Creación/Publicación"
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
      <Select
        id="metadataStandard"
        label="Estándar de Metadatos"
        value={currentData.metadataStandard}
        onChange={handleChange}
        options={[
          { value: 'DublinCore', label: 'Dublin Core (DC)' },
          { value: 'MODS', label: 'MODS' },
        ]}
        required
      />
    </div>
  );
};

export default DmdSecForm;
