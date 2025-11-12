
import React, { useRef, useState } from 'react';
import { FileEntry } from '../types';
import Button from './Button';
import { analyzeFiles } from '../services/fileAnalyzer';
import { exportToCSV, exportToExcel, exportToJSON } from '../services/exportService';
import { addFilesToLibrary } from '../services/fileLibrary';
import FileLibrary from './FileLibrary';

interface FileSecFormProps {
  files: FileEntry[];
  onAddFiles: (newFiles: FileEntry[]) => void;
  onRemoveFile: (id: string) => void;
}

const FileSecForm: React.FC<FileSecFormProps> = ({ files, onAddFiles, onRemoveFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);

  const processFiles = async (fileList: FileList | File[]) => {
    setAnalyzing(true);
    const filesArray = Array.from(fileList);
    setProgress({ current: 0, total: filesArray.length });

    try {
      const analyzedFiles = await analyzeFiles(filesArray, (current, total) => {
        setProgress({ current, total });
      });

      // Save to library automatically
      const addedCount = addFilesToLibrary(analyzedFiles);
      console.log(`Added ${addedCount} new files to library`);

      onAddFiles(analyzedFiles);
    } catch (error) {
      console.error('Error analyzing files:', error);
      // Fallback to basic file entries
      const basicEntries: FileEntry[] = filesArray.map((file: File, index) => ({
        id: `file_${Date.now()}_${index}`,
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        size: file.size,
      }));
      onAddFiles(basicEntries);
    } finally {
      setAnalyzing(false);
      setProgress({ current: 0, total: 0 });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await processFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  return (
    <div>
      {/* Library Button */}
      <div className="mb-4 flex justify-end">
        <Button
          variant="secondary"
          onClick={() => setShowLibrary(true)}
          className="text-sm"
        >
          📚 Abrir Biblioteca de Archivos
        </Button>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 mb-4 transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:border-blue-400'
        } ${analyzing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !analyzing && fileInputRef.current?.click()}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">{isDragging ? '📂' : '📁'}</div>
          <p className="text-gray-700 font-medium mb-1">
            {isDragging ? '¡Suelta los archivos aquí!' : 'Arrastra archivos aquí o haz clic para seleccionar'}
          </p>
          <p className="text-sm text-gray-500">
            Soporta imágenes, videos, audio y documentos • Los archivos se guardan automáticamente en la biblioteca
          </p>
        </div>
      </div>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={analyzing}
        className="hidden"
        ref={fileInputRef}
      />

      {analyzing && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700 font-semibold mb-2">
            Analizando archivos... {progress.current} / {progress.total}
          </p>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
          <p className="text-sm text-blue-600 mt-2">
            Extrayendo metadatos EXIF, calculando checksums (MD5, SHA-256)...
          </p>
        </div>
      )}

      {files.length === 0 ? (
        <p className="text-gray-500 italic">No se han añadido archivos.</p>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-600">
              {files.length} archivo{files.length !== 1 ? 's' : ''} cargado{files.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => exportToCSV(files)}
                className="text-xs py-1 px-3"
              >
                📄 CSV
              </Button>
              <Button
                variant="secondary"
                onClick={() => exportToExcel(files)}
                className="text-xs py-1 px-3"
              >
                📊 Excel
              </Button>
              <Button
                variant="secondary"
                onClick={() => exportToJSON(files)}
                className="text-xs py-1 px-3"
              >
                🔧 JSON
              </Button>
            </div>
          </div>
          <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
            {files.map((file) => (
              <li key={file.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 font-medium">{file.name}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">{file.use}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {Math.round(file.size / 1024)} KB • {file.mimeType}
                    </div>
                    {file.md5 && (
                      <div className="mt-2 text-xs text-gray-500">
                        <div><strong>MD5:</strong> <code className="bg-gray-100 px-1 rounded">{file.md5.substring(0, 16)}...</code></div>
                        <div><strong>SHA-256:</strong> <code className="bg-gray-100 px-1 rounded">{file.sha256?.substring(0, 16)}...</code></div>
                      </div>
                    )}
                    {file.imageTech && (
                      <div className="mt-2 text-xs text-gray-600">
                        📐 {file.imageTech.width} × {file.imageTech.height}px
                        {file.imageTech.xResolution && ` • ${file.imageTech.xResolution}dpi`}
                        {file.imageTech.colorSpace && ` • ${file.imageTech.colorSpace}`}
                      </div>
                    )}
                    {file.exif && (
                      <div className="mt-2 text-xs text-gray-600">
                        📷 {file.exif.make} {file.exif.model}
                        {file.exif.fNumber && ` • f/${file.exif.fNumber}`}
                        {file.exif.exposureTime && ` • ${file.exif.exposureTime}`}
                        {file.exif.iso && ` • ISO ${file.exif.iso}`}
                      </div>
                    )}
                    {file.media && (
                      <div className="mt-2 text-xs text-gray-600">
                        {/* Video metadata */}
                        {file.media.width && file.media.height && (
                          <div>
                            🎬 {file.media.width}×{file.media.height}px
                            {file.media.aspectRatio && ` (${file.media.aspectRatio})`}
                            {file.media.frameRate && ` • ${file.media.frameRate}fps`}
                            {file.media.videoCodec && ` • ${file.media.videoCodec}`}
                          </div>
                        )}
                        {/* Audio/General metadata */}
                        <div>
                          {file.media.duration && `⏱️ ${file.media.duration.toFixed(2)}s`}
                          {file.media.bitrate && ` • ${Math.round(file.media.bitrate / 1000)}kbps`}
                          {file.media.audioCodec && ` • ${file.media.audioCodec}`}
                        </div>
                        {/* Audio specific */}
                        {(file.media.sampleRate || file.media.channels) && (
                          <div>
                            🎵
                            {file.media.sampleRate && ` ${file.media.sampleRate}Hz`}
                            {file.media.channels && ` • ${file.media.channels === 1 ? 'Mono' : file.media.channels === 2 ? 'Estéreo' : `${file.media.channels} canales`}`}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <Button variant="danger" onClick={() => onRemoveFile(file.id)} className="ml-4 p-1 text-xs">
                    Eliminar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* File Library Modal */}
      <FileLibrary
        isOpen={showLibrary}
        onClose={() => setShowLibrary(false)}
        onAddFiles={onAddFiles}
      />
    </div>
  );
};

export default FileSecForm;