
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
  'ayuda': 'Puedo ayudarte con:\n• Cómo usar las plantillas\n• Cargar y analizar archivos\n• Entender los metadatos EXIF\n• Validar tu XML\n• Guardar y cargar proyectos\n\n¿Sobre qué te gustaría saber más?',
  'que puedes hacer': 'Puedo responder preguntas sobre:\n✅ Plantillas predefinidas\n✅ Drag & Drop de archivos\n✅ Análisis automático (EXIF, checksums)\n✅ Metadatos METS, Dublin Core, PREMIS\n✅ Validación XML\n✅ Gestión de proyectos\n\n¿Qué necesitas?',
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
    answer: 'No estoy segura de entender tu pregunta. 🤔\n\nPuedo ayudarte con:\n\n• **Templates** - Plantillas predefinidas\n• **Archivos** - Carga y drag & drop\n• **EXIF** - Metadatos de imágenes\n• **Checksums** - MD5 y SHA-256\n• **Validación** - Revisar el XML\n• **Dublin Core** - Metadatos descriptivos\n• **PREMIS** - Preservación\n• **Proyectos** - Guardar y cargar\n\n¿Sobre cuál te gustaría saber más?',
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
  '¿Qué son los checksums?',
  '¿Cómo cargo archivos?',
  'Explícame el EXIF',
  '¿Cómo guardo mi proyecto?',
];
