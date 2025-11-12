
import React, { useState, useEffect } from 'react';
import Button from './Button';
import {
  getLibrary,
  getFilesByType,
  searchFiles,
  removeFileFromLibrary,
  getLibraryStats,
  clearLibrary,
  exportLibrary,
  LibraryFile
} from '../services/fileLibrary';
import { FileEntry } from '../types';

interface FileLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFiles: (files: FileEntry[]) => void;
}

const FileLibrary: React.FC<FileLibraryProps> = ({ isOpen, onClose, onAddFiles }) => {
  const [files, setFiles] = useState<LibraryFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<LibraryFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'video' | 'audio' | 'image' | 'document'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState(getLibraryStats());

  useEffect(() => {
    if (isOpen) {
      loadLibrary();
    }
  }, [isOpen]);

  useEffect(() => {
    applyFilters();
  }, [files, filter, searchQuery]);

  const loadLibrary = () => {
    const library = getLibrary();
    setFiles(library.files);
    setStats(getLibraryStats());
    setSelectedFiles(new Set());
  };

  const applyFilters = () => {
    let result = files;

    // Apply type filter
    if (filter !== 'all') {
      result = getFilesByType(filter);
    }

    // Apply search
    if (searchQuery.trim()) {
      result = searchFiles(searchQuery);
    }

    setFilteredFiles(result);
  };

  const toggleFileSelection = (id: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFiles(newSelected);
  };

  const handleAddSelected = () => {
    const filesToAdd = files.filter(file => selectedFiles.has(file.id));
    onAddFiles(filesToAdd);
    setSelectedFiles(new Set());
    onClose();
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar este archivo de la biblioteca?')) {
      removeFileFromLibrary(id);
      loadLibrary();
    }
  };

  const handleClearLibrary = () => {
    clearLibrary();
    loadLibrary();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">📚 Biblioteca de Archivos</h2>
            <p className="text-purple-100 text-sm">
              {stats.total} archivos • {formatFileSize(stats.totalSize)} total
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-purple-800 rounded-full p-2 transition-colors"
            aria-label="Cerrar biblioteca"
          >
            <span className="text-2xl">✕</span>
          </button>
        </div>

        {/* Stats Bar */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex gap-4 flex-wrap">
          <div className="text-sm">
            🎬 Video: <strong>{stats.video}</strong>
          </div>
          <div className="text-sm">
            🎵 Audio: <strong>{stats.audio}</strong>
          </div>
          <div className="text-sm">
            📷 Imagen: <strong>{stats.image}</strong>
          </div>
          <div className="text-sm">
            📄 Documento: <strong>{stats.document}</strong>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Todos los tipos</option>
              <option value="video">🎬 Video</option>
              <option value="audio">🎵 Audio</option>
              <option value="image">📷 Imagen</option>
              <option value="document">📄 Documento</option>
            </select>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={exportLibrary}
                className="text-sm py-2"
              >
                💾 Exportar
              </Button>
              <Button
                variant="danger"
                onClick={handleClearLibrary}
                className="text-sm py-2"
              >
                🗑️ Limpiar
              </Button>
            </div>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredFiles.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-xl mb-2">📂</p>
              <p>
                {searchQuery ? 'No se encontraron archivos' : 'La biblioteca está vacía'}
              </p>
              <p className="text-sm mt-2">
                Los archivos procesados se guardan automáticamente aquí
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedFiles.has(file.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFiles.has(file.id)}
                          onChange={() => {}}
                          className="w-4 h-4"
                        />
                        <span className="font-medium text-sm truncate">{file.name}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file.id);
                      }}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <div>{formatFileSize(file.size)} • {file.mimeType}</div>

                    {file.media && (
                      <>
                        {file.media.width && file.media.height && (
                          <div>🎬 {file.media.width}×{file.media.height}px</div>
                        )}
                        {file.media.duration && (
                          <div>⏱️ {file.media.duration.toFixed(1)}s</div>
                        )}
                        {file.media.sampleRate && (
                          <div>🎵 {file.media.sampleRate}Hz</div>
                        )}
                      </>
                    )}

                    {file.imageTech && (
                      <div>📐 {file.imageTech.width}×{file.imageTech.height}px</div>
                    )}

                    <div className="text-gray-400">
                      Añadido: {new Date(file.addedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedFiles.size > 0 && (
              <span className="font-semibold">{selectedFiles.size} archivo(s) seleccionado(s)</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleAddSelected}
              disabled={selectedFiles.size === 0}
            >
              ➕ Añadir Seleccionados ({selectedFiles.size})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileLibrary;
