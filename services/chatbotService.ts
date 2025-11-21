
// Servicio del chatbot Laia - Asistente virtual para METS Builder

import guiaRapida from '../guides/guia-rapida.md?raw';
import guiaCompleta from '../guides/guia-completa.md?raw';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'laia';
  timestamp: Date;
}

interface ChatResponse {
  answer: string;
  sources: string[];
}

// Base de conocimiento del chatbot
const knowledgeBase = {
  guiaRapida,
  guiaCompleta,
};

// Preguntas frecuentes predefinidas
const faq: Record<string, string> = {
  'hola': '¡Hola! 👋 Soy Laia, tu asistente para METS Builder. ¿En qué puedo ayudarte hoy?',
  'ayuda': 'Puedo ayudarte con:\n• Cómo usar las plantillas (base y regionales)\n• Cargar y analizar archivos\n• Entender los metadatos EXIF\n• Validar tu XML\n• Guardar y cargar proyectos\n• Templates regionales (Euskadi, Galicia, Hispana)\n\n¿Sobre qué te gustaría saber más?',
  'que puedes hacer': 'Puedo responder preguntas sobre:\n✅ Plantillas predefinidas y regionales\n✅ Drag & Drop de archivos\n✅ Análisis automático (EXIF, checksums)\n✅ Metadatos METS, Dublin Core, MODS, MARC21\n✅ Perfiles regionales (Euskadi, Galicia, Hispana)\n✅ Validación XML\n✅ Gestión de proyectos\n\n¿Qué necesitas?',
};

// Keywords para búsqueda en las guías
const keywords: Record<string, string[]> = {
  'template': ['plantilla', 'template', 'libro', 'revista', 'foto', 'video', 'audio'],
  'archivo': ['archivo', 'file', 'cargar', 'drag', 'drop', 'subir', 'importar'],
  'exif': ['exif', 'metadatos', 'foto', 'camara', 'imagen', 'jpeg'],
  'checksum': ['checksum', 'md5', 'sha256', 'sha-256', 'integridad', 'hash'],
  'validacion': ['validar', 'validacion', 'error', 'advertencia', 'xml'],
  'dublin': ['dublin', 'core', 'metadatos descriptivos', 'dmdSec', 'titulo', 'autor'],
  'premis': ['premis', 'preservacion', 'amdSec', 'administrativos'],
  'structmap': ['structmap', 'estructura', 'mapa', 'jerarquia', 'division'],
  'proyecto': ['proyecto', 'guardar', 'cargar', 'auto-guardado', 'localStorage'],
  'euskadi': ['euskadi', 'euskal', 'vasco', 'vasca', 'eld', 'ikurriña', 'pais vasco', 'biblioteca digital euskadi'],
  'galicia': ['galicia', 'galiciana', 'gallego', 'gallega', 'xunta', 'memoria dixital', 'biblioteca dixital'],
  'hispana': ['hispana', 'bvpb', 'bne', 'biblioteca nacional', 'prensa historica', 'agregador'],
  'regional': ['regional', 'regionales', 'region', 'autonomia', 'perfil', 'profile'],
  'mods': ['mods', 'metadata object', 'mods:'],
  'marc21': ['marc21', 'marc', 'marc 21', 'registro bibliografico'],
  'mix': ['mix', 'imagen tecnica', 'niso'],
  'ebucore': ['ebucore', 'ebu', 'audio video'],
  'metsrights': ['metsrights', 'derechos', 'rights', 'licencia'],
  'jhove': ['jhove', 'validacion tecnica', 'validation'],
};

/**
 * Busca en las guías contenido relevante
 */
function searchInGuides(query: string): string[] {
  const lowerQuery = query.toLowerCase();
  const results: string[] = [];

  // Buscar en guía rápida
  const rapidLines = guiaRapida.split('\n');
  rapidLines.forEach((line, index) => {
    if (line.toLowerCase().includes(lowerQuery)) {
      // Incluir contexto (línea anterior y siguiente)
      const context = rapidLines.slice(Math.max(0, index - 1), Math.min(rapidLines.length, index + 3)).join('\n');
      results.push(context);
    }
  });

  // Buscar en guía completa (solo si no hay resultados en rápida)
  if (results.length < 2) {
    const completaLines = guiaCompleta.split('\n');
    completaLines.forEach((line, index) => {
      if (line.toLowerCase().includes(lowerQuery)) {
        const context = completaLines.slice(Math.max(0, index - 1), Math.min(completaLines.length, index + 4)).join('\n');
        results.push(context);
      }
    });
  }

  return results.slice(0, 3); // Máximo 3 resultados
}

/**
 * Detecta la intención del usuario
 */
function detectIntent(query: string): string | null {
  const lowerQuery = query.toLowerCase();

  for (const [intent, words] of Object.entries(keywords)) {
    if (words.some(word => lowerQuery.includes(word))) {
      return intent;
    }
  }

  return null;
}

/**
 * Genera respuesta basada en las guías
 */
export function generateResponse(userQuery: string): ChatResponse {
  const lowerQuery = userQuery.toLowerCase();

  // Primero buscar en FAQ predefinidas
  for (const [key, answer] of Object.entries(faq)) {
    if (lowerQuery.includes(key)) {
      return {
        answer,
        sources: ['FAQ'],
      };
    }
  }

  // Detectar intención
  const intent = detectIntent(userQuery);

  // Respuestas específicas por intención
  if (intent === 'template') {
    return {
      answer: '📚 **Templates Predefinidos**\n\nMETS Builder incluye 6 plantillas profesionales:\n\n• 📚 **Libro Digital** - Para libros escaneados\n• 📰 **Revista** - Para publicaciones periódicas\n• 📷 **Colección Fotográfica** - Para archivos de imágenes\n• 🎬 **Archivo de Video** - Para material audiovisual\n• 🎵 **Colección de Audio** - Para grabaciones\n• 📄 **Archivo Documental** - Para documentos históricos\n\nPara usarlas: Click en **🎨 Nueva Plantilla** en la barra superior.\n\n¿Quieres saber más sobre alguna plantilla específica?',
      sources: ['Guía Rápida'],
    };
  }

  if (intent === 'archivo') {
    return {
      answer: '📁 **Carga de Archivos con Drag & Drop**\n\n**Opción 1 - Arrastrar:**\n1. Arrastra archivos a la zona de carga (Sección 3)\n2. El icono cambia de 📁 a 📂\n3. Suelta los archivos\n\n**Opción 2 - Click:**\n1. Click en la zona de carga\n2. Selecciona archivos\n3. Click "Abrir"\n\n**Análisis Automático:**\nLa app extraerá:\n✅ Checksums MD5 y SHA-256\n✅ Metadatos EXIF (para imágenes)\n✅ Dimensiones y resolución\n✅ Duración (para video/audio)\n\n¿Tienes problemas cargando archivos?',
      sources: ['Guía Completa - Sección 3'],
    };
  }

  if (intent === 'exif') {
    return {
      answer: '📷 **Metadatos EXIF**\n\nEl analizador extrae automáticamente de imágenes:\n\n**Información de Cámara:**\n• Fabricante y modelo (ej: Canon EOS 5D)\n• Fecha y hora de captura\n• Configuración: ISO, apertura (f/), velocidad\n• Distancia focal y modelo de lente\n\n**Información Técnica:**\n• Dimensiones (ancho × alto)\n• Resolución (DPI)\n• Espacio de color (sRGB, Adobe RGB)\n• Coordenadas GPS (si disponible)\n\n**Nota:** Los screenshots y fotos de internet NO tienen EXIF. Usa fotos originales de cámara o teléfono.\n\n¿No ves EXIF en tus fotos?',
      sources: ['Guía del Analizador'],
    };
  }

  if (intent === 'checksum') {
    return {
      answer: '🔐 **Checksums para Integridad**\n\nLa app genera automáticamente:\n\n**MD5:**\n• Hash de 128 bits\n• Para verificación rápida\n• Detecta corrupción de archivos\n\n**SHA-256:**\n• Hash de 256 bits\n• Criptográficamente seguro\n• Estándar para preservación digital\n\n**¿Para qué sirven?**\n✅ Verificar que el archivo no se corrompió\n✅ Detectar modificaciones\n✅ Cumplir estándares de preservación\n✅ Repositorios institucionales los requieren\n\nSe incluyen automáticamente en el XML METS.\n\n¿Más dudas sobre checksums?',
      sources: ['Guía Completa'],
    };
  }

  if (intent === 'validacion') {
    return {
      answer: '✅ **Validación XML**\n\nAl generar el XML, verás un panel con:\n\n**Validaciones:**\n• ✅ XML bien formado\n• ✅ metsHdr presente\n• ✅ dmdSec presente (obligatorio)\n• ✅ amdSec, fileSec, structMap\n• ✅ Checksums en archivos\n\n**Indicadores:**\n• ✅ = Presente y válido\n• ⚠️ = Advertencia (puede continuar)\n• ❌ = Error (debe corregirse)\n\n**Errores Comunes:**\n• Título vacío → Completa el campo Título\n• Sin archivos → Carga al menos un archivo\n\nEl XML muestra contador de archivos y estado completo.\n\n¿Ves algún error específico?',
      sources: ['Guía Completa - Validación'],
    };
  }

  if (intent === 'dublin') {
    return {
      answer: '📋 **Dublin Core (15 elementos)**\n\nMETS Builder soporta Dublin Core completo:\n\n**Básicos (obligatorios):**\n• Title - Título del objeto\n• Creator - Autor/creador\n• Date - Fecha de creación\n• Subject - Tema/materia\n\n**Extendidos (opcionales):**\n• Description, Publisher, Contributor\n• Type, Format, Identifier\n• Source, Language, Relation\n• Coverage, Rights\n\n**Para ver campos extendidos:**\nClick "Mostrar Campos Extendidos" en la Sección 1.\n\n¿Necesitas ayuda con algún campo específico?',
      sources: ['Guía Completa - Dublin Core'],
    };
  }

  if (intent === 'premis') {
    return {
      answer: '🔧 **PREMIS - Metadatos de Preservación**\n\nPREMIS (Preservation Metadata Standard) documenta:\n\n**En METS Builder:**\n• Eventos de preservación (ingestion, migration, etc.)\n• Acciones realizadas en el objeto digital\n• Fechas de las acciones\n• Detalles técnicos del proceso\n\n**Ejemplo:**\n"Digitalización con escáner Zeutschel, OCR con ABBYY FineReader, conversión a PDF/A-1b"\n\n**Ubicación:**\nSección 2: Metadatos Administrativos → Acciones de Preservación\n\nSe genera automáticamente en el XML como `<mets:digiprovMD>`.\n\n¿Qué proceso de preservación realizaste?',
      sources: ['Guía Completa - PREMIS'],
    };
  }

  if (intent === 'structmap') {
    return {
      answer: '🗂️ **Mapa Estructural (structMap)**\n\nDefine la jerarquía de tu objeto digital:\n\n**Pasos:**\n1. Añade divisiones (capítulos, páginas, secciones)\n2. Asigna archivos a cada división\n3. Reordena con botones ↑↓\n\n**Ejemplo de Libro:**\n```\nMaterial\n├── Portada\n├── Índice\n├── Capítulo 1\n│   ├── Página 1\n│   └── Página 2\n└── Contraportada\n```\n\n**Tipos sugeridos:**\n• cover, tableOfContents, chapter\n• page, article, section\n\n**Ubicación:** Sección 4 del formulario.\n\n¿Necesitas ayuda organizando tu estructura?',
      sources: ['Guía Completa - structMap'],
    };
  }

  if (intent === 'proyecto') {
    return {
      answer: '💾 **Gestión de Proyectos**\n\n**Auto-guardado:**\n✅ Automático cada 1 segundo\n✅ Guarda en localStorage\n✅ Restaura al reabrir\n\n**Guardar Proyecto:**\n1. Click **💾 Guardar Proyecto**\n2. Descarga archivo JSON\n3. Nombre: `[Proyecto]_2024-11-12.json`\n\n**Cargar Proyecto:**\n1. Click **📂 Cargar Proyecto**\n2. Selecciona archivo .json\n3. Se restaura todo el estado\n\n**⚠️ Importante:**\nSolo guarda metadata, NO los archivos físicos. Mantén los archivos en la misma ubicación.\n\n¿Problemas guardando o cargando?',
      sources: ['Guía Completa - Gestión'],
    };
  }

  if (intent === 'euskadi') {
    return {
      answer: '🏴 **Euskadi - Biblioteca Digital de Euskadi**\n\n**7 plantillas disponibles** con perfiles oficiales ELD:\n\n**Perfiles ELD:**\n• ELD_001 - Preservación No Seriados (libros, manuscritos)\n• ELD_002 - Difusión No Seriados (acceso web)\n• ELD_003 - Preservación Seriados (revistas, periódicos)\n• ELD_004 - Difusión Seriados\n• ELD_003 Audio - Grabaciones sonoras con EBUCORE\n• ELD_003 Video - Material audiovisual con EBUCORE\n• ELD_001 Manuscritos - Con transcripción TEI\n\n**Particularidades técnicas:**\n✅ Metadatos: Dublin Core\n✅ Preservación: PREMIS events completos\n✅ Técnicos: MIX (imágenes), EBUCORE (audio/video)\n✅ Resolución: 600dpi\n✅ Agente: EUSKADIKO LIBURUTEGI DIGITALA\n\n**Identificación visual:**\n• Header verde-rojo (ikurriña)\n• Badge "🏴 Biblioteca Digital Euskadi"\n\n**Cuándo usar:** Si publicas en liburutegidigitala.euskadi.eus\n\n¿Necesitas detalles de alguna plantilla específica?',
      sources: ['Guía Completa - Templates Regionales'],
    };
  }

  if (intent === 'galicia') {
    return {
      answer: '🏴 **Galicia - Biblioteca Dixital de Galicia**\n\n**3 plantillas disponibles** con perfil LOC Historical Newspapers:\n\n**Plantillas:**\n• 📰 Prensa Histórica - Periódicos gallegos\n• 📚 Monografías - Libros históricos\n• 📜 Manuscritos - Documentos medievales\n\n**Particularidades únicas:**\n✅ Metadatos: **MARC21** (NO Dublin Core)\n✅ PROFILE: Library of Congress Historical Newspapers\n✅ Preservación: PREMIS + **jhove validation**\n✅ Derechos: **metsRights** completo\n✅ Técnicos: MIX para imágenes\n\n**5 fileGrp obligatorios:**\n1. ARCHIVE_TIF - Masters TIFF\n2. REFERENCE_JPEG - Derivados web\n3. OCRDIRTY_PDF - PDF buscable\n4. THUMBNAIL - Miniaturas\n5. OCR_ALTO - OCR en ALTO XML\n\n**Resolución:**\n• Prensa: 400dpi\n• Manuscritos: 600dpi+\n\n**Identificación visual:**\n• Header azul-celeste (colores de Galicia)\n• Badge "🏴 Biblioteca Dixital de Galicia"\n\n**Cuándo usar:** Si publicas en biblioteca.galiciana.gal\n\n¿Más detalles sobre MARC21 o metsRights?',
      sources: ['Guía Completa - Templates Regionales'],
    };
  }

  if (intent === 'hispana') {
    return {
      answer: '🇪🇸 **Hispana / BVPB - Agregador Nacional**\n\n**3 plantillas disponibles** con perfil LOC:\n\n**Plantillas:**\n• 📰 Prensa Histórica (BVPB) - Periódicos españoles\n• 📚 Libros Antiguos - Fondo antiguo pre-1900\n• 🗺️ Cartografía - Mapas históricos\n\n**Particularidades técnicas:**\n✅ Metadatos: **MODS 3.7** (NO Dublin Core)\n✅ PROFILE: Library of Congress Profile\n✅ Preservación: PREMIS events completos\n✅ Técnicos: MIX para imágenes\n✅ Agente: Biblioteca Nacional de España\n\n**MODS incluye:**\n• Jerarquía completa de nombres\n• Fechas codificadas (W3CDTF)\n• Descripciones físicas detalladas\n• Autoridades y clasificaciones\n• <mods:cartographics> para mapas\n\n**structMap LOC Newspapers:**\n• news:issue (número del periódico)\n• news:page (página)\n• news:article (artículo)\n• ALTO XML v2.0+ obligatorio\n\n**Resolución:**\n• Prensa: 400dpi\n• Libros antiguos: 600dpi\n• Mapas: 600-1200dpi\n\n**Identificación visual:**\n• Header rojo-amarillo (bandera España)\n• Badge "🇪🇸 Hispana / BVPB"\n\n**Cuándo usar:** Si publicas en Hispana, BVPB o BNE\n\n¿Necesitas ayuda con MODS o ALTO XML?',
      sources: ['Guía Completa - Templates Regionales'],
    };
  }

  if (intent === 'regional') {
    return {
      answer: '🏴 **Templates Regionales**\n\nMETS Builder incluye perfiles oficiales para 3 regiones:\n\n**🏴 Euskadi (7 plantillas)**\n• Perfiles: ELD_001 a ELD_004\n• Metadatos: Dublin Core\n• Especial: PREMIS + MIX + EBUCORE\n• URL: liburutegidigitala.euskadi.eus\n\n**🏴 Galicia (3 plantillas)**\n• Perfil: LOC Historical Newspapers\n• Metadatos: MARC21\n• Especial: jhove validation + metsRights\n• 5 fileGrp obligatorios\n• URL: biblioteca.galiciana.gal\n\n**🇪🇸 Hispana / BVPB (3 plantillas)**\n• Perfil: LOC Profile\n• Metadatos: MODS 3.7\n• Especial: ALTO XML obligatorio\n• URL: hispana.mcu.es\n\n**¿Cuál elegir?**\n✅ Usa el template de tu región si publicas en su repositorio\n✅ Usa templates base si trabajas con repositorio propio\n\n**Identificación visual:**\nCada template regional cambia:\n• Color del header\n• Badge en el proyecto\n\nPregúntame sobre una región específica: "¿Qué es Euskadi?" o "Explícame Galicia"',
      sources: ['Guía Completa - Templates Regionales'],
    };
  }

  if (intent === 'mods') {
    return {
      answer: '📋 **MODS - Metadata Object Description Schema**\n\nMODS es un esquema de metadatos más rico que Dublin Core.\n\n**Usado en:**\n• 🇪🇸 Templates Hispana / BVPB\n• Bibliotecas que necesitan catalogación detallada\n\n**Ventajas sobre Dublin Core:**\n• Jerarquía de nombres (personal, corporativo, conferencia)\n• Fechas codificadas con múltiples formatos\n• Descripciones físicas detalladas (extensión, condición)\n• Cartografía (escala, coordenadas, proyección)\n• Clasificaciones con autoridades\n• Materias con tesauros controlados\n\n**Elementos principales:**\n• <mods:titleInfo>\n• <mods:name type="personal/corporate">\n• <mods:originInfo> (lugar, editorial, fecha)\n• <mods:genre> (newspaper, book, map)\n• <mods:subject> (topic, geographic, temporal)\n• <mods:physicalDescription>\n• <mods:language>\n• <mods:cartographics> (para mapas)\n\n**En annamets:**\nSi seleccionas template Hispana, el XML generará estructura MODS automáticamente desde tus datos.\n\n¿Quieres saber diferencias con Dublin Core?',
      sources: ['Guía Completa - Hispana'],
    };
  }

  if (intent === 'marc21') {
    return {
      answer: '📖 **MARC21 - Machine-Readable Cataloging**\n\nMARC21 es el estándar internacional de catalogación bibliográfica.\n\n**Usado en:**\n• 🏴 Templates Galicia (exclusivamente)\n• Bibliotecas con catálogos MARC\n\n**En templates de Galicia:**\n• La dmdSec usa MARC21 en lugar de Dublin Core\n• Se incluye marcRecordUri (URI al registro MARC externo)\n• El XML METS referencia el registro MARC completo\n\n**Campos MARC incluidos:**\n• genre (tipo de material)\n• type (newspaper, monograph, manuscript)\n• marcRecordUri (enlace al catálogo MARC)\n\n**Ventaja:**\nIntegración directa con catálogos bibliográficos existentes. Si tu biblioteca ya tiene registros MARC21, los templates Galicia permiten vincularlos directamente.\n\n**Ejemplo:**\n```xml\n<mets:mdWrap MDTYPE="MARC21">\n  <mets:xmlData>\n    <!-- Referencia al registro MARC -->\n    <marcRecordUri>http://catalogo.bvg.udc.es/...></marcRecordUri>\n  </mets:xmlData>\n</mets:mdWrap>\n```\n\n¿Trabajas con catálogos MARC existentes?',
      sources: ['Guía Completa - Galicia'],
    };
  }

  if (intent === 'metsrights') {
    return {
      answer: '⚖️ **metsRights - Gestión de Derechos**\n\nmetsRights es un esquema para declarar derechos de acceso y uso.\n\n**Usado en:**\n• 🏴 Templates Galicia (obligatorio)\n• Control de acceso a materiales\n\n**Elementos principales:**\n\n**category:**\n• COPYRIGHTED - Material con derechos\n• PUBLIC DOMAIN - Dominio público\n• LICENSED - Con licencia específica\n• UNKNOWN - Derechos desconocidos\n\n**holder:**\n• Titular de los derechos\n• Ejemplo: "Xunta de Galicia"\n\n**context:**\n• ACADEMIC USER - Solo usuarios académicos\n• GENERAL PUBLIC - Público general\n• INSTITUTIONAL AFFILIATE - Miembros institución\n\n**status:**\n• allowed - Acceso permitido\n• conditional - Acceso condicional\n• disallowed - Acceso prohibido\n\n**licenseType y licenseUri:**\n• Tipo de licencia (ej: "Creative Commons")\n• URI a la licencia\n\n**Ejemplo Galicia:**\n```\ncategory: COPYRIGHTED\nholder: Xunta de Galicia\ncontext: GENERAL PUBLIC\nstatus: allowed\n```\n\n¿Necesitas configurar derechos específicos?',
      sources: ['Guía Completa - Galicia'],
    };
  }

  if (intent === 'jhove') {
    return {
      answer: '🔍 **jhove - Validación Técnica**\n\njhove (JSTOR/Harvard Object Validation Environment) es una herramienta de validación de archivos.\n\n**Usado en:**\n• 🏴 Templates Galicia (obligatorio)\n• Validación de TIFF, PDF, JPEG, etc.\n\n**¿Qué hace jhove?**\n✅ Valida que el archivo cumpla especificaciones técnicas\n✅ Verifica integridad estructural\n✅ Detecta corrupción o problemas\n✅ Genera reporte detallado\n\n**En templates Galicia:**\n• Se documenta como evento PREMIS\n• jhoveValidation: true en amdSec\n• outcomeDetail: "jhove validation"\n\n**Ejemplo evento PREMIS:**\n```\nevento: validation\nfecha: 2024-11-12T10:30:00Z\nresultado: success\ndetalle: jhove validation\nagente: Biblioteca de Galicia\n```\n\n**Formatos validados:**\n• TIFF (archivos master)\n• JPEG (derivados)\n• PDF (PDF/A)\n• ALTO XML\n\n**Importante:**\njhove asegura que los archivos cumplen estándares de preservación a largo plazo.\n\n¿Tienes archivos que necesitan validación?',
      sources: ['Guía Completa - Galicia'],
    };
  }

  // Búsqueda general en las guías
  const searchResults = searchInGuides(userQuery);

  if (searchResults.length > 0) {
    const answer = `He encontrado información relevante:\n\n${searchResults[0]}\n\n¿Esto responde tu pregunta? Si necesitas más detalles, pregúntame sobre algo específico.`;
    return {
      answer,
      sources: ['Guías'],
    };
  }

  // Respuesta por defecto
  return {
    answer: 'No estoy segura de entender tu pregunta. 🤔\n\nPuedo ayudarte con:\n\n• **Templates** - Plantillas base y regionales\n• **Regionales** - Euskadi, Galicia, Hispana\n• **Archivos** - Carga y drag & drop\n• **EXIF** - Metadatos de imágenes\n• **Checksums** - MD5 y SHA-256\n• **Validación** - Revisar el XML\n• **Dublin Core / MODS / MARC21** - Estándares de metadatos\n• **PREMIS** - Preservación\n• **Proyectos** - Guardar y cargar\n\n¿Sobre cuál te gustaría saber más?',
    sources: ['Laia'],
  };
}

/**
 * Mensajes de bienvenida aleatorios
 */
export function getWelcomeMessage(): string {
  const messages = [
    '¡Hola! 👋 Soy Laia, tu asistente para METS Builder. ¿En qué puedo ayudarte?',
    '¡Hola! Soy Laia 💬 Estoy aquí para ayudarte con cualquier duda sobre METS Builder.',
    '¡Bienvenido/a! Soy Laia, tu guía en METS Builder. Pregúntame lo que necesites.',
  ];

  return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Sugerencias rápidas
 */
export const quickSuggestions = [
  '¿Cómo uso las plantillas?',
  '¿Qué son los templates regionales?',
  'Explícame Euskadi',
  'Diferencias entre Galicia e Hispana',
  '¿Qué son los checksums?',
  '¿Cómo cargo archivos?',
  'Explícame el EXIF',
  '¿Qué es MODS?',
  '¿Cómo guardo mi proyecto?',
];
