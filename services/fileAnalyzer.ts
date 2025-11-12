
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
 * Infer codec from MIME type
 */
const inferCodec = (mimeType: string): { videoCodec?: string; audioCodec?: string; codec?: string } => {
  const lower = mimeType.toLowerCase();
  const result: { videoCodec?: string; audioCodec?: string; codec?: string } = {};

  // Video codecs
  if (lower.includes('mp4')) {
    result.videoCodec = 'H.264';
    result.audioCodec = 'AAC';
    result.codec = 'H.264/AAC';
  } else if (lower.includes('webm')) {
    result.videoCodec = 'VP8/VP9';
    result.audioCodec = 'Opus/Vorbis';
    result.codec = 'VP8/Opus';
  } else if (lower.includes('avi')) {
    result.videoCodec = 'MPEG-4';
    result.codec = 'MPEG-4';
  } else if (lower.includes('mov') || lower.includes('quicktime')) {
    result.videoCodec = 'H.264';
    result.codec = 'H.264';
  } else if (lower.includes('mkv') || lower.includes('matroska')) {
    result.videoCodec = 'H.264/H.265';
    result.codec = 'H.264';
  }

  // Audio codecs
  if (lower.includes('mp3') || lower.includes('mpeg')) {
    result.audioCodec = 'MP3';
    result.codec = 'MP3';
  } else if (lower.includes('aac')) {
    result.audioCodec = 'AAC';
    result.codec = 'AAC';
  } else if (lower.includes('wav')) {
    result.audioCodec = 'PCM';
    result.codec = 'PCM';
  } else if (lower.includes('ogg') || lower.includes('vorbis')) {
    result.audioCodec = 'Vorbis';
    result.codec = 'Vorbis';
  } else if (lower.includes('opus')) {
    result.audioCodec = 'Opus';
    result.codec = 'Opus';
  } else if (lower.includes('flac')) {
    result.audioCodec = 'FLAC';
    result.codec = 'FLAC';
  }

  return result;
};

/**
 * Calculate aspect ratio from width and height
 */
const calculateAspectRatio = (width: number, height: number): string => {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  const ratioW = width / divisor;
  const ratioH = height / divisor;

  // Common aspect ratios
  if (Math.abs(ratioW / ratioH - 16 / 9) < 0.01) return '16:9';
  if (Math.abs(ratioW / ratioH - 4 / 3) < 0.01) return '4:3';
  if (Math.abs(ratioW / ratioH - 21 / 9) < 0.01) return '21:9';
  if (Math.abs(ratioW / ratioH - 1) < 0.01) return '1:1';

  return `${ratioW}:${ratioH}`;
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

    mediaElement.onloadedmetadata = async () => {
      const metadata: MediaMetadata = {
        duration: mediaElement.duration,
      };

      // Calculate approximate bitrate (bits per second)
      if (mediaElement.duration && mediaElement.duration > 0) {
        metadata.bitrate = Math.round((file.size * 8) / mediaElement.duration);
      }

      // Infer codecs from MIME type
      const codecs = inferCodec(file.type);
      if (codecs.codec) metadata.codec = codecs.codec;

      if (isVideo) {
        const videoElement = mediaElement as HTMLVideoElement;

        // Video dimensions
        if (videoElement.videoWidth && videoElement.videoHeight) {
          metadata.width = videoElement.videoWidth;
          metadata.height = videoElement.videoHeight;
          metadata.aspectRatio = calculateAspectRatio(videoElement.videoWidth, videoElement.videoHeight);
        }

        // Video codec
        if (codecs.videoCodec) {
          metadata.videoCodec = codecs.videoCodec;
        }

        // Audio codec for video container
        if (codecs.audioCodec) {
          metadata.audioCodec = codecs.audioCodec;
        }

        // Frame rate estimation (approximate)
        // Browser doesn't expose this directly, so we estimate common rates
        metadata.frameRate = 30; // Most common, could be 24, 25, 30, 60
      }

      if (isAudio) {
        // Audio codec
        if (codecs.audioCodec) {
          metadata.audioCodec = codecs.audioCodec;
        }

        // Try to get audio context info (channels, sample rate)
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const arrayBuffer = await file.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

          metadata.channels = audioBuffer.numberOfChannels;
          metadata.sampleRate = audioBuffer.sampleRate;

          audioContext.close();
        } catch (e) {
          // If Web Audio API fails, set defaults based on common formats
          console.warn('Could not decode audio with Web Audio API:', e);

          // Common defaults
          metadata.sampleRate = 44100; // CD quality
          metadata.channels = 2; // Stereo
        }
      }

      URL.revokeObjectURL(url);
      resolve(metadata);
    };

    mediaElement.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(undefined);
    };

    mediaElement.src = url;

    // For video, we need to load some data
    if (isVideo) {
      mediaElement.load();
    }
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
