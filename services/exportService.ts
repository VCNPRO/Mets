
import * as XLSX from 'xlsx';
import { FileEntry } from '../types';

/**
 * Format file size in human-readable format
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Format duration in human-readable format (HH:MM:SS)
 */
const formatDuration = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format bitrate in human-readable format
 */
const formatBitrate = (bps: number): string => {
  if (bps === 0) return '0 bps';
  const k = 1000;
  const sizes = ['bps', 'kbps', 'Mbps', 'Gbps'];
  const i = Math.floor(Math.log(bps) / Math.log(k));
  return Math.round(bps / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Convert file entries to flat data structure for export
 */
const convertFilesToExportData = (files: FileEntry[]): any[] => {
  return files.map(file => {
    const row: any = {
      'Nombre': file.name,
      'Tipo MIME': file.mimeType,
      'Tamaño': formatFileSize(file.size),
      'Tamaño (bytes)': file.size,
      'Uso': file.use || 'N/A',
      'MD5': file.md5 || 'N/A',
      'SHA-256': file.sha256 || 'N/A',
    };

    // Image metadata
    if (file.imageTech) {
      row['Ancho (px)'] = file.imageTech.width || 'N/A';
      row['Alto (px)'] = file.imageTech.height || 'N/A';
      row['Resolución X'] = file.imageTech.xResolution || 'N/A';
      row['Resolución Y'] = file.imageTech.yResolution || 'N/A';
      row['Espacio de Color'] = file.imageTech.colorSpace || 'N/A';
      row['Profundidad de Bits'] = file.imageTech.bitDepth || 'N/A';
    }

    // EXIF metadata
    if (file.exif) {
      row['Cámara'] = file.exif.make && file.exif.model ? `${file.exif.make} ${file.exif.model}` : 'N/A';
      row['Fecha Captura'] = file.exif.dateTimeOriginal || 'N/A';
      row['ISO'] = file.exif.iso || 'N/A';
      row['Apertura'] = file.exif.fNumber ? `f/${file.exif.fNumber}` : 'N/A';
      row['Velocidad Obturación'] = file.exif.exposureTime || 'N/A';
      row['Distancia Focal'] = file.exif.focalLength ? `${file.exif.focalLength}mm` : 'N/A';
      row['Lente'] = file.exif.lens || 'N/A';
      row['GPS Latitud'] = file.exif.gpsLatitude || 'N/A';
      row['GPS Longitud'] = file.exif.gpsLongitude || 'N/A';
    }

    // Audio/Video metadata
    if (file.media) {
      row['Duración'] = file.media.duration ? formatDuration(file.media.duration) : 'N/A';
      row['Duración (seg)'] = file.media.duration || 'N/A';
      row['Bitrate'] = file.media.bitrate ? formatBitrate(file.media.bitrate) : 'N/A';
      row['Bitrate (bps)'] = file.media.bitrate || 'N/A';
      row['Codec'] = file.media.codec || 'N/A';

      // Video specific
      if (file.media.width && file.media.height) {
        row['Resolución Video'] = `${file.media.width}x${file.media.height}`;
        row['Ancho (px)'] = file.media.width;
        row['Alto (px)'] = file.media.height;
        row['Relación Aspecto'] = file.media.aspectRatio || 'N/A';
      }
      if (file.media.videoCodec) {
        row['Codec Video'] = file.media.videoCodec;
      }
      if (file.media.frameRate) {
        row['FPS'] = file.media.frameRate;
      }

      // Audio specific
      if (file.media.audioCodec) {
        row['Codec Audio'] = file.media.audioCodec;
      }
      if (file.media.sampleRate) {
        row['Sample Rate'] = `${file.media.sampleRate} Hz`;
        row['Sample Rate (Hz)'] = file.media.sampleRate;
      }
      if (file.media.channels) {
        const channelLabel = file.media.channels === 1 ? 'Mono' :
                           file.media.channels === 2 ? 'Estéreo' :
                           file.media.channels === 6 ? '5.1' : `${file.media.channels} canales`;
        row['Canales Audio'] = channelLabel;
        row['Canales (num)'] = file.media.channels;
      }
    }

    return row;
  });
};

/**
 * Export files to CSV format
 */
export const exportToCSV = (files: FileEntry[], filename: string = 'archivos_metadata'): void => {
  const data = convertFilesToExportData(files);
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export files to Excel (XLSX) format
 */
export const exportToExcel = (files: FileEntry[], filename: string = 'archivos_metadata'): void => {
  const data = convertFilesToExportData(files);

  // Create workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Metadata Archivos');

  // Set column widths
  const colWidths = Object.keys(data[0] || {}).map(() => ({ wch: 15 }));
  worksheet['!cols'] = colWidths;

  // Write file
  XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
};

/**
 * Export files to JSON format
 */
export const exportToJSON = (files: FileEntry[], filename: string = 'archivos_metadata'): void => {
  const jsonStr = JSON.stringify(files, null, 2);

  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export files in all formats (CSV, Excel, JSON)
 */
export const exportAll = (files: FileEntry[], filename: string = 'archivos_metadata'): void => {
  exportToCSV(files, filename);
  exportToExcel(files, filename);
  exportToJSON(files, filename);
};
