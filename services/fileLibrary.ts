
import { FileEntry } from '../types';

const LIBRARY_KEY = 'annamets_file_library';

export interface LibraryFile extends FileEntry {
  addedAt: string; // ISO timestamp when added to library
  tags?: string[]; // User-defined tags for organization
}

export interface FileLibrary {
  files: LibraryFile[];
  lastUpdated: string;
}

/**
 * Get all files from the library
 */
export const getLibrary = (): FileLibrary => {
  try {
    const stored = localStorage.getItem(LIBRARY_KEY);
    if (!stored) {
      return { files: [], lastUpdated: new Date().toISOString() };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading file library:', error);
    return { files: [], lastUpdated: new Date().toISOString() };
  }
};

/**
 * Save files to the library
 */
export const saveLibrary = (library: FileLibrary): void => {
  try {
    library.lastUpdated = new Date().toISOString();
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  } catch (error) {
    console.error('Error saving file library:', error);
  }
};

/**
 * Add files to the library (avoid duplicates based on MD5)
 */
export const addFilesToLibrary = (files: FileEntry[]): number => {
  const library = getLibrary();
  let addedCount = 0;

  files.forEach(file => {
    // Check if file already exists (by MD5 checksum)
    const exists = library.files.some(
      existing => existing.md5 && file.md5 && existing.md5 === file.md5
    );

    if (!exists) {
      const libraryFile: LibraryFile = {
        ...file,
        addedAt: new Date().toISOString(),
      };
      library.files.push(libraryFile);
      addedCount++;
    }
  });

  if (addedCount > 0) {
    saveLibrary(library);
  }

  return addedCount;
};

/**
 * Remove a file from the library by ID
 */
export const removeFileFromLibrary = (id: string): void => {
  const library = getLibrary();
  library.files = library.files.filter(file => file.id !== id);
  saveLibrary(library);
};

/**
 * Get files by type (video, audio, image, etc.)
 */
export const getFilesByType = (type: 'video' | 'audio' | 'image' | 'document' | 'other'): LibraryFile[] => {
  const library = getLibrary();

  return library.files.filter(file => {
    const mimeType = file.mimeType.toLowerCase();
    switch (type) {
      case 'video':
        return mimeType.startsWith('video/');
      case 'audio':
        return mimeType.startsWith('audio/');
      case 'image':
        return mimeType.startsWith('image/');
      case 'document':
        return mimeType.includes('pdf') ||
               mimeType.includes('document') ||
               mimeType.includes('text');
      default:
        return !mimeType.startsWith('video/') &&
               !mimeType.startsWith('audio/') &&
               !mimeType.startsWith('image/');
    }
  });
};

/**
 * Search files by name
 */
export const searchFiles = (query: string): LibraryFile[] => {
  const library = getLibrary();
  const lowerQuery = query.toLowerCase();

  return library.files.filter(file =>
    file.name.toLowerCase().includes(lowerQuery) ||
    file.mimeType.toLowerCase().includes(lowerQuery) ||
    (file.tags && file.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
};

/**
 * Get library statistics
 */
export const getLibraryStats = () => {
  const library = getLibrary();

  return {
    total: library.files.length,
    video: getFilesByType('video').length,
    audio: getFilesByType('audio').length,
    image: getFilesByType('image').length,
    document: getFilesByType('document').length,
    other: getFilesByType('other').length,
    totalSize: library.files.reduce((sum, file) => sum + file.size, 0),
  };
};

/**
 * Clear the entire library
 */
export const clearLibrary = (): void => {
  if (confirm('¿Estás seguro de que quieres borrar toda la biblioteca? Esta acción no se puede deshacer.')) {
    localStorage.removeItem(LIBRARY_KEY);
  }
};

/**
 * Export library to JSON for backup
 */
export const exportLibrary = (): void => {
  const library = getLibrary();
  const dataStr = JSON.stringify(library, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `annamets_library_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Import library from JSON backup
 */
export const importLibrary = (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (imported.files && Array.isArray(imported.files)) {
          saveLibrary(imported);
          resolve();
        } else {
          reject(new Error('Archivo de biblioteca inválido'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Error leyendo el archivo'));
    reader.readAsText(file);
  });
};
