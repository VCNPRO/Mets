import { AIMetadata, AIGeneratedFile } from '../types';

export interface AIAnalysisOptions {
  transcription: boolean;
  contentAnalysis: boolean;
  sceneDetection: boolean;
  generateSubtitles: boolean;
}

/**
 * Main AI analysis function - NOW CALLS THE BACKEND
 */
export const analyzeFileWithAI = async (
  file: File,
  options: AIAnalysisOptions,
  onProgress?: (stage: string, progress: string) => void
): Promise<{ aiMetadata: AIMetadata; generatedFiles: AIGeneratedFile[] }> => {
  
  onProgress?.('upload', 'Enviando archivo al servidor...');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('options', JSON.stringify(options));

  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      body: formData,
    });

    onProgress?.('processing', 'El servidor está procesando el archivo...');

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error desconocido del servidor.' }));
      throw new Error(errorData.error || `Error del servidor: ${response.statusText}`);
    }

    onProgress?.('complete', 'Análisis completado.');

    const result = await response.json();
    return result as { aiMetadata: AIMetadata; generatedFiles: AIGeneratedFile[] };

  } catch (error) {
    console.error('AI analysis error:', error);
    onProgress?.('error', (error as Error).message);
    throw error;
  }
};

/**
 * Download a generated file
 */
export const downloadGeneratedFile = (generatedFile: AIGeneratedFile): void => {
  const blob = new Blob([generatedFile.content], {
    type: generatedFile.format === 'json' ? 'application/json' : 'text/plain',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = generatedFile.fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
