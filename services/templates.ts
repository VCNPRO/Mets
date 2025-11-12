
import { MetsState, MetsHdrData, DmdSecData, AmdSecData, StructMapItem } from '../types';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'book' | 'magazine' | 'photo' | 'video' | 'audio' | 'document';
  icon: string;
  data: Partial<MetsState>;
}

export const templates: Template[] = [
  {
    id: 'book-digital',
    name: 'Libro Digital',
    description: 'Plantilla para libros digitalizados con capítulos y páginas',
    category: 'book',
    icon: '📚',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'CREATOR',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'Text',
        format: 'application/pdf',
        language: 'es',
        publisher: '',
        description: '',
      },
      amdSec: {
        rightsHolder: '',
        scannerResolution: '600dpi',
        preservationActions: 'Digitalización de libro, OCR, conversión a PDF/A',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_cover', label: 'Portada', fileIds: [], type: 'cover', order: 1 },
        { id: 'div_toc', label: 'Índice', fileIds: [], type: 'tableOfContents', order: 2 },
        { id: 'div_chapter1', label: 'Capítulo 1', fileIds: [], type: 'chapter', order: 3 },
        { id: 'div_chapter2', label: 'Capítulo 2', fileIds: [], type: 'chapter', order: 4 },
        { id: 'div_backcover', label: 'Contraportada', fileIds: [], type: 'cover', order: 5 },
      ],
    },
  },
  {
    id: 'magazine',
    name: 'Revista',
    description: 'Plantilla para revistas con artículos y secciones',
    category: 'magazine',
    icon: '📰',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'CREATOR',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'Text',
        format: 'application/pdf',
        language: 'es',
        publisher: '',
        description: 'Revista digitalizada',
        contributor: '',
      },
      amdSec: {
        rightsHolder: '',
        scannerResolution: '300dpi',
        preservationActions: 'Escaneo de revista, OCR, recorte y ajuste de color',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_cover', label: 'Portada', fileIds: [], type: 'cover', order: 1 },
        { id: 'div_editorial', label: 'Editorial', fileIds: [], type: 'article', order: 2 },
        { id: 'div_article1', label: 'Artículo 1', fileIds: [], type: 'article', order: 3 },
        { id: 'div_article2', label: 'Artículo 2', fileIds: [], type: 'article', order: 4 },
        { id: 'div_ads', label: 'Publicidad', fileIds: [], type: 'advertisement', order: 5 },
      ],
    },
  },
  {
    id: 'photo-collection',
    name: 'Colección Fotográfica',
    description: 'Plantilla para colecciones de fotografías con metadatos EXIF',
    category: 'photo',
    icon: '📷',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'INDIVIDUAL',
        agentRole: 'CREATOR',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'Image',
        format: 'image/jpeg',
        language: 'es',
        description: 'Colección de fotografías digitales',
        coverage: '',
      },
      amdSec: {
        rightsHolder: '',
        scannerResolution: '',
        preservationActions: 'Digitalización de fotografías, extracción de EXIF, generación de checksums',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_series1', label: 'Serie 1', fileIds: [], type: 'series', order: 1 },
        { id: 'div_series2', label: 'Serie 2', fileIds: [], type: 'series', order: 2 },
      ],
    },
  },
  {
    id: 'video-archive',
    name: 'Archivo de Video',
    description: 'Plantilla para archivos de video con múltiples versiones',
    category: 'video',
    icon: '🎬',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'PRESERVATION',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'MovingImage',
        format: 'video/mp4',
        language: 'es',
        description: 'Video digitalizado',
        contributor: '',
      },
      amdSec: {
        rightsHolder: '',
        scannerResolution: '',
        preservationActions: 'Digitalización de video, conversión a formatos de preservación y acceso',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_video', label: 'Video Principal', fileIds: [], type: 'video', order: 1 },
        { id: 'div_subtitles', label: 'Subtítulos', fileIds: [], type: 'subtitles', order: 2 },
      ],
    },
  },
  {
    id: 'audio-collection',
    name: 'Colección de Audio',
    description: 'Plantilla para grabaciones de audio y música',
    category: 'audio',
    icon: '🎵',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'CREATOR',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'Sound',
        format: 'audio/mpeg',
        language: 'es',
        description: 'Grabación de audio digitalizada',
      },
      amdSec: {
        rightsHolder: '',
        scannerResolution: '',
        preservationActions: 'Digitalización de audio, conversión a WAV sin pérdida, generación de MP3 para acceso',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_track1', label: 'Pista 1', fileIds: [], type: 'track', order: 1 },
        { id: 'div_track2', label: 'Pista 2', fileIds: [], type: 'track', order: 2 },
      ],
    },
  },
  {
    id: 'document-archive',
    name: 'Archivo Documental',
    description: 'Plantilla para documentos administrativos e históricos',
    category: 'document',
    icon: '📄',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'ARCHIVIST',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'Text',
        format: 'application/pdf',
        language: 'es',
        description: 'Documento histórico digitalizado',
        source: '',
        coverage: '',
      },
      amdSec: {
        rightsHolder: '',
        scannerResolution: '600dpi',
        preservationActions: 'Escaneo de documento, OCR, conversión a PDF/A',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_page1', label: 'Página 1', fileIds: [], type: 'page', order: 1 },
        { id: 'div_page2', label: 'Página 2', fileIds: [], type: 'page', order: 2 },
      ],
    },
  },
  {
    id: 'empty',
    name: 'Vacío',
    description: 'Comenzar desde cero sin ninguna plantilla',
    category: 'document',
    icon: '📋',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
      },
      amdSec: {
        rightsHolder: '',
        scannerResolution: '',
        preservationActions: '',
        preservationStandard: 'PREMIS',
      },
      structMap: [],
    },
  },
];

/**
 * Get a template by ID
 */
export const getTemplate = (id: string): Template | undefined => {
  return templates.find(t => t.id === id);
};

/**
 * Apply a template to create initial METS state
 */
export const applyTemplate = (templateId: string): Partial<MetsState> => {
  const template = getTemplate(templateId);
  if (!template) {
    throw new Error(`Template not found: ${templateId}`);
  }

  return {
    ...template.data,
    fileSec: [],
    structMaps: [],
    structLinks: [],
  };
};

/**
 * Get templates by category
 */
export const getTemplatesByCategory = (category: string): Template[] => {
  return templates.filter(t => t.category === category);
};

/**
 * Get all categories
 */
export const getCategories = (): string[] => {
  return [...new Set(templates.map(t => t.category))];
};
