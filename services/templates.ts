
import { MetsState, MetsHdrData, DmdSecData, AmdSecData, StructMapItem } from '../types';

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'book' | 'magazine' | 'photo' | 'video' | 'audio' | 'document' | 'euskadi' | 'hispana' | 'galicia';
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
  // Biblioteca Digital Euskadi - Modelos de Difusión
  {
    id: 'euskadi-diffusion-nonserial',
    name: 'ELD Difusión - No Seriados',
    description: 'METS de difusión para recursos no seriados (MON, ESK, ARG, MGR, MUS, PAR)',
    category: 'euskadi',
    icon: '📚',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'PRESERVATION',
        agentName: 'EUSKADIKO LIBURUTEGI DIGITALA',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'MON', // Puede ser: MON, ESK, ARG, MGR, MUS, PAR
        format: 'image/jpeg',
        language: 'eu',
        description: 'Recurso no seriado - Biblioteca Digital de Euskadi',
      },
      amdSec: {
        rightsHolder: 'Euskal Autonomia Erkidegoko Administrazioa',
        scannerResolution: '600dpi',
        preservationActions: 'Digitalización, generación de JPEG, validación MD5',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_page1', label: 'Página 1', fileIds: [], type: 'page', order: 1 },
        { id: 'div_page2', label: 'Página 2', fileIds: [], type: 'page', order: 2 },
      ],
    },
  },
  {
    id: 'euskadi-diffusion-serial',
    name: 'ELD Difusión - Seriados (HEM)',
    description: 'METS de difusión para recursos seriados - Hemeroteca',
    category: 'euskadi',
    icon: '📰',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'PRESERVATION',
        agentName: 'EUSKADIKO LIBURUTEGI DIGITALA',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'MODS',
        type: 'HEM',
        format: 'image/jpeg',
        language: 'eu',
        description: 'Publicación seriada - Hemeroteca Digital de Euskadi',
      },
      amdSec: {
        rightsHolder: 'Euskal Autonomia Erkidegoko Administrazioa',
        scannerResolution: '300dpi',
        preservationActions: 'Digitalización de prensa, generación de JPEG, OCR',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_page1', label: 'Página 1', fileIds: [], type: 'page', order: 1 },
        { id: 'div_page2', label: 'Página 2', fileIds: [], type: 'page', order: 2 },
      ],
    },
  },
  {
    id: 'euskadi-diffusion-audio',
    name: 'ELD Difusión - Audio (MSK)',
    description: 'METS de difusión para recursos de audio',
    category: 'euskadi',
    icon: '🎵',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'PRESERVATION',
        agentName: 'EUSKADIKO LIBURUTEGI DIGITALA',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'MSK',
        format: 'audio/mpeg',
        language: 'eu',
        description: 'Grabación sonora - Biblioteca Digital de Euskadi',
      },
      amdSec: {
        rightsHolder: 'Euskal Autonomia Erkidegoko Administrazioa',
        scannerResolution: '',
        preservationActions: 'Digitalización de audio, conversión a MP3',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_track1', label: 'Pista 1', fileIds: [], type: 'track', order: 1 },
      ],
    },
  },
  // Biblioteca Digital Euskadi - Modelos de Preservación
  {
    id: 'euskadi-preservation-nonserial',
    name: 'ELD Preservación - No Seriados (ELD_001)',
    description: 'METS de preservación para recursos no seriados con PREMIS, MIX, METSRights',
    category: 'euskadi',
    icon: '🏛️',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'PRESERVATION',
        agentName: 'EUSKADIKO LIBURUTEGI DIGITALA',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'MON', // Puede ser: MON, ESK, ARG, MGR, MUS, PAR
        format: 'image/tiff',
        language: 'eu',
        description: 'Preservación no seriados - PROFILE: ELD_001',
      },
      amdSec: {
        rightsHolder: 'Euskal Autonomia Erkidegoko Administrazioa',
        scannerResolution: '600dpi',
        preservationActions: 'Digitalización TIFF, JPEG derivados, PDF, ALTO OCR, validación PREMIS',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_tiff', label: 'ARCHIVE_TIFF', fileIds: [], type: 'archive', order: 1 },
        { id: 'div_jpeg', label: 'REFERENCE_JPEG', fileIds: [], type: 'reference', order: 2 },
        { id: 'div_pdf', label: 'REFERENCE_PDF', fileIds: [], type: 'reference', order: 3 },
        { id: 'div_alto', label: 'REFERENCE_ALTO', fileIds: [], type: 'reference', order: 4 },
      ],
    },
  },
  {
    id: 'euskadi-preservation-serial',
    name: 'ELD Preservación - Seriados (ELD_002)',
    description: 'METS de preservación para hemeroteca con MODS, PREMIS, MIX',
    category: 'euskadi',
    icon: '📜',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'PRESERVATION',
        agentName: 'EUSKADIKO LIBURUTEGI DIGITALA',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'MODS',
        type: 'HEM',
        format: 'image/tiff',
        language: 'eu',
        description: 'Preservación seriados - PROFILE: ELD_002',
      },
      amdSec: {
        rightsHolder: 'Euskal Autonomia Erkidegoko Administrazioa',
        scannerResolution: '400dpi',
        preservationActions: 'Digitalización TIFF de prensa, derivados JPEG/PDF, ALTO OCR, PREMIS',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_tiff', label: 'ARCHIVE_TIFF', fileIds: [], type: 'archive', order: 1 },
        { id: 'div_jpeg', label: 'REFERENCE_JPEG', fileIds: [], type: 'reference', order: 2 },
        { id: 'div_pdf', label: 'REFERENCE_PDF', fileIds: [], type: 'reference', order: 3 },
        { id: 'div_alto', label: 'REFERENCE_ALTO', fileIds: [], type: 'reference', order: 4 },
      ],
    },
  },
  {
    id: 'euskadi-preservation-audio',
    name: 'ELD Preservación - Audio (ELD_003)',
    description: 'METS de preservación para audio con MARCXML, EBUCORE, PREMIS',
    category: 'euskadi',
    icon: '🎙️',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'PRESERVATION',
        agentName: 'EUSKADIKO LIBURUTEGI DIGITALA',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'MSK',
        format: 'audio/x-wav',
        language: 'eu',
        description: 'Preservación audio - PROFILE: ELD_003',
      },
      amdSec: {
        rightsHolder: 'Euskal Autonomia Erkidegoko Administrazioa',
        scannerResolution: '',
        preservationActions: 'Digitalización WAV, derivados MP3, imágenes TIFF/JPEG, PDF, metadatos EBUCORE',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_wav', label: 'ARCHIVE_WAV', fileIds: [], type: 'archive', order: 1 },
        { id: 'div_mp3', label: 'REFERENCE_MP3', fileIds: [], type: 'reference', order: 2 },
        { id: 'div_tiff', label: 'ARCHIVE_TIFF', fileIds: [], type: 'archive', order: 3 },
        { id: 'div_jpeg', label: 'REFERENCE_JPEG', fileIds: [], type: 'reference', order: 4 },
        { id: 'div_pdf', label: 'REFERENCE_PDF', fileIds: [], type: 'reference', order: 5 },
      ],
    },
  },
  {
    id: 'euskadi-preservation-audiovisual',
    name: 'ELD Preservación - Audiovisual (ELD_004)',
    description: 'METS de preservación para video con MARCXML, EBUCORE, MIX, PREMIS',
    category: 'euskadi',
    icon: '🎬',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'PRESERVATION',
        agentName: 'EUSKADIKO LIBURUTEGI DIGITALA',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'AUD',
        format: 'video/quicktime',
        language: 'eu',
        description: 'Preservación audiovisual - PROFILE: ELD_004',
      },
      amdSec: {
        rightsHolder: 'Euskal Autonomia Erkidegoko Administrazioa',
        scannerResolution: '',
        preservationActions: 'Digitalización MXF, derivados MP4, imágenes TIFF/JPEG, PDF, metadatos EBUCORE',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_mxf', label: 'ARCHIVE_MXF', fileIds: [], type: 'archive', order: 1 },
        { id: 'div_mp4', label: 'REFERENCE_MP4', fileIds: [], type: 'reference', order: 2 },
        { id: 'div_tiff', label: 'ARCHIVE_TIFF', fileIds: [], type: 'archive', order: 3 },
        { id: 'div_jpeg', label: 'REFERENCE_JPEG', fileIds: [], type: 'reference', order: 4 },
        { id: 'div_pdf', label: 'REFERENCE_PDF', fileIds: [], type: 'reference', order: 5 },
      ],
    },
  },
  // Hispana / BVPB - Perfil Library of Congress con MODS
  {
    id: 'hispana-newspaper',
    name: 'Hispana - Prensa Histórica',
    description: 'METS para periódicos históricos con MODS, ALTO y PREMIS (perfil LOC)',
    category: 'hispana',
    icon: '📰',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'CREATOR',
        agentName: 'Biblioteca Nacional de España',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'MODS',
        type: 'newspaper',
        format: 'image/tiff',
        language: 'es',
        description: 'Número de periódico histórico - Perfil LOC/Hispana',
      },
      amdSec: {
        rightsHolder: 'Biblioteca Nacional de España',
        scannerResolution: '400dpi',
        preservationActions: 'Digitalización TIFF, OCR ALTO, derivados JPEG, validación PREMIS',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_page1', label: 'Página 1', fileIds: [], type: 'page', order: 1 },
        { id: 'div_page2', label: 'Página 2', fileIds: [], type: 'page', order: 2 },
      ],
    },
  },
  {
    id: 'hispana-monograph',
    name: 'Hispana - Libro/Monografía',
    description: 'METS para libros y monografías con MODS y estructura de capítulos',
    category: 'hispana',
    icon: '📚',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'CREATOR',
        agentName: 'Biblioteca Digital Hispánica',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'MODS',
        type: 'monograph',
        format: 'image/tiff',
        language: 'es',
        description: 'Monografía digitalizada - Perfil Hispana/BVPB',
      },
      amdSec: {
        rightsHolder: 'Biblioteca Nacional de España',
        scannerResolution: '600dpi',
        preservationActions: 'Digitalización TIFF, OCR ALTO, PDF, derivados JPEG',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_cover', label: 'Portada', fileIds: [], type: 'cover', order: 1 },
        { id: 'div_chapter1', label: 'Capítulo 1', fileIds: [], type: 'chapter', order: 2 },
      ],
    },
  },
  {
    id: 'hispana-manuscript',
    name: 'Hispana - Manuscrito',
    description: 'METS para manuscritos con MODS y MIX',
    category: 'hispana',
    icon: '📜',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'CREATOR',
        agentName: 'Biblioteca Digital Hispánica',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'MODS',
        type: 'manuscript',
        format: 'image/tiff',
        language: 'es',
        description: 'Manuscrito digitalizado - Perfil Hispana',
      },
      amdSec: {
        rightsHolder: 'Biblioteca Nacional de España',
        scannerResolution: '600dpi',
        preservationActions: 'Digitalización TIFF alta resolución, MIX, derivados JPEG',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_folio1', label: 'Folio 1', fileIds: [], type: 'folio', order: 1 },
      ],
    },
  },
  // Galicia - Perfil LOC con MARC21 y fileGrp específicos
  {
    id: 'galicia-newspaper',
    name: 'Galiciana - Prensa Histórica',
    description: 'METS para periódicos con MARC21, PREMIS, metsRights y 5 fileGrp (perfil Galiciana)',
    category: 'galicia',
    icon: '📰',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'CREATOR',
        agentName: 'Biblioteca de Galicia',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'newspaper',
        format: 'image/tiff',
        language: 'gl',
        description: 'Periódico histórico - Memoria Dixital de Galicia con MARC21',
        publisher: 'Biblioteca de Galicia',
      },
      amdSec: {
        rightsHolder: 'Xunta de Galicia',
        scannerResolution: '400dpi',
        preservationActions: 'Digitalización TIF (archive), JPEG (reference), PDF (ocrdirty), thumbnails, OCR ALTO, validación jhove, PREMIS',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_archive', label: 'ARCHIVE_TIF', fileIds: [], type: 'archive', order: 1 },
        { id: 'div_reference', label: 'REFERENCE_JPEG', fileIds: [], type: 'reference', order: 2 },
        { id: 'div_ocrdirty', label: 'OCRDIRTY_PDF', fileIds: [], type: 'ocrdirty', order: 3 },
        { id: 'div_thumbnail', label: 'THUMBNAIL', fileIds: [], type: 'thumbnail', order: 4 },
        { id: 'div_ocr', label: 'OCR_ALTO', fileIds: [], type: 'ocr', order: 5 },
      ],
    },
  },
  {
    id: 'galicia-monograph',
    name: 'Galiciana - Libro/Monografía',
    description: 'METS para libros con MARC21 y 5 grupos de ficheros (TIF, JPEG, PDF, thumbnails, ALTO)',
    category: 'galicia',
    icon: '📚',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'CREATOR',
        agentName: 'Biblioteca de Galicia',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'monograph',
        format: 'image/tiff',
        language: 'gl',
        description: 'Monografía - Biblioteca Dixital de Galicia con MARC21',
        publisher: 'Biblioteca de Galicia',
      },
      amdSec: {
        rightsHolder: 'Xunta de Galicia',
        scannerResolution: '600dpi',
        preservationActions: 'Digitalización TIF, JPEG, PDF, thumbnails, OCR ALTO, jhove, PREMIS',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_archive', label: 'ARCHIVE_TIF', fileIds: [], type: 'archive', order: 1 },
        { id: 'div_reference', label: 'REFERENCE_JPEG', fileIds: [], type: 'reference', order: 2 },
        { id: 'div_ocrdirty', label: 'OCRDIRTY_PDF', fileIds: [], type: 'ocrdirty', order: 3 },
        { id: 'div_thumbnail', label: 'THUMBNAIL', fileIds: [], type: 'thumbnail', order: 4 },
        { id: 'div_ocr', label: 'OCR_ALTO', fileIds: [], type: 'ocr', order: 5 },
      ],
    },
  },
  {
    id: 'galicia-manuscript',
    name: 'Galiciana - Manuscrito',
    description: 'METS para manuscritos con MARC21, metsRights y grupos de ficheros Galiciana',
    category: 'galicia',
    icon: '📜',
    data: {
      metsHdr: {
        createDate: new Date().toISOString(),
        recordStatus: 'NEW',
        agentType: 'ORGANIZATION',
        agentRole: 'CREATOR',
        agentName: 'Biblioteca de Galicia',
      },
      dmdSec: {
        title: '',
        author: '',
        date: '',
        subject: '',
        metadataStandard: 'DublinCore',
        type: 'manuscript',
        format: 'image/tiff',
        language: 'gl',
        description: 'Manuscrito - Memoria Dixital de Galicia',
        publisher: 'Biblioteca de Galicia',
      },
      amdSec: {
        rightsHolder: 'Xunta de Galicia',
        scannerResolution: '600dpi',
        preservationActions: 'Digitalización alta resolución TIF, JPEG, PDF, thumbnails, metsRights',
        preservationStandard: 'PREMIS',
      },
      structMap: [
        { id: 'div_archive', label: 'ARCHIVE_TIF', fileIds: [], type: 'archive', order: 1 },
        { id: 'div_reference', label: 'REFERENCE_JPEG', fileIds: [], type: 'reference', order: 2 },
        { id: 'div_ocrdirty', label: 'OCRDIRTY_PDF', fileIds: [], type: 'ocrdirty', order: 3 },
        { id: 'div_thumbnail', label: 'THUMBNAIL', fileIds: [], type: 'thumbnail', order: 4 },
      ],
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
