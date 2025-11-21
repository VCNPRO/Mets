// MODS RelatedItem for LOC newspaper profile (articles, sections, paragraphs)
export interface RelatedItem {
  id: string;
  type: 'constituent'; // For newspaper articles and sections
  title?: string;
  genre?: string; // 'article', 'issueSection', 'articleSection', 'photograph', 'illustration', 'advertisement'
  parts?: Part[]; // For paragraphs within articles
}

// MODS Part for structural subparts (paragraphs, etc.)
export interface Part {
  id: string;
  type: string; // 'paragraph', etc.
  text?: string;
}

export interface DmdSecData {
  title: string;
  author: string;
  date: string;
  subject: string;
  metadataStandard: 'DublinCore' | 'MODS' | 'MARC21';
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
  // MODS specific fields
  genre?: string; // newspaper, article, monograph, manuscript
  relatedItems?: RelatedItem[]; // For LOC newspaper profile (articles, sections)
  // MARC21 reference
  marcRecordUri?: string; // URI to external MARC21 record
}

// PREMIS Event for preservation metadata
export interface PremisEvent {
  id: string;
  type: string; // 'digitization', 'creation', 'validation', 'migration', etc.
  dateTime: string; // ISO date
  outcome?: string; // 'success', 'failure'
  outcomeDetail?: string;
  agent?: string; // Agent responsible for the event
}

// MIX Technical Metadata (basic subset)
export interface MixMetadata {
  imageWidth?: number;
  imageHeight?: number;
  colorSpace?: string; // 'RGB', 'Grayscale', etc.
  iccProfile?: string;
  compression?: string; // 'JPEG', 'LZW', 'Uncompressed'
  photometricInterpretation?: string;
  samplesPerPixel?: number;
  bitsPerSample?: number[];
  scannerManufacturer?: string;
  scannerModel?: string;
  scanningDateTime?: string;
}

// EBUCORE for audio/video (basic subset)
export interface EbucoreMetadata {
  // Audio
  audioCodec?: string;
  audioSampleRate?: number; // Hz
  audioChannels?: number;
  audioBitrate?: number; // kbps
  // Video
  videoCodec?: string;
  videoFrameRate?: number; // fps
  videoBitrate?: number; // kbps
  videoWidth?: number;
  videoHeight?: number;
  videoAspectRatio?: string;
  // Common
  duration?: string; // ISO duration format
  fileSize?: number; // bytes
}

// metsRights for Galicia
export interface MetsRights {
  category?: string; // 'COPYRIGHTED', 'PUBLIC DOMAIN', 'LICENSED', etc.
  holder?: string; // Rights holder name
  context?: string; // 'ACADEMIC USER', 'GENERAL PUBLIC', etc.
  status?: string; // 'allowed', 'conditional', 'disallowed'
  licenseType?: string; // 'Creative Commons', etc.
  licenseUri?: string;
}

export interface AmdSecData {
  rightsHolder: string;
  scannerResolution: string; // e.g., '600dpi'
  preservationActions: string; // e.g., 'JPEG2000 conversion, OCR'
  preservationStandard: 'PREMIS'; // Only PREMIS mentioned in doc
  // Extended preservation metadata
  premisEvents?: PremisEvent[]; // PREMIS preservation events
  mix?: MixMetadata; // MIX technical metadata for images
  ebucore?: EbucoreMetadata; // EBUCORE for audio/video
  metsRights?: MetsRights; // metsRights for Galicia
  jhoveValidation?: boolean; // Galicia uses jhove validation
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

// Area element for LOC newspaper profile (points to specific regions in ALTO files)
export interface AreaElement {
  fileId: string; // FILEID pointing to file in fileSec
  begin?: string; // BEGIN attribute pointing to ID in ALTO file
  end?: string; // END attribute
  betype?: string; // BETYPE attribute
}

export interface StructMapItem {
  id: string; // Unique ID for this structural division
  label: string; // e.g., "Cover", "Page 1"
  fileIds: string[]; // IDs of files from FileEntry associated with this item
  type?: string; // div TYPE attribute (e.g., 'news:issue', 'news:page', 'news:pageRegion', 'news:image', 'news:alto')
  order?: number; // ordering
  dmdId?: string; // DMDID reference to dmdSec (for LOC profile articles)
  children?: StructMapItem[]; // Nested divs for hierarchical structure
  area?: AreaElement; // For pageRegion pointing to ALTO regions
}

// METS Header data
export interface MetsHdrData {
  createDate: string; // ISO date string
  lastModDate?: string; // ISO date string
  recordStatus?: 'COMPLETE' | 'INCOMPLETE' | 'DELETED' | 'NEW';
  // METS Profile URI (e.g., for Euskadi: ELD_001, ELD_002, etc., for LOC: http://www.loc.gov/mets/profiles/00000010.xml)
  profile?: string;
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
  dmdSec: DmdSecData | null; // Primary dmdSec (backward compatible)
  dmdSecs?: DmdSecData[]; // Multiple dmdSec for LOC profile (print record, digital record, issue record)
  amdSec: AmdSecData | null;
  fileSec: FileEntry[];
  structMaps: StructMapData[]; // Support multiple structMaps
  structLinks: StructLink[]; // Links between structural divisions
  // For backward compatibility
  structMap: StructMapItem[]; // deprecated, use structMaps
}
