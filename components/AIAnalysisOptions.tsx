
import React, { useState } from 'react';
import Button from './Button';
import { AIAnalysisOptions, hasAPIKeys } from '../services/aiAnalysis';

interface AIAnalysisOptionsProps {
  isOpen: boolean;
  fileName: string;
  fileType: string;
  onClose: () => void;
  onAnalyze: (options: AIAnalysisOptions) => void;
  onConfigureAPI: () => void;
}

const AIAnalysisOptionsComponent: React.FC<AIAnalysisOptionsProps> = ({
  isOpen,
  fileName,
  fileType,
  onClose,
  onAnalyze,
  onConfigureAPI,
}) => {
  const [options, setOptions] = useState<AIAnalysisOptions>({
    transcription: true,
    contentAnalysis: true,
    sceneDetection: false,
    generateSubtitles: true,
  });

  const configured = hasAPIKeys();
  const isAudioVideo = fileType.startsWith('audio/') || fileType.startsWith('video/');

  const handleToggle = (key: keyof AIAnalysisOptions) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAnalyze = () => {
    onAnalyze(options);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-t-lg">
          <h2 className="text-xl font-bold">🤖 Análisis con IA</h2>
          <p className="text-purple-100 text-sm mt-1">{fileName}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* API Keys Warning */}
          {(!configured.whisper || !configured.gemini) && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md mb-4">
              <div className="flex items-start">
                <span className="text-lg mr-2">⚠️</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">API Keys no configuradas</p>
                  <p className="text-xs mt-1">
                    {!configured.whisper && '• OpenAI/Whisper no configurado'}
                    {!configured.whisper && <br />}
                    {!configured.gemini && '• Google Gemini no configurado'}
                  </p>
                  <button
                    onClick={onConfigureAPI}
                    className="text-xs text-yellow-900 underline mt-2 hover:text-yellow-700"
                  >
                    Configurar ahora →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Options */}
          {isAudioVideo ? (
            <div className="space-y-4">
              {/* Transcription */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.transcription}
                    onChange={() => handleToggle('transcription')}
                    disabled={!configured.whisper}
                    className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 disabled:opacity-50"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900">🎙️ Transcripción Automática</span>
                      {!configured.whisper && (
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                          Requiere OpenAI
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Transcribe el audio completo con timestamps precisos usando Whisper
                    </p>
                  </div>
                </label>
              </div>

              {/* Subtitles */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.generateSubtitles}
                    onChange={() => handleToggle('generateSubtitles')}
                    disabled={!options.transcription || !configured.whisper}
                    className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 disabled:opacity-50"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900">📝 Generar Subtítulos</span>
                      {!options.transcription && (
                        <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          Requiere transcripción
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Crea archivos .srt y .vtt con subtítulos sincronizados
                    </p>
                  </div>
                </label>
              </div>

              {/* Content Analysis */}
              <div className="border border-gray-200 rounded-lg p-4">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.contentAnalysis}
                    onChange={() => handleToggle('contentAnalysis')}
                    disabled={!options.transcription || !configured.gemini}
                    className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 disabled:opacity-50"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-900">🧠 Análisis de Contenido</span>
                      {!configured.gemini && (
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                          Requiere Gemini
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Resumen, keywords, temas, sentimiento y entidades detectadas
                    </p>
                  </div>
                </label>
              </div>

              {/* Scene Detection */}
              {fileType.startsWith('video/') && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.sceneDetection}
                      onChange={() => handleToggle('sceneDetection')}
                      className="mt-1 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-900">🎬 Detección de Escenas</span>
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          Beta
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Identifica cambios de escena y segmenta el video
                      </p>
                    </div>
                  </label>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-2 block">📄</span>
              <p>El análisis con IA solo está disponible para archivos de audio y video</p>
            </div>
          )}

          {/* Estimated Time */}
          {isAudioVideo && (options.transcription || options.contentAnalysis) && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                ⏱️ <strong>Tiempo estimado:</strong> 30-60 segundos por minuto de audio/video
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleAnalyze}
            disabled={
              !isAudioVideo ||
              (!options.transcription && !options.contentAnalysis && !options.sceneDetection) ||
              (options.transcription && !configured.whisper) ||
              (options.contentAnalysis && !configured.gemini)
            }
          >
            🚀 Analizar con IA
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisOptionsComponent;
