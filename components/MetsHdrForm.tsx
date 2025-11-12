
import React, { useEffect } from 'react';
import { MetsHdrData } from '../types';
import Input from './Input';
import Select from './Select';

interface MetsHdrFormProps {
  data: MetsHdrData | null;
  onChange: (data: MetsHdrData) => void;
}

const MetsHdrForm: React.FC<MetsHdrFormProps> = ({ data, onChange }) => {
  // Initialize with default values if not set
  useEffect(() => {
    if (!data) {
      onChange({
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'INDIVIDUAL',
        agentRole: 'CREATOR',
      });
    }
  }, []);

  const handleChange = (field: keyof MetsHdrData, value: any) => {
    onChange({
      ...data!,
      [field]: value,
    });
  };

  if (!data) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="createDate" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Creación <span className="text-red-500">*</span>
          </label>
          <input
            id="createDate"
            type="datetime-local"
            value={data.createDate ? new Date(data.createDate).toISOString().slice(0, 16) : ''}
            onChange={(e) => handleChange('createDate', new Date(e.target.value).toISOString())}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="mt-1 text-xs text-gray-500">Fecha de creación del documento METS</p>
        </div>

        <div>
          <label htmlFor="lastModDate" className="block text-sm font-medium text-gray-700 mb-1">
            Última Modificación
          </label>
          <input
            id="lastModDate"
            type="datetime-local"
            value={data.lastModDate ? new Date(data.lastModDate).toISOString().slice(0, 16) : ''}
            onChange={(e) => handleChange('lastModDate', e.target.value ? new Date(e.target.value).toISOString() : undefined)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">Se actualiza automáticamente al regenerar</p>
        </div>
      </div>

      <Select
        label="Estado del Registro"
        value={data.recordStatus || 'NEW'}
        onChange={(value) => handleChange('recordStatus', value as MetsHdrData['recordStatus'])}
        options={[
          { value: 'NEW', label: 'Nuevo' },
          { value: 'INCOMPLETE', label: 'Incompleto' },
          { value: 'COMPLETE', label: 'Completo' },
          { value: 'DELETED', label: 'Eliminado' },
        ]}
      />

      <hr className="my-6 border-gray-200" />

      <h4 className="text-md font-semibold text-gray-800 mb-3">Información del Agente Responsable</h4>

      <Input
        label="Nombre del Agente"
        value={data.agentName || ''}
        onChange={(value) => handleChange('agentName', value)}
        placeholder="Ej: Juan Pérez, Biblioteca Nacional"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Tipo de Agente"
          value={data.agentType || 'INDIVIDUAL'}
          onChange={(value) => handleChange('agentType', value as MetsHdrData['agentType'])}
          options={[
            { value: 'INDIVIDUAL', label: 'Individual' },
            { value: 'ORGANIZATION', label: 'Organización' },
            { value: 'OTHER', label: 'Otro' },
          ]}
        />

        <Select
          label="Rol del Agente"
          value={data.agentRole || 'CREATOR'}
          onChange={(value) => handleChange('agentRole', value as MetsHdrData['agentRole'])}
          options={[
            { value: 'CREATOR', label: 'Creador' },
            { value: 'EDITOR', label: 'Editor' },
            { value: 'ARCHIVIST', label: 'Archivista' },
            { value: 'PRESERVATION', label: 'Preservación' },
            { value: 'DISSEMINATOR', label: 'Diseminador' },
            { value: 'CUSTODIAN', label: 'Custodio' },
            { value: 'IPOWNER', label: 'Propietario IP' },
            { value: 'OTHER', label: 'Otro' },
          ]}
        />
      </div>

      <div>
        <label htmlFor="agentNote" className="block text-sm font-medium text-gray-700 mb-1">
          Nota sobre el Agente
        </label>
        <textarea
          id="agentNote"
          value={data.agentNote || ''}
          onChange={(e) => handleChange('agentNote', e.target.value)}
          placeholder="Información adicional sobre el agente responsable"
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>💡 Información:</strong> El encabezado METS (metsHdr) es obligatorio según el estándar y proporciona
          información sobre el documento METS mismo, no sobre el objeto digital que describe.
        </p>
      </div>
    </div>
  );
};

export default MetsHdrForm;
