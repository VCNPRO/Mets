
export interface DmdSecData {
  title: string;
  author: string;
  date: string;
  subject: string;
  metadataStandard: 'DublinCore' | 'MODS';
  // Extended Dublin Core fields
  description?: string;
  publisher?: string;
  contributor?: string;
  type?: string;
  format?: string;
  identifier?: string;
  source?: string;
  language?: string;
  relation?: string;
  coverage?: string;
  rights?: string;
}

export interface AmdSecData {
  rightsHolder: string;
  scannerResolution: string; // e.g., '600dpi'
  preservationActions: string; // e.g., 'JPEG2000 conversion, OCR'
  preservationStandard: 'PREMIS'; // Only PREMIS mentioned in doc
}

// Technical metadata for images (MIX-compatible)
export interface ImageTechMetadata {
  width?: number;
  height?: number;
  colorSpace?: string;
  bitDepth?: number;
  compression?: string;
  orientation?: number;
  xResolution?: number;
  yResolution?: number;
  resolutionUnit?: string;
}

// EXIF metadata
export interface ExifMetadata {
  make?: string; // Camera manufacturer
  model?: string; // Camera model
  dateTimeOriginal?: string;
  exposureTime?: string;
  fNumber?: number;
  iso?: number;
  focalLength?: number;
  lens?: string;
  gpsLatitude?: number;
  gpsLongitude?: number;
  software?: string;
}

// Audio/Video metadata
export interface MediaMetadata {
  duration?: number; // in seconds
  bitrate?: number;
  codec?: string;
  // Audio specific
  sampleRate?: number; // Hz (e.g., 44100, 48000)
  channels?: number; // 1=mono, 2=stereo, 6=5.1
  audioCodec?: string; // AAC, MP3, WAV, etc.
  // Video specific
  frameRate?: number; // FPS
  videoCodec?: string; // H.264, H.265, VP9, etc.
  width?: number; // video width in pixels
  height?: number; // video height in pixels
  aspectRatio?: string; // e.g., "16:9", "4:3"
}

// AI-generated metadata
export interface AIMetadata {
  // Transcription
  transcription?: {
    text: string;
    language: string;
    confidence: number; // 0-1
    model: string; // e.g., "whisper-large-v3"
    generatedAt: string; // ISO date
    segments?: Array<{
      start: number; // seconds
      end: number; // seconds
      text: string;
    }>;
  };

  // Content analysis (Gemini)
  analysis?: {
    summary: string;
    keywords: string[];
    topics: string[];
    sentiment?: 'positive' | 'negative' | 'neutral';
    entities?: Array<{
      name: string;
      type: string; // person, organization, location, etc.
    }>;
    model: string; // e.g., "gemini-pro"
    generatedAt: string; // ISO date
  };

  // Scene detection
  scenes?: Array<{
    start: number; // seconds
    end: number; // seconds
    description?: string;
  }>;
}

// AI-generated derived files
export interface AIGeneratedFile {
  type: 'transcription' | 'analysis' | 'subtitles';
  format: 'srt' | 'vtt' | 'json' | 'txt';
  content: string;
  fileName: string;
  generatedAt: string;
}

export interface FileEntry {
  id: string; // Unique ID for the file in METS
  name: string; // Original file name
  mimeType: string;
  size: number; // in bytes
  // Checksums for integrity
  md5?: string;
  sha256?: string;
  // File metadata
  created?: string; // ISO date string
  modified?: string; // ISO date string
  // Technical metadata based on file type
  imageTech?: ImageTechMetadata;
  exif?: ExifMetadata;
  media?: MediaMetadata;
  // AI-generated metadata
  aiMetadata?: AIMetadata;
  aiGeneratedFiles?: AIGeneratedFile[];
  // File grouping
  use?: 'master' | 'derivative' | 'thumbnail' | 'archive';
}

export interface StructMapItem {
  id: string; // Unique ID for this structural division
  label: string; // e.g., "Cover", "Page 1"
  fileIds: string[]; // IDs of files from FileEntry associated with this item
  type?: string; // div TYPE attribute
  order?: number; // ordering
}

// METS Header data
export interface MetsHdrData {
  createDate: string; // ISO date string
  lastModDate?: string; // ISO date string
  recordStatus?: 'COMPLETE' | 'INCOMPLETE' | 'DELETED' | 'NEW';
  // Agent information
  agentName?: string;
  agentType?: 'INDIVIDUAL' | 'ORGANIZATION' | 'OTHER';
  agentRole?: 'CREATOR' | 'EDITOR' | 'ARCHIVIST' | 'PRESERVATION' | 'DISSEMINATOR' | 'CUSTODIAN' | 'IPOWNER' | 'OTHER';
  agentNote?: string;
}

// Support for multiple structMaps
export interface StructMapData {
  id: string;
  type: 'logical' | 'physical';
  label?: string;
  items: StructMapItem[];
}

// structLink support
export interface StructLink {
  from: string; // ID reference
  to: string; // ID reference
  linkType?: string;
}

export interface MetsState {
  metsHdr: MetsHdrData | null;
  dmdSec: DmdSecData | null;
  amdSec: AmdSecData | null;
  fileSec: FileEntry[];
  structMaps: StructMapData[]; // Support multiple structMaps
  structLinks: StructLink[]; // Links between structural divisions
  // For backward compatibility
  structMap: StructMapItem[]; // deprecated, use structMaps
}
