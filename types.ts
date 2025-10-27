
export interface DmdSecData {
  title: string;
  author: string;
  date: string;
  subject: string;
  metadataStandard: 'DublinCore' | 'MODS';
}

export interface AmdSecData {
  rightsHolder: string;
  scannerResolution: string; // e.g., '600dpi'
  preservationActions: string; // e.g., 'JPEG2000 conversion, OCR'
  preservationStandard: 'PREMIS'; // Only PREMIS mentioned in doc
}

export interface FileEntry {
  id: string; // Unique ID for the file in METS
  name: string; // Original file name
  mimeType: string;
  size: number; // in bytes
}

export interface StructMapItem {
  id: string; // Unique ID for this structural division
  label: string; // e.g., "Cover", "Page 1"
  fileIds: string[]; // IDs of files from FileEntry associated with this item
}

export interface MetsState {
  dmdSec: DmdSecData | null;
  amdSec: AmdSecData | null;
  fileSec: FileEntry[];
  structMap: StructMapItem[];
}
