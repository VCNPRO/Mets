# 📖 Guía Completa - annamets XML Builder v3.0

**Manual detallado para crear archivos METS profesionales con análisis automático de IA**

---

## 📑 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Primeros Pasos](#primeros-pasos)
3. [Templates Predefinidos](#templates-predefinidos)
4. [Secciones del Formulario](#secciones-del-formulario)
5. [Analizador de Archivos](#analizador-de-archivos)
6. [🆕 Análisis con Inteligencia Artificial](#análisis-con-inteligencia-artificial)
7. [🆕 Biblioteca de Archivos](#biblioteca-de-archivos)
8. [🆕 Exportación de Metadatos](#exportación-de-metadatos)
9. [Validación XML](#validación-xml)
10. [Gestión de Proyectos](#gestión-de-proyectos)
11. [Casos de Uso](#casos-de-uso)
12. [Solución de Problemas](#solución-de-problemas)
13. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Introducción

### ¿Qué es annamets XML Builder?

annamets XML Builder es una aplicación web profesional de última generación para crear archivos XML en formato METS (Metadata Encoding & Transmission Standard), el estándar internacional para preservación digital utilizado por bibliotecas, archivos y repositorios institucionales.

**🆕 Novedad v3.0**: Integración completa con inteligencia artificial para análisis automático de contenido audiovisual.

### ¿Para quién es?

- 📚 **Bibliotecas**: Digitalización de colecciones con transcripción automática
- 🏛️ **Archivos**: Preservación de documentos históricos con análisis de IA
- 🎓 **Universidades**: Repositorios institucionales con metadatos enriquecidos
- 📸 **Fotógrafos**: Gestión de colecciones con EXIF automático
- 🎬 **Productoras**: Archivo de material audiovisual con subtítulos automáticos
- 👨‍💼 **Profesionales**: Gestión documental inteligente
- 🔬 **Investigadores**: Análisis de entrevistas y contenido cualitativo

### Características Principales

#### ✨ Versión 3.0 incluye:

**Funcionalidades Base:**
1. **6 Templates Profesionales** - Inicio rápido según tu proyecto
2. **Analizador Multimedia** - Extracción automática de EXIF y checksums
3. **Drag & Drop** - Carga de archivos intuitiva
4. **Validación XML** - Verificación en tiempo real
5. **Gestión de Proyectos** - Auto-guardado y persistencia
6. **Dublin Core Completo** - 15 elementos estándar
7. **MIX + PREMIS** - Metadatos técnicos y de preservación
8. **Checksums Automáticos** - MD5 y SHA-256 para integridad

**🆕 Nuevas Funcionalidades con IA:**
9. **Transcripción Automática** - OpenAI Whisper para audio/video
10. **Análisis de Contenido** - Google Gemini para resúmenes y keywords
11. **Generación de Subtítulos** - .srt y .vtt automáticos
12. **Extracción de Entidades** - Personas, organizaciones, lugares
13. **Biblioteca de Archivos** - Almacenamiento y reutilización
14. **Exportación Avanzada** - CSV, Excel, JSON con metadatos de IA

### Estándares Soportados

- ✅ **METS** 1.12 (Metadata Encoding & Transmission Standard)
- ✅ **Dublin Core** 15 elementos (Simple y Qualified)
- ✅ **MODS** 3.7 (Metadata Object Description Schema)
- ✅ **MIX** 2.0 (NISO Metadata for Images in XML)
- ✅ **PREMIS** 3.0 (Preservation Metadata Standard)
- 🆕 **OpenAI Whisper** - Transcripción de audio
- 🆕 **Google Gemini** - Análisis de contenido con IA

---

## Primeros Pasos

### Acceso a la Aplicación

#### Opción 1: Online
Visita: https://mets-silk.vercel.app/

#### Opción 2: Local
```bash
git clone https://github.com/VCNPRO/Mets.git
cd Mets
npm install
npm run dev
```

### Interfaz Principal

La interfaz está dividida en dos columnas (responsive):

```
┌────────────────────────────────────────────────────────┐
│ HEADER: annamets XML Builder                           │
│ [🤖 IA] [📚 Guías]                                     │
├──────────────────────┬─────────────────────────────────┤
│ COLUMNA IZQUIERDA    │ COLUMNA DERECHA                 │
│ (Metadatos)          │ (Archivos y Estructura)         │
│                      │                                 │
│ 0. Encabezado METS   │ 3. Sección de Archivos         │
│ 1. Metadatos Desc.   │    [📚 Biblioteca]             │
│ 2. Metadatos Admin.  │    [🤖 Análisis IA]            │
│                      │    [📊 Exportar]                │
│                      │                                 │
│                      │ 4. Mapa Estructural            │
│                      │                                 │
├──────────────────────┴─────────────────────────────────┤
│ [GENERAR XML METS]                                     │
│ RESULTADO - XML + Validación                           │
└────────────────────────────────────────────────────────┘
```

---

## Templates Predefinidos

### Acceso al Selector

Click en **🎨 Nueva Plantilla** en la barra superior.

### Templates Disponibles

#### 1. 📚 Libro Digital
**Para:** Libros escaneados, manuscritos, documentos históricos

**Estructura predefinida:**
- Portada
- Índice
- Capítulos numerados
- Contraportada

**Metadatos preconfigurados:**
- Type: "Text"
- Format: "image/jpeg"
- Subject: "Literatura", "Historia", etc.

#### 2. 📰 Revista / Publicación Periódica
**Para:** Revistas, periódicos, boletines

**Estructura predefinida:**
- Portada
- Índice/Sumario
- Artículos
- Secciones temáticas

**Metadatos preconfigurados:**
- Type: "Text"
- Format: "image/tiff"
- Subject: "Publicación periódica"

#### 3. 📷 Colección Fotográfica
**Para:** Archivos fotográficos, álbumes, exposiciones

**Estructura predefinida:**
- Fotografías individuales
- Series temáticas

**Metadatos preconfigurados:**
- Type: "Image"
- Format: "image/jpeg"
- Subject: "Fotografía"
- **Análisis EXIF automático**

#### 4. 🎬 Archivo de Video
**Para:** Material audiovisual, documentales, grabaciones

**Estructura predefinida:**
- Video master
- Derivados (baja resolución)
- Subtítulos

**Metadatos preconfigurados:**
- Type: "MovingImage"
- Format: "video/mp4"
- 🆕 **Análisis con IA recomendado**

#### 5. 🎵 Colección de Audio
**Para:** Grabaciones sonoras, música, testimonios orales

**Estructura predefinida:**
- Archivos de audio
- Transcripciones

**Metadatos preconfigurados:**
- Type: "Sound"
- Format: "audio/mpeg"
- 🆕 **Transcripción automática disponible**

#### 6. 📄 Archivo Documental
**Para:** Documentos administrativos, correspondencia, expedientes

**Estructura predefinida:**
- Documentos individuales
- Expedientes

**Metadatos preconfigurados:**
- Type: "Text"
- Format: "application/pdf"

---

## Secciones del Formulario

### Sección 0: Encabezado METS (metsHdr)

**Información sobre el documento METS mismo.**

**Campos:**

- **Fecha de Creación** - Automática (no editable)
- **Fecha de Última Modificación** - Se actualiza al generar XML
- **Estado del Registro** - COMPLETE, INCOMPLETE, NEW, DELETED
- **Nombre del Agente** - Persona u organización responsable
- **Tipo de Agente** - INDIVIDUAL, ORGANIZATION, OTHER
- **Rol del Agente** - CREATOR, EDITOR, ARCHIVIST, PRESERVATION, etc.
- **Notas del Agente** - Información adicional

**Ejemplo:**
```
Agente: Biblioteca Nacional
Tipo: ORGANIZATION
Rol: ARCHIVIST
Notas: Digitalizado en departamento de preservación
```

### Sección 1: Metadatos Descriptivos (dmdSec)

**Describe QUÉ es el objeto digital.**

#### Campos Básicos (siempre visibles):

- **Título*** - Nombre del objeto (obligatorio)
- **Autor/Creador*** - Persona o entidad responsable
- **Fecha*** - De creación o publicación (YYYY-MM-DD)
- **Materia/Tema*** - Tema principal del contenido

#### Campos Extendidos (Dublin Core completo):

Click en "Mostrar campos extendidos" para acceder a:

- **Description** - Descripción detallada
- **Publisher** - Editorial o institución publicadora
- **Contributor** - Colaboradores adicionales
- **Type** - Tipo de recurso (Text, Image, Sound, etc.)
- **Format** - Formato físico o digital
- **Identifier** - ISBN, DOI, URL, etc.
- **Source** - Fuente original
- **Language** - Idioma (ISO 639-2)
- **Relation** - Relación con otros recursos
- **Coverage** - Cobertura temporal o geográfica
- **Rights** - Declaración de derechos

**🆕 Enriquecimiento con IA:**
Si analizas archivos con IA, los keywords y entidades se pueden copiar aquí automáticamente.

### Sección 2: Metadatos Administrativos (amdSec)

**Describe CÓMO se gestiona el objeto.**

**Campos:**

- **Titular de Derechos** - Propietario de los derechos de autor
- **Resolución del Escáner** - Para materiales digitalizados (ej: "600dpi")
- **Acciones de Preservación** - Procesos aplicados

**Ejemplos de Acciones de Preservación:**
```
Digitalización con escáner Zeutschel OS 15000, 600dpi,
formato TIFF sin compresión. OCR aplicado con ABBYY
FineReader 15. Conversión a PDF/A-1b para preservación.
```

```
🆕 Transcripción automática con OpenAI Whisper-large-v3.
Análisis de contenido con Google Gemini-pro.
Generación de subtítulos SRT/VTT para accesibilidad.
```

**Estándar PREMIS:**
Estas acciones se documentan como eventos PREMIS en el XML generado.

### Sección 3: Sección de Archivos (fileSec)

**Inventario de todos los archivos que componen el objeto digital.**

#### Carga de Archivos

**Opciones:**
1. **Drag & Drop** - Arrastra archivos directamente a la zona de carga
2. **Click para seleccionar** - Navegador de archivos del sistema
3. **📚 Biblioteca** - Reutilizar archivos previamente procesados

**Formatos soportados:**
- Imágenes: JPG, PNG, TIFF, GIF, BMP
- Video: MP4, MOV, AVI, MKV, WebM
- Audio: MP3, WAV, AAC, OGG, FLAC
- Documentos: PDF, TXT, DOCX

#### Análisis Automático

Al cargar archivos, se extraen automáticamente:

**Para IMÁGENES (JPG, PNG, TIFF):**
- ✅ **Dimensiones** - Ancho × Alto en píxeles
- ✅ **Resolución** - DPI (dots per inch)
- ✅ **EXIF completo:**
  - 📷 Fabricante y modelo de cámara
  - 📷 Fecha y hora de captura
  - 📷 ISO, Apertura (f-number), Velocidad de obturación
  - 📷 Distancia focal, Modelo de lente
  - 📍 Coordenadas GPS (si disponible)
  - 🎨 Espacio de color, Orientación
- ✅ **Checksums** - MD5 y SHA-256

**Para VIDEO (MP4, MOV, AVI, MKV):**
- ✅ **Resolución** - 1920×1080px, 3840×2160px (4K), etc.
- ✅ **Relación de Aspecto** - 16:9, 4:3, 21:9
- ✅ **Codec de Video** - H.264, H.265 (HEVC), VP9
- ✅ **Codec de Audio** - AAC, MP3, Opus
- ✅ **Framerate (FPS)** - 24, 25, 30, 60 fps
- ✅ **Bitrate** - Calculado automáticamente
- ✅ **Duración** - En segundos
- ✅ **Checksums** - MD5 y SHA-256
- 🆕 **Análisis con IA disponible** - Transcripción, subtítulos, resumen

**Para AUDIO (MP3, WAV, AAC):**
- ✅ **Codec** - MP3, AAC, PCM, FLAC, Vorbis
- ✅ **Sample Rate** - 44100 Hz (CD quality), 48000 Hz
- ✅ **Canales** - Mono, Estéreo, 5.1 surround
- ✅ **Bitrate** - kbps
- ✅ **Duración** - En segundos
- ✅ **Checksums** - MD5 y SHA-256
- 🆕 **Análisis con IA disponible** - Transcripción y análisis de contenido

#### 🆕 Botones de Acción

**📊 Exportar:**
- CSV - Datos tabulares
- Excel (.xlsx) - Con formato
- JSON - Datos estructurados

**🤖 IA (solo audio/video):**
- Click para analizar archivo individual
- Opciones: transcripción, subtítulos, análisis

---

## 🆕 Análisis con Inteligencia Artificial

### Configuración de API Keys

**Paso 1: Acceder a la configuración**
- Click en botón **🤖 IA** en el header (esquina superior derecha)

**Paso 2: Obtener API keys**

**OpenAI (para Whisper - Transcripción):**
1. Visita: https://platform.openai.com/api-keys
2. Crea una cuenta o inicia sesión
3. Click en "Create new secret key"
4. Copia la key (empieza con `sk-...`)
5. **Importante**: Guarda la key en lugar seguro, solo se muestra una vez

**Google Gemini (para Análisis de Contenido):**
1. Visita: https://makersuite.google.com/app/apikey
2. Inicia sesión con cuenta de Google
3. Click en "Create API key"
4. Copia la key (empieza con `AIza...`)

**Paso 3: Configurar en annamets**
1. Pega las API keys en los campos correspondientes
2. Click "💾 Guardar Configuración"
3. ✅ Verás indicadores de "Configurada" cuando estén guardadas

**Seguridad:**
- Las API keys se guardan en localStorage de tu navegador
- NO se envían a servidores de annamets
- Solo se transmiten directamente a OpenAI y Google
- Puedes borrarlas cuando quieras limpiando datos del navegador

### Usar el Análisis con IA

**Opción A: Analizar archivo individual**

1. Carga un archivo de audio o video
2. Espera a que complete el análisis técnico básico
3. Click en botón **🤖 IA** junto al archivo
4. Se abre modal de opciones:

**Opciones disponibles:**

☑️ **Transcripción Automática**
- Convierte audio a texto
- Detecta idioma automáticamente
- Timestamps por segmento
- Requiere: OpenAI API key
- Tiempo estimado: 30-60 seg/minuto de audio

☑️ **Generar Subtítulos**
- Crea archivos .srt y .vtt
- Sincronizados con timestamps
- Compatibles con reproductores de video
- Requiere: Transcripción activada

☑️ **Análisis de Contenido**
- Resumen del contenido (2-3 frases)
- Keywords principales (5-10)
- Temas tratados
- Análisis de sentimiento
- Entidades detectadas (personas, organizaciones, lugares)
- Requiere: Gemini API key + Transcripción
- Tiempo estimado: 10-20 segundos

☐ **Detección de Escenas** (Beta)
- Identifica cambios de escena
- Segmentación automática
- Solo para video

5. Selecciona las opciones deseadas
6. Click **🚀 Analizar con IA**
7. Espera el progreso:
   - "Iniciando transcripción..."
   - "Enviando a Whisper API..."
   - "Procesando transcripción..."
   - "Analizando contenido con Gemini..."
   - "✅ Análisis completado con éxito!"

### Resultados del Análisis

Los resultados se muestran en una caja morada bajo el archivo:

```
🤖 Análisis con IA
────────────────────────────────────────
Transcripción: "En esta entrevista, el Dr. Juan Pérez
explica la importancia de la preservación digital en
archivos históricos. Menciona el uso de estándares
como METS y Dublin Core para..."

Idioma: es • Confianza: 96.4%

Resumen: Entrevista sobre preservación digital en
archivos, discutiendo la importancia de los metadatos
METS y el rol de la IA en la catalogación automática.

Keywords: preservación digital, archivos históricos,
METS, metadatos, IA, catalogación, Dublin Core

Entidades: Dr. Juan Pérez (Persona), Universidad
Nacional (Organización), Madrid (Lugar)

[⬇️ entrevista.srt] [⬇️ entrevista.vtt] [⬇️ entrevista_analysis.json]
```

### Archivos Generados

**1. Subtítulos SRT (SubRip)**
```srt
1
00:00:00,000 --> 00:00:05,120
En esta entrevista, el Dr. Juan Pérez

2
00:00:05,120 --> 00:00:10,500
explica la importancia de la preservación digital
```

**Uso:** Compatible con VLC, reproductores de video, editores

**2. Subtítulos VTT (WebVTT)**
```vtt
WEBVTT

1
00:00:00.000 --> 00:00:05.120
En esta entrevista, el Dr. Juan Pérez
```

**Uso:** HTML5 video, navegadores web, accesibilidad

**3. Análisis JSON completo**
```json
{
  "transcription": {
    "text": "En esta entrevista...",
    "language": "es",
    "confidence": 0.964,
    "model": "whisper-1",
    "segments": [...]
  },
  "analysis": {
    "summary": "Entrevista sobre...",
    "keywords": ["preservación digital", ...],
    "topics": ["Archivos", "METS", "IA"],
    "sentiment": "positive",
    "entities": [...]
  }
}
```

**Uso:** Análisis programático, integración con otras herramientas

### Descargar Archivos Generados

Click en los botones de descarga:
- **⬇️ archivo.srt** - Descarga subtítulos SRT
- **⬇️ archivo.vtt** - Descarga subtítulos VTT
- **⬇️ archivo_analysis.json** - Descarga análisis completo

Los archivos se descargan directamente a tu carpeta de descargas.

---

## 🆕 Biblioteca de Archivos

### ¿Qué es la Biblioteca?

Un sistema de almacenamiento local que guarda automáticamente todos los archivos que procesas, incluyendo sus metadatos técnicos y análisis de IA.

### Funcionamiento Automático

**Cada vez que cargas archivos:**
1. Se analizan (checksums, EXIF, metadatos técnicos)
2. Se guardan en localStorage del navegador
3. Si analizas con IA, esos datos también se guardan
4. No se duplican (detección por MD5 checksum)

### Acceder a la Biblioteca

**Desde Sección de Archivos:**
- Click en botón **📚 Abrir Biblioteca de Archivos**

**Interfaz de la Biblioteca:**

```
┌─────────────────────────────────────────┐
│ 📚 Biblioteca de Archivos               │
│ 127 archivos • 42.8 GB total            │
├─────────────────────────────────────────┤
│ 🎬 Video: 45  🎵 Audio: 32  📷 Imagen: 50│
├─────────────────────────────────────────┤
│ [Buscar: "entrevista"] [Tipo: Todos▼]  │
│ [💾 Exportar] [🗑️ Limpiar]              │
├─────────────────────────────────────────┤
│                                          │
│  ┌────────┐  ┌────────┐  ┌────────┐    │
│  │☑ Video1│  │☐ Audio1│  │☑ Foto1 │    │
│  │1920x   │  │48kHz   │  │EXIF    │    │
│  │1080px  │  │Stereo  │  │Canon   │    │
│  │🤖 IA   │  │        │  │        │    │
│  └────────┘  └────────┘  └────────┘    │
│                                          │
├─────────────────────────────────────────┤
│ 2 archivo(s) seleccionado(s)            │
│          [Cancelar] [➕ Añadir (2)]      │
└─────────────────────────────────────────┘
```

### Funcionalidades

**Búsqueda:**
- Busca por nombre de archivo
- Busca por tipo MIME
- Busca por tags (si los has añadido)

**Filtros:**
- 🎬 Video
- 🎵 Audio
- 📷 Imagen
- 📄 Documento
- Todos

**Estadísticas:**
- Total de archivos
- Contador por tipo
- Tamaño total acumulado

**Selección múltiple:**
- Click en archivos para seleccionar
- Checkboxes para marcar/desmarcar
- Botón "➕ Añadir Seleccionados" para usar en proyecto actual

**Gestión:**
- **💾 Exportar** - Backup de biblioteca completa (JSON)
- **🗑️ Limpiar** - Borrar toda la biblioteca (con confirmación)
- **✕ Eliminar** - Borrar archivos individuales

### Ventajas de la Biblioteca

**1. Ahorro de Tiempo:**
- No recalcular checksums (puede tardar minutos)
- No reanalizar con IA (ahorra llamadas a API y dinero)
- Reutilización inmediata

**2. Persistencia:**
- Archivos disponibles incluso si cierras el navegador
- Sobrevive recargas de página
- Persiste mientras no borres datos del navegador

**3. Organización:**
- Ver todos tus archivos procesados
- Buscar y filtrar rápidamente
- Estadísticas de tu colección

**4. Múltiples Proyectos:**
```
Proyecto 1: Documentales (selecciona 10 videos)
Proyecto 2: Testimonios Orales (selecciona 5 audios)
Proyecto 3: Archivo Fotográfico (selecciona 50 fotos)

Todos desde la misma biblioteca, sin reprocesar.
```

---

## 🆕 Exportación de Metadatos

### ¿Para qué exportar?

- 📊 Análisis en hojas de cálculo (Excel, Google Sheets)
- 📈 Generación de informes y estadísticas
- 🔧 Integración con otras aplicaciones
- 📋 Documentación de colecciones
- 🔬 Investigación y análisis de datos

### Formatos Disponibles

**Desde Sección de Archivos:**
Tres botones: **📄 CSV**, **📊 Excel**, **🔧 JSON**

#### 1. CSV (Comma-Separated Values)

**Características:**
- Archivo de texto plano
- Compatible con Excel, Google Sheets, LibreOffice
- Importable en bases de datos
- Ligero y universal

**Ejemplo de contenido:**
```csv
Nombre,Tipo MIME,Tamaño,MD5,Resolución,Codec,Bitrate,Transcripción,Keywords
video1.mp4,video/mp4,54709KB,573e82d8...,1920x1080px,H.264,2551kbps,"En esta...",preservación;archivos
```

**Uso:**
```
1. Abrir en Excel
2. Crear tabla dinámica
3. Filtrar por codec
4. Ver estadísticas de bitrate
```

#### 2. Excel (.xlsx)

**Características:**
- Archivo Excel nativo
- Con formato y estilos
- Columnas auto-ajustadas
- Filtros automáticos
- Mejor para presentaciones

**Contenido:**
- Hoja: "Metadata Archivos"
- Columnas con anchos óptimos
- Formato tabular limpio

**Uso:**
```
1. Abrir directamente en Excel
2. Formato profesional aplicado
3. Listo para presentar
```

#### 3. JSON (JavaScript Object Notation)

**Características:**
- Formato estructurado completo
- Incluye TODOS los datos (sin truncar)
- Ideal para desarrolladores
- Importable en aplicaciones

**Ejemplo:**
```json
[
  {
    "id": "file_1234567_0",
    "name": "entrevista.mp4",
    "mimeType": "video/mp4",
    "size": 54709000,
    "md5": "573e82d8d3ef4238...",
    "sha256": "a86e9c5ed43cb601...",
    "media": {
      "duration": 900.5,
      "width": 1920,
      "height": 1080,
      "aspectRatio": "16:9",
      "videoCodec": "H.264",
      "audioCodec": "AAC",
      "bitrate": 2551000,
      "sampleRate": 48000,
      "channels": 2
    },
    "aiMetadata": {
      "transcription": {
        "text": "En esta entrevista...",
        "language": "es",
        "confidence": 0.964,
        "segments": [...]
      },
      "analysis": {
        "summary": "Entrevista sobre...",
        "keywords": ["preservación", ...],
        "entities": [...]
      }
    }
  }
]
```

**Uso:**
```javascript
// En JavaScript
const data = require('./archivos_metadata.json');
const videos = data.filter(f => f.mimeType.startsWith('video/'));
console.log(`Total videos: ${videos.length}`);

// En Python
import json
with open('archivos_metadata.json') as f:
    data = json.load(f)
videos = [f for f in data if f['mimeType'].startswith('video/')]
print(f"Total videos: {len(videos)}")
```

### Datos Incluidos en la Exportación

**Básicos:**
- Nombre de archivo
- Tipo MIME
- Tamaño (formateado y en bytes)
- Uso (master, derivative, thumbnail)
- MD5 checksum
- SHA-256 checksum

**Imágenes:**
- Dimensiones (ancho × alto)
- Resolución X/Y (DPI)
- Espacio de color
- Profundidad de bits
- Fabricante y modelo de cámara (EXIF)
- Fecha de captura
- ISO, apertura, velocidad
- Distancia focal, lente
- GPS (latitud, longitud)

**Video:**
- Resolución (ej: 1920×1080)
- Relación de aspecto (16:9)
- FPS (framerate)
- Codec de video (H.264, H.265)
- Codec de audio (AAC, MP3)
- Bitrate (kbps y bps)
- Duración (formateada y en segundos)

**Audio:**
- Codec (MP3, AAC, WAV, FLAC)
- Sample rate (Hz)
- Canales (Mono, Estéreo, 5.1)
- Bitrate
- Duración

**🆕 Metadatos de IA:**
- Transcripción completa
- Idioma detectado
- Confianza (%)
- Resumen
- Keywords
- Temas/Topics
- Sentimiento
- Entidades (nombre y tipo)

### Caso de Uso Real: Análisis de Colección

**Tienes 100 entrevistas procesadas con IA:**

```
Paso 1: Exportar a Excel
Paso 2: Crear tabla dinámica
Paso 3: Análisis:

- Idiomas detectados:
  ES: 87 archivos
  EN: 10 archivos
  FR: 3 archivos

- Entidades más mencionadas:
  "Archivo Nacional": 45 veces
  "Guerra Civil": 32 veces
  "Madrid": 28 veces

- Keywords principales:
  "memoria histórica": 56 archivos
  "testimonio": 48 archivos
  "preservación": 41 archivos

- Duración total: 87.5 horas de audio
- Bitrate promedio: 128 kbps
```

---

## Validación XML

### Validador Integrado

Al generar el XML METS, se ejecuta automáticamente una validación que verifica:

#### Elementos Obligatorios

✅ **metsHdr** - Encabezado METS
⚠️ Advertencia si falta, pero no bloquea

✅ **dmdSec** - Metadatos descriptivos
❌ Error si falta (obligatorio por estándar)

✅ **fileSec** - Sección de archivos
⚠️ Advertencia si falta

✅ **structMap** - Mapa estructural
⚠️ Advertencia si falta

✅ **Checksums** - En archivos
⚠️ Advertencia si faltan (recomendado)

#### Panel de Validación

```
┌─────────────────────────────────────────┐
│ ✅ XML Válido                           │
├─────────────────────────────────────────┤
│ ✅ metsHdr    ✅ dmdSec    ✅ amdSec    │
│ ✅ fileSec    ✅ structMap ✅ Checksums │
│                                          │
│ 📁 15 archivos incluidos                │
│                                          │
│ ⚠️ Advertencias:                        │
│ • Algunos archivos sin checksums        │
└─────────────────────────────────────────┘
```

### Errores Comunes

**❌ "Falta dmdSec"**
- Solución: Completa al menos el campo Título

**⚠️ "No se encontró fileSec"**
- Solución: Carga al menos un archivo

**⚠️ "Los archivos no tienen checksums"**
- Esto no debería ocurrir si usas el analizador
- Verifica que los archivos se cargaron correctamente

---

## Gestión de Proyectos

### Auto-guardado

**Funcionalidad automática:**
- Cada cambio se guarda automáticamente
- Debounce de 1 segundo (espera 1 seg antes de guardar)
- Guarda en localStorage
- Se restaura al reabrir la app
- Indicador: "Auto-guardado" en barra de proyecto

**No necesitas:**
- Guardar manualmente mientras trabajas
- Preocuparte por perder cambios
- Hacer click en "Guardar" continuamente

### Guardar Proyecto

**Uso:**
- Click en **💾 Guardar Proyecto**
- Se descarga archivo JSON

**Contenido del archivo:**
```json
{
  "metsState": {
    "metsHdr": {...},
    "dmdSec": {...},
    "amdSec": {...},
    "fileSec": [...],
    "structMap": [...]
  },
  "projectName": "Colección Fotográfica 2024",
  "savedAt": "2024-11-12T22:00:00.000Z"
}
```

**Nombre del archivo:**
`Coleccion_Fotografica_2024_2024-11-12.json`

**Para qué sirve:**
- Backup del proyecto
- Compartir con colegas
- Versionar proyectos
- Archivar trabajos completados

**⚠️ Importante:**
El archivo JSON solo guarda **metadatos**, NO los archivos físicos.
Mantén los archivos originales en la misma ubicación.

### Cargar Proyecto

**Uso:**
- Click en **📂 Cargar Proyecto**
- Selecciona archivo .json
- Todo el estado se restaura

**Se restaura:**
- ✅ Todos los metadatos
- ✅ Información de archivos
- ✅ Estructura del mapa
- ✅ Configuración
- ✅ Nombre del proyecto

**NO se restaura:**
- ❌ Archivos físicos (solo las referencias)

### Nuevo Proyecto

**Uso:**
- Click en **🎨 Nueva Plantilla**
- Confirma "¿Crear nuevo proyecto?"
- Se borra el estado actual
- Selecciona plantilla
- Comienza desde cero

**⚠️ Advertencia:**
Si tienes cambios sin guardar (no descargados como JSON), se perderán.

---

## Casos de Uso

### Caso 1: Biblioteca - Digitalización de Libro Antiguo

**Proyecto:** Libro del siglo XVIII

**Flujo de trabajo:**

1. **Nueva Plantilla:** 📚 Libro Digital

2. **Metadatos Descriptivos:**
   ```
   Título: Historia de España
   Autor: Antonio de Solís
   Fecha: 1684
   Subject: Historia, España, Siglo XVII
   Publisher: Imprenta Real
   Language: spa
   ```

3. **Metadatos Administrativos:**
   ```
   Titular: Biblioteca Nacional de España
   Resolución: 600dpi
   Acciones: Digitalización con escáner Zeutschel OS 15000,
             formato TIFF, OCR con ABBYY FineReader
   ```

4. **Carga de Archivos:**
   - 340 imágenes TIFF (páginas del libro)
   - Análisis automático: checksums, dimensiones

5. **Mapa Estructural:**
   ```
   Libro
   ├─ Portada
   ├─ Índice
   ├─ Capítulo I
   │  ├─ Página 1-20
   ├─ Capítulo II
   │  ├─ Página 21-45
   └─ Contraportada
   ```

6. **Generar y Validar XML**

7. **Descargar METS**

### Caso 2: Archivo - Colección de Testimonios Orales

**Proyecto:** Testimonios de la Guerra Civil

**Flujo de trabajo:**

1. **Nueva Plantilla:** 🎵 Colección de Audio

2. **Configurar IA:**
   - OpenAI API key para transcripción
   - Gemini API key para análisis

3. **Metadatos Descriptivos:**
   ```
   Título: Testimonios Guerra Civil Española
   Autor: Archivo Histórico Nacional
   Fecha: 1936-1939 (contenido), 2024 (digitalización)
   Subject: Historia Oral, Guerra Civil, Memoria Histórica
   Type: Sound
   Language: spa
   ```

4. **Carga de Archivos:**
   - 50 archivos MP3 (entrevistas)
   - Análisis automático: duración, bitrate, codec

5. **🤖 Análisis con IA (para cada archivo):**
   - ☑️ Transcripción automática
   - ☑️ Generar subtítulos (para versión video futura)
   - ☑️ Análisis de contenido

   **Resultados obtenidos:**
   - Transcripción completa de cada testimonio
   - Keywords: "frente", "bombardeo", "refugio", "hambre"
   - Entidades: Nombres de personas, batallas, lugares
   - Temas: Vida cotidiana, Batallas, Represión

6. **Exportar Metadatos:**
   - Excel con todas las transcripciones
   - Keywords agrupados por entrevista
   - Análisis estadístico en tabla dinámica

7. **Mapa Estructural:**
   ```
   Colección
   ├─ Serie 1: Combatientes
   │  ├─ Testimonio_01.mp3
   │  ├─ Testimonio_02.mp3
   ├─ Serie 2: Civiles
   │  ├─ Testimonio_20.mp3
   ```

8. **Generar METS con metadatos de IA**

### Caso 3: Universidad - Repositorio de Clases Grabadas

**Proyecto:** Curso de Arqueología 2024

**Flujo de trabajo:**

1. **Nueva Plantilla:** 🎬 Archivo de Video

2. **Configurar IA**

3. **Metadatos:**
   ```
   Título: Curso Arqueología Clásica - Semestre 1
   Autor: Prof. María González
   Contributor: Universidad Complutense de Madrid
   Subject: Arqueología, Roma, Grecia
   Type: MovingImage
   ```

4. **Carga de Videos:**
   - 24 clases (MP4, 1080p)
   - Duración promedio: 90 minutos/clase

5. **🤖 Análisis con IA:**
   - Transcripción de todas las clases
   - Generación de subtítulos para accesibilidad
   - Keywords por clase
   - Entidades: Nombres de lugares, arqueólogos, períodos históricos

6. **Resultados:**
   - 24 archivos .srt (subtítulos para estudiantes sordos)
   - Transcripciones buscables (encuentra "Pompeya" en todas las clases)
   - Excel con índice de temas por clase

7. **Biblioteca:**
   - Todos los videos guardados
   - Reutilizables en otros proyectos (ej: "Curso Avanzado 2025")

### Caso 4: Productor Audiovisual - Archivo de Documentales

**Proyecto:** Documentales de Naturaleza

**Flujo de trabajo:**

1. **Nueva Plantilla:** 🎬 Archivo de Video

2. **Carga masiva:**
   - 20 documentales completos (4K, H.265)
   - 150 clips B-roll
   - 50 archivos de audio (bandas sonoras)

3. **🤖 Análisis con IA:**
   - Transcripción de narraciones
   - Keywords automáticos: "biodiversidad", "ecosistema", "especies"
   - Entidades: Nombres científicos, lugares

4. **Exportación Excel:**
   - Columnas: Nombre, Duración, Resolución, Codec, Keywords
   - Filtro por keyword: Ver todos los clips sobre "ballenas"
   - Tabla dinámica: Total de metraje por tema

5. **Biblioteca:**
   - 220 archivos procesados
   - Búsqueda: "ballena" → 15 resultados
   - Reutilización en nuevos proyectos sin reanalizar

---

## Solución de Problemas

### Problemas con Archivos

**No se carga el archivo**
- Verifica que el formato sea soportado
- Archivos >2GB pueden tardar mucho
- Comprueba conexión a internet (para IA)

**No veo metadatos EXIF**
- Screenshots y fotos de internet NO tienen EXIF
- Usa fotos originales de cámara o smartphone
- EXIF se elimina al subir a redes sociales

**Checksums no se calculan**
- Espera a que termine el análisis
- Para archivos grandes (>500MB) puede tardar varios minutos
- Verifica que no se interrumpió la carga

### Problemas con IA

**"OpenAI API key not configured"**
- Verifica que configuraste la key en 🤖 IA
- Comprueba que la key sea válida (empieza con `sk-`)
- Prueba crear una nueva key en OpenAI

**"Whisper API error: insufficient_quota"**
- Tu cuenta de OpenAI no tiene créditos
- Añade método de pago en https://platform.openai.com/account/billing
- OpenAI requiere mínimo $5 de crédito

**"Gemini API error: API_KEY_INVALID"**
- Verifica que la key sea correcta (empieza con `AIza`)
- Comprueba que habilitaste Gemini API en Google Cloud
- Genera una nueva key

**Análisis muy lento**
- Es normal: 30-60 segundos por minuto de audio
- Un video de 15 minutos puede tardar 7-15 minutos
- No cierres la ventana durante el análisis

**Transcripción en idioma incorrecto**
- Whisper detecta automáticamente el idioma
- Si falla, el audio puede tener mucho ruido
- Prueba con audio más limpio

### Problemas con Biblioteca

**No veo archivos en la biblioteca**
- Verifica que cargaste archivos previamente
- La biblioteca usa localStorage (puede estar deshabilitado)
- No uses modo incógnito (se borra al cerrar)

**Biblioteca llena/lenta**
- localStorage tiene límite ~5-10MB
- Limpia archivos antiguos (🗑️ Limpiar)
- Exporta backup antes de limpiar

**Archivos duplicados**
- No debería ocurrir (detección por MD5)
- Si ves duplicados, reporta el bug

### Problemas con Exportación

**Excel no se descarga**
- Verifica que tienes archivos cargados
- Comprueba bloquedor de popups
- Prueba con CSV si Excel falla

**JSON muy grande**
- Con 100+ archivos y análisis IA, puede ser >50MB
- Usa JSON solo si necesitas los datos completos
- Para visualización, usa Excel

### Problemas con Proyectos

**"Error al cargar el proyecto"**
- Verifica que el archivo sea .json válido
- Comprueba que no esté corrupto
- Intenta abrir el JSON en editor de texto

**Se perdieron mis cambios**
- Auto-guardado solo guarda en localStorage
- Si borraste datos del navegador, se perdió
- Usa 💾 Guardar Proyecto frecuentemente para backup

---

## Preguntas Frecuentes

### General

**¿Es gratis annamets?**
Sí, la aplicación es completamente gratuita y open source.

**¿Necesito instalar algo?**
No, funciona directo en el navegador. Opcionalmente puedes instalarlo localmente.

**¿Funciona offline?**
La app sí, pero el análisis con IA requiere internet.

**¿En qué navegadores funciona?**
Chrome, Firefox, Safari, Edge (últimas versiones).

### Análisis con IA

**¿Cuánto cuesta usar la IA?**
- OpenAI Whisper: ~$0.006 por minuto de audio
- Google Gemini: Primeros 60 requests/minuto gratis
- Ejemplo: 10 videos de 15min = ~$0.90

**¿Los datos de mis archivos son privados?**
- Tus archivos se envían a OpenAI y Google para análisis
- Lee sus políticas de privacidad
- Para datos sensibles, considera no usar IA

**¿Puedo usar la app sin IA?**
Sí, todas las funcionalidades básicas funcionan sin IA.

**¿Qué idiomas soporta la transcripción?**
Whisper soporta 99+ idiomas, incluidos ES, EN, FR, DE, IT, PT, etc.

**¿La transcripción es 100% precisa?**
No, típicamente 85-95% según calidad del audio. Revisa y corrige manualmente.

### Biblioteca y Proyectos

**¿Dónde se guardan mis archivos?**
En localStorage del navegador (local, no en la nube).

**¿Puedo acceder desde otro dispositivo?**
No, localStorage es por dispositivo/navegador.

**¿Se pueden sincronizar proyectos?**
No automáticamente. Usa 💾 Guardar y 📂 Cargar para compartir.

**¿Cuántos archivos puedo tener en la biblioteca?**
Límite de localStorage (~5-10MB). Típicamente 100-500 archivos según metadatos.

### METS y Estándares

**¿Es compatible con mi repositorio?**
Sí, genera METS 1.12 estándar, compatible con DSpace, Fedora, etc.

**¿Puedo personalizar el XML?**
Actualmente no, pero puedes editar el XML descargado.

**¿Soporta MODS?**
Sí, configurable en metadataStandard (Dublin Core o MODS).

**¿Incluye los archivos físicos en el METS?**
No, el METS solo referencia los archivos (FLocat). Debes subir los archivos por separado a tu repositorio.

### Soporte

**¿Dónde reporto bugs?**
GitHub: https://github.com/VCNPRO/Mets/issues

**¿Hay documentación técnica?**
Sí, en el repositorio GitHub.

**¿Puedo contribuir?**
Sí, es open source. Pull requests bienvenidos.

**¿Ofrece soporte comercial?**
Para consultorías o personalizaciones, contacta al equipo.

---

## Conclusión

annamets XML Builder v3.0 es la herramienta más avanzada para creación de archivos METS, ahora potenciada con inteligencia artificial para análisis automático de contenido audiovisual.

**Características destacadas:**
- ✅ Generación de METS profesionales
- 🤖 Transcripción y análisis con IA
- 📚 Biblioteca de archivos inteligente
- 📊 Exportación avanzada de metadatos
- 💾 Gestión completa de proyectos

**Empieza ahora:**
1. Abre la app
2. Configura tus API keys (opcional)
3. Selecciona una plantilla
4. Carga tus archivos
5. Genera tu METS con metadatos enriquecidos por IA

**¡Bienvenido a la era de la catalogación inteligente!**

---

*Actualizado: Noviembre 2024 - Versión 3.0*
*Guía completa de annamets XML Builder*
