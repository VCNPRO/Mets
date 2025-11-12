
import exifr from 'exifr';
import SparkMD5 from 'spark-md5';
import { FileEntry, ImageTechMetadata, ExifMetadata, MediaMetadata } from '../types';

/**
 * Calculate MD5 checksum for a file
 */
const calculateMD5 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const chunkSize = 2097152; // 2MB chunks
    let currentChunk = 0;
    const chunks = Math.ceil(file.size / chunkSize);

    fileReader.onload = (e) => {
      if (e.target?.result) {
        spark.append(e.target.result as ArrayBuffer);
        currentChunk++;

        if (currentChunk < chunks) {
          loadNext();
        } else {
          resolve(spark.end());
        }
      }
    };

    fileReader.onerror = () => {
      reject(new Error('Error reading file for MD5 calculation'));
    };

    const loadNext = () => {
      const start = currentChunk * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      fileReader.readAsArrayBuffer(file.slice(start, end));
    };

    loadNext();
  });
};

/**
 * Calculate SHA-256 checksum for a file using Web Crypto API
 */
const calculateSHA256 = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

/**
 * Extract EXIF metadata from image files
 */
const extractExifMetadata = async (file: File): Promise<ExifMetadata | undefined> => {
  try {
    const exifData = await exifr.parse(file, {
      tiff: true,
      exif: true,
      gps: true,
      iptc: false,
      icc: false,
    });

    if (!exifData) return undefined;

    const metadata: ExifMetadata = {};

    // Camera information
    if (exifData.Make) metadata.make = exifData.Make;
    if (exifData.Model) metadata.model = exifData.Model;

    // Date
    if (exifData.DateTimeOriginal) {
      metadata.dateTimeOriginal = new Date(exifData.DateTimeOriginal).toISOString();
    }

    // Exposure settings
    if (exifData.ExposureTime) metadata.exposureTime = `${exifData.ExposureTime}s`;
    if (exifData.FNumber) metadata.fNumber = exifData.FNumber;
    if (exifData.ISO) metadata.iso = exifData.ISO;
    if (exifData.FocalLength) metadata.focalLength = exifData.FocalLength;
    if (exifData.LensModel) metadata.lens = exifData.LensModel;

    // GPS
    if (exifData.latitude) metadata.gpsLatitude = exifData.latitude;
    if (exifData.longitude) metadata.gpsLongitude = exifData.longitude;

    // Software
    if (exifData.Software) metadata.software = exifData.Software;

    return Object.keys(metadata).length > 0 ? metadata : undefined;
  } catch (error) {
    console.warn('Failed to extract EXIF metadata:', error);
    return undefined;
  }
};

/**
 * Extract technical metadata from image files
 */
const extractImageTechMetadata = async (file: File): Promise<ImageTechMetadata | undefined> => {
  try {
    // For images, we can use exifr to get technical details
    const imageData = await exifr.parse(file, {
      tiff: true,
      exif: true,
    });

    if (!imageData) {
      // Fallback: use Image element to get basic dimensions
      return await extractImageDimensionsFromElement(file);
    }

    const metadata: ImageTechMetadata = {};

    if (imageData.ImageWidth) metadata.width = imageData.ImageWidth;
    if (imageData.ImageHeight) metadata.height = imageData.ImageHeight;
    if (imageData.BitsPerSample) metadata.bitDepth = imageData.BitsPerSample;
    if (imageData.Orientation) metadata.orientation = imageData.Orientation;
    if (imageData.XResolution) metadata.xResolution = imageData.XResolution;
    if (imageData.YResolution) metadata.yResolution = imageData.YResolution;
    if (imageData.ResolutionUnit) {
      metadata.resolutionUnit = imageData.ResolutionUnit === 2 ? 'inches' :
                                 imageData.ResolutionUnit === 3 ? 'cm' : 'unknown';
    }
    if (imageData.ColorSpace) metadata.colorSpace = imageData.ColorSpace;
    if (imageData.Compression) metadata.compression = String(imageData.Compression);

    return Object.keys(metadata).length > 0 ? metadata : undefined;
  } catch (error) {
    console.warn('Failed to extract image technical metadata:', error);
    return await extractImageDimensionsFromElement(file);
  }
};

/**
 * Fallback method to extract image dimensions using HTML Image element
 */
const extractImageDimensionsFromElement = (file: File): Promise<ImageTechMetadata | undefined> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const metadata: ImageTechMetadata = {
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
      URL.revokeObjectURL(url);
      resolve(metadata);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(undefined);
    };

    img.src = url;
  });
};

/**
 * Extract metadata from audio/video files
 */
const extractMediaMetadata = async (file: File): Promise<MediaMetadata | undefined> => {
  return new Promise((resolve) => {
    const isAudio = file.type.startsWith('audio/');
    const isVideo = file.type.startsWith('video/');

    if (!isAudio && !isVideo) {
      resolve(undefined);
      return;
    }

    const mediaElement = isVideo ? document.createElement('video') : document.createElement('audio');
    const url = URL.createObjectURL(file);

    mediaElement.onloadedmetadata = () => {
      const metadata: MediaMetadata = {
        duration: mediaElement.duration,
      };

      if (isVideo) {
        const videoElement = mediaElement as HTMLVideoElement;
        metadata.frameRate = 30; // Default, actual frame rate is hard to get in browser
      }

      URL.revokeObjectURL(url);
      resolve(metadata);
    };

    mediaElement.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(undefined);
    };

    mediaElement.src = url;
  });
};

/**
 * Determine file use type based on filename and size
 */
const determineFileUse = (fileName: string, size: number): 'master' | 'derivative' | 'thumbnail' | 'archive' => {
  const lowerName = fileName.toLowerCase();

  if (lowerName.includes('thumb') || lowerName.includes('thumbnail')) {
    return 'thumbnail';
  }
  if (lowerName.includes('master') || lowerName.includes('original')) {
    return 'master';
  }
  if (lowerName.includes('derivative') || lowerName.includes('web') || lowerName.includes('preview')) {
    return 'derivative';
  }

  // Heuristic: small files are likely thumbnails, large are masters
  if (size < 100000) { // < 100KB
    return 'thumbnail';
  } else if (size > 5000000) { // > 5MB
    return 'master';
  }

  return 'archive';
};

/**
 * Main function to analyze a file and extract all metadata
 */
export const analyzeFile = async (file: File, index: number): Promise<FileEntry> => {
  const isImage = file.type.startsWith('image/');
  const isMedia = file.type.startsWith('audio/') || file.type.startsWith('video/');

  // Base file entry
  const fileEntry: FileEntry = {
    id: `file_${Date.now()}_${index}`,
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
    created: new Date(file.lastModified).toISOString(),
    modified: new Date(file.lastModified).toISOString(),
    use: determineFileUse(file.name, file.size),
  };

  try {
    // Calculate checksums in parallel
    const [md5, sha256] = await Promise.all([
      calculateMD5(file),
      calculateSHA256(file),
    ]);

    fileEntry.md5 = md5;
    fileEntry.sha256 = sha256;

    // Extract metadata based on file type
    if (isImage) {
      const [imageTech, exif] = await Promise.all([
        extractImageTechMetadata(file),
        extractExifMetadata(file),
      ]);

      if (imageTech) fileEntry.imageTech = imageTech;
      if (exif) fileEntry.exif = exif;
    } else if (isMedia) {
      const media = await extractMediaMetadata(file);
      if (media) fileEntry.media = media;
    }
  } catch (error) {
    console.error(`Error analyzing file ${file.name}:`, error);
  }

  return fileEntry;
};

/**
 * Analyze multiple files in parallel with progress callback
 */
export const analyzeFiles = async (
  files: File[],
  onProgress?: (current: number, total: number) => void
): Promise<FileEntry[]> => {
  const results: FileEntry[] = [];

  for (let i = 0; i < files.length; i++) {
    const fileEntry = await analyzeFile(files[i], i);
    results.push(fileEntry);

    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }

  return results;
};
