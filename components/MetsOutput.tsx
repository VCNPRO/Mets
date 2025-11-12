
import React, { useMemo } from 'react';
import Button from './Button';

interface MetsOutputProps {
  xmlString: string;
  onDownload: () => void;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    hasHeader: boolean;
    hasDmdSec: boolean;
    hasAmdSec: boolean;
    hasFileSec: boolean;
    hasStructMap: boolean;
    fileCount: number;
    hasChecksums: boolean;
  };
}

const validateXml = (xmlString: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Basic XML structure validation
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  const parserError = xmlDoc.querySelector('parsererror');

  if (parserError) {
    errors.push('XML mal formado: ' + parserError.textContent);
    return {
      isValid: false,
      errors,
      warnings,
      stats: {
        hasHeader: false,
        hasDmdSec: false,
        hasAmdSec: false,
        hasFileSec: false,
        hasStructMap: false,
        fileCount: 0,
        hasChecksums: false,
      },
    };
  }

  // Check for required elements
  const hasHeader = xmlString.includes('<mets:metsHdr');
  const hasDmdSec = xmlString.includes('<mets:dmdSec');
  const hasAmdSec = xmlString.includes('<mets:amdSec');
  const hasFileSec = xmlString.includes('<mets:fileSec');
  const hasStructMap = xmlString.includes('<mets:structMap');

  // Check for checksums
  const hasChecksums = xmlString.includes('CHECKSUM=');

  // Count files
  const fileMatches = xmlString.match(/<mets:file /g);
  const fileCount = fileMatches ? fileMatches.length : 0;

  // Validation rules
  if (!hasHeader) {
    warnings.push('No se encontró metsHdr (recomendado por el estándar METS)');
  }

  if (!hasDmdSec) {
    errors.push('Falta dmdSec (metadatos descriptivos obligatorios)');
  }

  if (!hasFileSec) {
    warnings.push('No se encontró fileSec (sección de archivos)');
  }

  if (!hasStructMap) {
    warnings.push('No se encontró structMap (mapa estructural)');
  }

  if (hasFileSec && !hasChecksums) {
    warnings.push('Los archivos no tienen checksums (recomendado para preservación)');
  }

  if (fileCount === 0) {
    warnings.push('No hay archivos en la sección fileSec');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: {
      hasHeader,
      hasDmdSec,
      hasAmdSec,
      hasFileSec,
      hasStructMap,
      fileCount,
      hasChecksums,
    },
  };
};

const MetsOutput: React.FC<MetsOutputProps> = ({ xmlString, onDownload }) => {
  const validation = useMemo(() => {
    if (!xmlString) return null;
    return validateXml(xmlString);
  }, [xmlString]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">XML METS Generado</h2>
      {xmlString ? (
        <>
          {/* Validation Results */}
          {validation && (
            <div className="mb-4">
              <div className={`p-4 rounded-lg ${validation.isValid ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{validation.isValid ? '✅' : '⚠️'}</span>
                  <h3 className="font-bold text-lg">
                    {validation.isValid ? 'XML Válido' : 'XML Generado con Advertencias'}
                  </h3>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                  <div className="text-sm">
                    {validation.stats.hasHeader ? '✅' : '⚠️'} metsHdr
                  </div>
                  <div className="text-sm">
                    {validation.stats.hasDmdSec ? '✅' : '❌'} dmdSec
                  </div>
                  <div className="text-sm">
                    {validation.stats.hasAmdSec ? '✅' : '⚠️'} amdSec
                  </div>
                  <div className="text-sm">
                    {validation.stats.hasFileSec ? '✅' : '⚠️'} fileSec
                  </div>
                  <div className="text-sm">
                    {validation.stats.hasStructMap ? '✅' : '⚠️'} structMap
                  </div>
                  <div className="text-sm">
                    {validation.stats.hasChecksums ? '✅' : '⚠️'} Checksums
                  </div>
                </div>

                <div className="text-sm text-gray-700">
                  📁 {validation.stats.fileCount} archivo{validation.stats.fileCount !== 1 ? 's' : ''} incluido{validation.stats.fileCount !== 1 ? 's' : ''}
                </div>

                {/* Errors */}
                {validation.errors.length > 0 && (
                  <div className="mt-3">
                    <p className="font-semibold text-red-700 mb-1">❌ Errores:</p>
                    <ul className="list-disc list-inside text-sm text-red-600">
                      {validation.errors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warnings */}
                {validation.warnings.length > 0 && (
                  <div className="mt-3">
                    <p className="font-semibold text-yellow-700 mb-1">⚠️ Advertencias:</p>
                    <ul className="list-disc list-inside text-sm text-yellow-600">
                      {validation.warnings.map((warning, i) => (
                        <li key={i}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

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
