
import React, { useRef } from 'react';
import { FileEntry } from '../types';
import Button from './Button';

interface FileSecFormProps {
  files: FileEntry[];
  onAddFiles: (newFiles: FileEntry[]) => void;
  onRemoveFile: (id: string) => void;
}

const FileSecForm: React.FC<FileSecFormProps> = ({ files, onAddFiles, onRemoveFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Fix: Explicitly type 'file' as File to access its properties.
      const newFileEntries: FileEntry[] = Array.from(e.target.files).map((file: File, index) => ({
        id: `file_${Date.now()}_${index}`, // Simple unique ID
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        size: file.size,
      }));
      onAddFiles(newFileEntries);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the input
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100 mb-4"
        ref={fileInputRef}
      />

      {files.length === 0 ? (
        <p className="text-gray-500 italic">No se han añadido archivos.</p>
      ) : (
        <ul className="border border-gray-200 rounded-md divide-y divide-gray-200 mt-4">
          {files.map((file) => (
            <li key={file.id} className="p-4 flex items-center justify-between">
              <span className="text-gray-700">{file.name} ({Math.round(file.size / 1024)} KB)</span>
              <Button variant="danger" onClick={() => onRemoveFile(file.id)} className="ml-4 p-1 text-xs">
                Eliminar
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileSecForm;