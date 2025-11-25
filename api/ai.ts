/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import formidable from 'formidable';
import fs from 'fs';
import { AIMetadata, AIGeneratedFile } from '../types';

// =================================================================================
// TYPE DEFINITIONS (Duplicated from frontend, consider moving to a shared file)
// =================================================================================

export interface AIAnalysisOptions {
  transcription: boolean;
  contentAnalysis: boolean;
  sceneDetection: boolean;
  generateSubtitles: boolean;
}

// =================================================================================
// CORE AI FUNCTIONS (Moved from frontend service, adapted for backend)
// =================================================================================

/**
 * Transcribe audio/video file using Whisper API
 */
const transcribeWithWhisper = async (
  filePath: string,
  fileOriginalName: string,
): Promise<AIMetadata['transcription']> => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key not configured on the server.');
  }

  const formData = new FormData();
  const fileStream = fs.createReadStream(filePath);
  
  formData.append('file', new Blob([await fs.promises.readFile(filePath)]), fileOriginalName);
  formData.append('model', 'whisper-1');
  formData.append('response_format', 'verbose_json');
  formData.append('timestamp_granularities[]', 'segment');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: formData as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Whisper API error:', error);
    throw new Error(`Whisper API error: ${error.error?.message || response.statusText}`);
  }

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
const analyzeWithGemini = async (
  transcriptionText: string,
  fileName: string,
): Promise<AIMetadata['analysis']> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not configured on the server.');
  }

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
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
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
    console.error('Gemini API error:', error);
    throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const responseText = data.candidates[0]?.content?.parts[0]?.text || '{}';

  let jsonText = responseText;
  const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1];
  }

  try {
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
  } catch(e) {
    console.error("Failed to parse JSON from Gemini response:", jsonText);
    throw new Error("Could not parse analysis from Gemini.");
  }
};


// =================================================================================
// FILE GENERATION HELPERS (Moved from frontend service)
// =================================================================================

const generateSRTFile = (
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

// ... (generateVTTFile and generateAnalysisJSON can be copied here if needed)

// =================================================================================
// MAIN ORCHESTRATION FUNCTION (Backend version of analyzeFileWithAI)
// =================================================================================

const runAIAnalysis = async (
  filePath: string,
  fileOriginalName: string,
  fileType: string,
  options: AIAnalysisOptions,
): Promise<{ aiMetadata: AIMetadata; generatedFiles: AIGeneratedFile[] }> => {
  const aiMetadata: AIMetadata = {};
  const generatedFiles: AIGeneratedFile[] = [];

  // Step 1: Transcription with Whisper
  if (options.transcription && (fileType.startsWith('audio/') || fileType.startsWith('video/'))) {
    const transcription = await transcribeWithWhisper(filePath, fileOriginalName);
    aiMetadata.transcription = transcription;

    if (options.generateSubtitles && transcription.segments) {
      const srtFile = generateSRTFile(transcription.segments, fileOriginalName);
      generatedFiles.push(srtFile);
    }

    // Step 2: Content analysis with Gemini
    if (options.contentAnalysis && transcription.text) {
      const analysis = await analyzeWithGemini(transcription.text, fileOriginalName);
      aiMetadata.analysis = analysis;
    }
  }
  
  // ... Future steps like scene detection would go here ...

  return { aiMetadata, generatedFiles };
};


// =================================================================================
// VERCEL SERVERLESS FUNCTION HANDLER
// =================================================================================

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  // Check for API keys
  if (!process.env.OPENAI_API_KEY || !process.env.GEMINI_API_KEY) {
    console.error('API keys for OpenAI or Gemini are not set on the server.');
    return res.status(500).json({ error: 'AI service is not configured on the server.' });
  }

  const form = formidable({});

  let file: formidable.File | undefined;
  let options: AIAnalysisOptions | undefined;

  try {
    const [fields, files] = await form.parse(req);
    
    // Extract file
    const fileValues = files.file;
    if (Array.isArray(fileValues) && fileValues.length > 0) {
      file = fileValues[0];
    } else if (fileValues) {
      file = fileValues as formidable.File;
    }

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Extract and parse options
    const optionsStr = Array.isArray(fields.options) ? fields.options[0] : fields.options;
    if (!optionsStr) {
      return res.status(400).json({ error: 'No analysis options provided.' });
    }
    options = JSON.parse(optionsStr);


    // Run the analysis
    const result = await runAIAnalysis(
        file.filepath, 
        file.originalFilename || 'file', 
        file.mimetype || 'application/octet-stream', 
        options as AIAnalysisOptions
    );
    
    return res.status(200).json(result);

  } catch (error: any) {
    console.error('AI analysis request failed:', error);
    return res.status(500).json({ error: error.message || 'An internal server error occurred.' });
  } finally {
    // Clean up uploaded file
    if (file) {
      fs.unlink(file.filepath, (err) => {
        if (err) console.error(`Failed to delete temporary file: ${file?.filepath}`, err);
      });
    }
  }
}

// Vercel config to allow larger file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};