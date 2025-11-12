
import { AIMetadata, AIGeneratedFile } from '../types';

const API_KEYS_STORAGE = 'annamets_ai_api_keys';

export interface AIAPIKeys {
  openai?: string; // For Whisper
  gemini?: string; // For Gemini
}

export interface AIAnalysisOptions {
  transcription: boolean;
  contentAnalysis: boolean;
  sceneDetection: boolean;
  generateSubtitles: boolean;
}

/**
 * Save API keys to localStorage (encrypted would be better, but localStorage for now)
 */
export const saveAPIKeys = (keys: AIAPIKeys): void => {
  localStorage.setItem(API_KEYS_STORAGE, JSON.stringify(keys));
};

/**
 * Get API keys from localStorage
 */
export const getAPIKeys = (): AIAPIKeys => {
  const stored = localStorage.getItem(API_KEYS_STORAGE);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
};

/**
 * Check if API keys are configured
 */
export const hasAPIKeys = (): { whisper: boolean; gemini: boolean } => {
  const keys = getAPIKeys();
  return {
    whisper: !!keys.openai,
    gemini: !!keys.gemini,
  };
};

/**
 * Transcribe audio/video file using Whisper API
 */
export const transcribeWithWhisper = async (
  file: File,
  onProgress?: (progress: string) => void
): Promise<AIMetadata['transcription']> => {
  const keys = getAPIKeys();
  if (!keys.openai) {
    throw new Error('OpenAI API key not configured');
  }

  onProgress?.('Preparando archivo para transcripción...');

  // OpenAI Whisper API
  const formData = new FormData();
  formData.append('file', file);
  formData.append('model', 'whisper-1');
  formData.append('response_format', 'verbose_json'); // Get timestamps
  formData.append('timestamp_granularities', 'segment');

  onProgress?.('Enviando a Whisper API...');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${keys.openai}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Whisper API error: ${error.error?.message || response.statusText}`);
  }

  onProgress?.('Procesando transcripción...');

  const data = await response.json();

  return {
    text: data.text,
    language: data.language || 'unknown',
    confidence: 0.9, // Whisper doesn't provide confidence, estimate high
    model: 'whisper-1',
    generatedAt: new Date().toISOString(),
    segments: data.segments?.map((seg: any) => ({
      start: seg.start,
      end: seg.end,
      text: seg.text,
    })),
  };
};

/**
 * Analyze content with Gemini API
 */
export const analyzeWithGemini = async (
  transcriptionText: string,
  fileName: string,
  onProgress?: (progress: string) => void
): Promise<AIMetadata['analysis']> => {
  const keys = getAPIKeys();
  if (!keys.gemini) {
    throw new Error('Gemini API key not configured');
  }

  onProgress?.('Analizando contenido con Gemini...');

  const prompt = `Analiza el siguiente contenido de un archivo audiovisual llamado "${fileName}".

Transcripción:
${transcriptionText}

Por favor, proporciona:
1. Un resumen conciso (2-3 frases)
2. Palabras clave principales (5-10 keywords)
3. Temas/topics tratados (3-5 topics)
4. Sentimiento general (positive, negative, o neutral)
5. Entidades mencionadas (personas, organizaciones, lugares)

Responde en formato JSON con esta estructura:
{
  "summary": "...",
  "keywords": ["...", "..."],
  "topics": ["...", "..."],
  "sentiment": "positive|negative|neutral",
  "entities": [{"name": "...", "type": "person|organization|location"}]
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${keys.gemini}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
  }

  onProgress?.('Procesando análisis...');

  const data = await response.json();
  const responseText = data.candidates[0]?.content?.parts[0]?.text || '{}';

  // Extract JSON from markdown code blocks if present
  let jsonText = responseText;
  const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1];
  }

  const analysis = JSON.parse(jsonText);

  return {
    summary: analysis.summary || 'No summary available',
    keywords: analysis.keywords || [],
    topics: analysis.topics || [],
    sentiment: analysis.sentiment || 'neutral',
    entities: analysis.entities || [],
    model: 'gemini-pro',
    generatedAt: new Date().toISOString(),
  };
};

/**
 * Generate SRT subtitle file from transcription segments
 */
export const generateSRTFile = (
  segments: Array<{ start: number; end: number; text: string }>,
  fileName: string
): AIGeneratedFile => {
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
  };

  let srtContent = '';
  segments.forEach((segment, index) => {
    srtContent += `${index + 1}\n`;
    srtContent += `${formatTime(segment.start)} --> ${formatTime(segment.end)}\n`;
    srtContent += `${segment.text.trim()}\n\n`;
  });

  return {
    type: 'subtitles',
    format: 'srt',
    content: srtContent,
    fileName: fileName.replace(/\.[^.]+$/, '') + '.srt',
    generatedAt: new Date().toISOString(),
  };
};

/**
 * Generate VTT subtitle file from transcription segments
 */
export const generateVTTFile = (
  segments: Array<{ start: number; end: number; text: string }>,
  fileName: string
): AIGeneratedFile => {
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = (seconds % 60).toFixed(3);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.padStart(6, '0')}`;
  };

  let vttContent = 'WEBVTT\n\n';
  segments.forEach((segment, index) => {
    vttContent += `${index + 1}\n`;
    vttContent += `${formatTime(segment.start)} --> ${formatTime(segment.end)}\n`;
    vttContent += `${segment.text.trim()}\n\n`;
  });

  return {
    type: 'subtitles',
    format: 'vtt',
    content: vttContent,
    fileName: fileName.replace(/\.[^.]+$/, '') + '.vtt',
    generatedAt: new Date().toISOString(),
  };
};

/**
 * Generate JSON file with full AI analysis
 */
export const generateAnalysisJSON = (
  aiMetadata: AIMetadata,
  fileName: string
): AIGeneratedFile => {
  return {
    type: 'analysis',
    format: 'json',
    content: JSON.stringify(aiMetadata, null, 2),
    fileName: fileName.replace(/\.[^.]+$/, '') + '_analysis.json',
    generatedAt: new Date().toISOString(),
  };
};

/**
 * Main AI analysis function
 */
export const analyzeFileWithAI = async (
  file: File,
  options: AIAnalysisOptions,
  onProgress?: (stage: string, progress: string) => void
): Promise<{ aiMetadata: AIMetadata; generatedFiles: AIGeneratedFile[] }> => {
  const aiMetadata: AIMetadata = {};
  const generatedFiles: AIGeneratedFile[] = [];

  try {
    // Step 1: Transcription with Whisper (for audio/video)
    if (options.transcription && (file.type.startsWith('audio/') || file.type.startsWith('video/'))) {
      onProgress?.('transcription', 'Iniciando transcripción...');

      const transcription = await transcribeWithWhisper(file, (progress) => {
        onProgress?.('transcription', progress);
      });

      aiMetadata.transcription = transcription;

      // Generate subtitle files if requested
      if (options.generateSubtitles && transcription.segments) {
        const srtFile = generateSRTFile(transcription.segments, file.name);
        const vttFile = generateVTTFile(transcription.segments, file.name);
        generatedFiles.push(srtFile, vttFile);
      }

      // Step 2: Content analysis with Gemini (if we have transcription)
      if (options.contentAnalysis && transcription.text) {
        onProgress?.('analysis', 'Analizando contenido con IA...');

        const analysis = await analyzeWithGemini(transcription.text, file.name, (progress) => {
          onProgress?.('analysis', progress);
        });

        aiMetadata.analysis = analysis;
      }
    }

    // Step 3: Scene detection (basic implementation)
    if (options.sceneDetection && file.type.startsWith('video/')) {
      onProgress?.('scenes', 'Detectando escenas...');
      // For now, create placeholder scenes based on duration
      // In production, you'd use a proper scene detection algorithm
      aiMetadata.scenes = [
        { start: 0, end: 30, description: 'Escena inicial' },
      ];
    }

    // Generate comprehensive analysis JSON
    if (Object.keys(aiMetadata).length > 0) {
      const analysisJson = generateAnalysisJSON(aiMetadata, file.name);
      generatedFiles.push(analysisJson);
    }

    return { aiMetadata, generatedFiles };
  } catch (error) {
    console.error('AI analysis error:', error);
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
