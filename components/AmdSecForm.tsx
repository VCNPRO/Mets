
import React from 'react';
import { AmdSecData } from '../types';
import Input from './Input';
import Select from './Select';

interface AmdSecFormProps {
  data: AmdSecData | null;
  onChange: (data: AmdSecData) => void;
}

const AmdSecForm: React.FC<AmdSecFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    onChange({
      ...data,
      [id]: value,
    } as AmdSecData);
  };

  const currentData = data || {
    rightsHolder: '',
    scannerResolution: '',
    preservationActions: '',
    preservationStandard: 'PREMIS',
  };

  return (
    <div>
      <Input
        id="rightsHolder"
        label="Titular de los Derechos"
        placeholder="Ej: Biblioteca Nacional de España"
        value={currentData.rightsHolder}
        onChange={handleChange}
        required
      />
      <Input
        id="scannerResolution"
        label="Resolución de Escáner (ej: 600dpi)"
        placeholder="Ej: 600dpi"
        value={currentData.scannerResolution}
        onChange={handleChange}
      />
      <Input
        id="preservationActions"
        label="Acciones de Preservación Digital"
        placeholder="Ej: Conversión a JPEG2000, OCR"
        value={currentData.preservationActions}
        onChange={handleChange}
      />
      <Select
        id="preservationStandard"
        label="Estándar de Preservación"
        value={currentData.preservationStandard}
        onChange={handleChange}
        options={[{ value: 'PREMIS', label: 'PREMIS' }]}
        required
      />
    </div>
  );
};

export default AmdSecForm;
