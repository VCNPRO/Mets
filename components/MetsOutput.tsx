
import React from 'react';
import Button from './Button';

interface MetsOutputProps {
  xmlString: string;
  onDownload: () => void;
}

const MetsOutput: React.FC<MetsOutputProps> = ({ xmlString, onDownload }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">XML METS Generado</h2>
      {xmlString ? (
        <>
          <pre className="bg-gray-800 text-green-300 p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap break-words max-h-96">
            <code>{xmlString}</code>
          </pre>
          <div className="mt-6 text-center">
            <Button onClick={onDownload} variant="primary">
              Descargar METS XML
            </Button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 italic text-center">Haz clic en "Generar XML METS" para ver el resultado.</p>
      )}
    </div>
  );
};

export default MetsOutput;
