
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { getAPIKeys, saveAPIKeys, hasAPIKeys, AIAPIKeys } from '../services/aiAnalysis';

interface AIConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIConfig: React.FC<AIConfigProps> = ({ isOpen, onClose }) => {
  const [keys, setKeys] = useState<AIAPIKeys>({});
  const [showKeys, setShowKeys] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const existingKeys = getAPIKeys();
      setKeys(existingKeys);
      setSaved(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    saveAPIKeys(keys);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const configured = hasAPIKeys();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">🤖 Configuración de IA</h2>
            <p className="text-indigo-100 text-sm">Configura tus API keys para análisis automático</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-indigo-700 rounded-full p-2 transition-colors"
            aria-label="Cerrar configuración"
          >
            <span className="text-2xl">✕</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Success Message */}
          {saved && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              ✅ Configuración guardada correctamente
            </div>
          )}

          {/* OpenAI / Whisper */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                🎙️ OpenAI API Key (Whisper)
                {configured.whisper && <span className="ml-2 text-green-600">✓ Configurada</span>}
              </label>
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Obtener API key →
              </a>
            </div>
            <input
              type={showKeys ? 'text' : 'password'}
              value={keys.openai || ''}
              onChange={(e) => setKeys({ ...keys, openai: e.target.value })}
              placeholder="sk-..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Para transcripción automática de audio/video
            </p>
          </div>

          {/* Gemini */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                🧠 Google Gemini API Key
                {configured.gemini && <span className="ml-2 text-green-600">✓ Configurada</span>}
              </label>
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Obtener API key →
              </a>
            </div>
            <input
              type={showKeys ? 'text' : 'password'}
              value={keys.gemini || ''}
              onChange={(e) => setKeys({ ...keys, gemini: e.target.value })}
              placeholder="AIza..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Para análisis de contenido, resúmenes y keywords
            </p>
          </div>

          {/* Show/Hide Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showKeys"
              checked={showKeys}
              onChange={(e) => setShowKeys(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="showKeys" className="ml-2 text-sm text-gray-700">
              Mostrar API keys
            </label>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Información de Seguridad</h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Las API keys se guardan localmente en tu navegador (localStorage)</li>
              <li>• No se envían a ningún servidor externo excepto OpenAI y Google</li>
              <li>• Puedes eliminarlas en cualquier momento borrando los datos del navegador</li>
              <li>• Mantén tus API keys seguras y no las compartas</li>
            </ul>
          </div>

          {/* Features Info */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">🚀 Funcionalidades con IA</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-purple-800">
              <div>
                <strong>Con Whisper:</strong>
                <ul className="ml-4 mt-1 space-y-0.5">
                  <li>• Transcripción automática</li>
                  <li>• Generación de subtítulos SRT/VTT</li>
                  <li>• Timestamps precisos</li>
                </ul>
              </div>
              <div>
                <strong>Con Gemini:</strong>
                <ul className="ml-4 mt-1 space-y-0.5">
                  <li>• Resumen del contenido</li>
                  <li>• Extracción de keywords</li>
                  <li>• Detección de entidades</li>
                  <li>• Análisis de sentimiento</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!keys.openai && !keys.gemini}
          >
            💾 Guardar Configuración
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIConfig;
