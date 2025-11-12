# 📖 Guía Completa - METS Builder v2.0

**Manual detallado para crear archivos METS profesionales**

---

## 📑 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Primeros Pasos](#primeros-pasos)
3. [Templates Predefinidos](#templates-predefinidos)
4. [Secciones del Formulario](#secciones-del-formulario)
5. [Analizador de Archivos](#analizador-de-archivos)
6. [Validación XML](#validación-xml)
7. [Gestión de Proyectos](#gestión-de-proyectos)
8. [Casos de Uso](#casos-de-uso)
9. [Solución de Problemas](#solución-de-problemas)
10. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Introducción

### ¿Qué es METS Builder?

METS Builder es una aplicación web profesional para crear archivos XML en formato METS (Metadata Encoding & Transmission Standard), el estándar internacional para preservación digital utilizado por bibliotecas, archivos y repositorios institucionales.

### ¿Para quién es?

- 📚 **Bibliotecas**: Digitalización de colecciones
- 🏛️ **Archivos**: Preservación de documentos históricos
- 🎓 **Universidades**: Repositorios institucionales
- 📸 **Fotógrafos**: Gestión de colecciones con metadatos
- 🎬 **Productoras**: Archivo de material audiovisual
- 👨‍💼 **Profesionales**: Gestión documental

### Características Principales

#### ✨ Versión 2.0 incluye:

1. **6 Templates Profesionales** - Inicio rápido según tu proyecto
2. **Analizador Multimedia** - Extracción automática de EXIF y checksums
3. **Drag & Drop** - Carga de archivos intuitiva
4. **Validación XML** - Verificación en tiempo real
5. **Gestión de Proyectos** - Auto-guardado y persistencia
6. **Dublin Core Completo** - 15 elementos estándar
7. **MIX + PREMIS** - Metadatos técnicos y de preservación
8. **Checksums Automáticos** - MD5 y SHA-256 para integridad

### Estándares Soportados

- ✅ **METS** 1.12 (Metadata Encoding & Transmission Standard)
- ✅ **Dublin Core** 15 elementos (Simple y Qualified)
- ✅ **MODS** 3.7 (Metadata Object Description Schema)
- ✅ **MIX** 2.0 (NISO Metadata for Images in XML)
- ✅ **PREMIS** 3.0 (Preservation Metadata Standard)

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

La interfaz está dividida en:

```
┌─────────────────────────────────────────┐
│ BARRA DE HERRAMIENTAS                   │
│ [Nombre Proyecto] [Templates] [Guardar] │
├─────────────────────────────────────────┤
│ 0. Encabezado METS (metsHdr)           │
│ 1. Metadatos Descriptivos (dmdSec)     │
│ 2. Metadatos Administrativos (amdSec)  │
│ 3. Sección de Archivos (fileSec)       │
│ 4. Mapa Estructural (structMap)        │
│ [GENERAR XML METS]                      │
│ RESULTADO - XML + Validación            │
└─────────────────────────────────────────┘
```

---

## Templates Predefinidos

### Acceso al Selector

Click en **🎨 Nueva Plantilla** en la barra superior.

### Plantillas Disponibles

#### 📚 Libro Digital
**Ideal para:**
- Libros escaneados
- Tesis digitales
- Documentos multivolumen

**Pre-configura:**
- Estructura: Portada → Índice → Capítulos → Contraportada
- Dublin Core: Type = "Text", Format = "application/pdf"
- Metadatos: Resolución 600dpi, OCR

**Ejemplo de uso:**
```
Proyecto: "Don Quijote - Edición 1605"
Archivos: portada.jpg, cap1.pdf, cap2.pdf, ...
Estructura: Automática con capítulos numerados
```

#### 📰 Revista
**Ideal para:**
- Revistas digitalizadas
- Boletines
- Publicaciones periódicas

**Pre-configura:**
- Estructura: Portada → Editorial → Artículos → Publicidad
- Dublin Core: Type = "Text", Publisher
- Metadatos: Resolución 300dpi

#### 📷 Colección Fotográfica
**Ideal para:**
- Archivos fotográficos
- Exposiciones digitales
- Colecciones personales

**Pre-configura:**
- Estructura: Series fotográficas
- Dublin Core: Type = "Image", Coverage
- Metadatos: Extracción EXIF completa
- Checksums: MD5 + SHA-256

**Ejemplo de uso:**
```
Proyecto: "Barcelona 1950-1960"
Archivos: 200 fotos JPG con EXIF
Análisis: Automático de cámara, fecha, ubicación GPS
```

#### 🎬 Archivo de Video
**Ideal para:**
- Producciones audiovisuales
- Documentales
- Material histórico en video

**Pre-configura:**
- Estructura: Video principal + Subtítulos
- Dublin Core: Type = "MovingImage"
- Metadatos: Duración, bitrate, códec

#### 🎵 Colección de Audio
**Ideal para:**
- Grabaciones musicales
- Entrevistas
- Archivos sonoros

**Pre-configura:**
- Estructura: Pistas numeradas
- Dublin Core: Type = "Sound"
- Metadatos: Duración, sample rate

#### 📄 Archivo Documental
**Ideal para:**
- Documentos históricos
- Archivos administrativos
- Correspondencia

**Pre-configura:**
- Estructura: Páginas numeradas
- Dublin Core: Source, Coverage
- Metadatos: 600dpi, PDF/A

### Cómo Usar una Plantilla

1. Click **🎨 Nueva Plantilla**
2. Selecciona la plantilla apropiada
3. Review los campos pre-llenados
4. Personaliza según tu proyecto
5. Carga tus archivos
6. Genera el XML

---

## Secciones del Formulario

### Sección 0: Encabezado METS (metsHdr)

**Propósito:** Información sobre el documento METS mismo, no sobre el objeto digital.

#### Campos:

**Fecha de Creación** (obligatorio)
- Se establece automáticamente
- Formato ISO 8601: `2024-11-12T20:30:00Z`

**Fecha de Última Modificación**
- Se actualiza al regenerar el XML
- Útil para control de versiones

**Estado del Registro**
- `NEW` - Documento nuevo
- `INCOMPLETE` - Trabajo en progreso
- `COMPLETE` - Finalizado y revisado
- `DELETED` - Marcado para eliminación

**Agente Responsable**

*Nombre del Agente:*
- Persona u organización responsable
- Ejemplo: "Biblioteca Nacional de España"

*Tipo:*
- `INDIVIDUAL` - Persona
- `ORGANIZATION` - Institución
- `OTHER` - Otro tipo

*Rol:*
- `CREATOR` - Creó el documento METS
- `EDITOR` - Editó el documento
- `ARCHIVIST` - Archivista responsable
- `PRESERVATION` - Responsable de preservación
- `CUSTODIAN` - Custodio del material
- `IPOWNER` - Propietario de derechos

*Nota:*
- Información adicional sobre el agente

#### Ejemplo Completo:

```xml
<mets:metsHdr CREATEDATE="2024-11-12T20:30:00Z"
              LASTMODDATE="2024-11-12T21:15:00Z"
              RECORDSTATUS="COMPLETE">
    <mets:agent ROLE="CREATOR" TYPE="ORGANIZATION">
        <mets:name>Biblioteca Digital Hispánica</mets:name>
        <mets:note>Proyecto de digitalización 2024</mets:note>
    </mets:agent>
</mets:metsHdr>
```

---

### Sección 1: Metadatos Descriptivos (dmdSec)

**Propósito:** Describe QUÉ es el objeto digital.

#### Estándar de Metadatos

Selecciona entre:
- **Dublin Core (DC)** - 15 elementos estándar (recomendado)
- **MODS** - Metadata Object Description Schema (más complejo)

#### Campos Básicos (Dublin Core)

**Title** (Título) - OBLIGATORIO
- Nombre del objeto digital
- Ejemplo: "El Quijote - Primera Edición 1605"

**Creator** (Creador) - OBLIGATORIO
- Autor o responsable principal
- Ejemplo: "Miguel de Cervantes Saavedra"

**Date** (Fecha) - OBLIGATORIO
- Fecha de creación o publicación
- Formato: YYYY-MM-DD
- Ejemplo: "1605-01-16"

**Subject** (Asunto)
- Tema o materia
- Ejemplo: "Novela picaresca española, Siglo de Oro"

#### Campos Extendidos (Dublin Core)

Click en **"Mostrar Campos Extendidos"** para:

**Description** (Descripción)
- Descripción detallada del recurso
- Ejemplo: "Primera edición de la obra cumbre de Cervantes..."

**Publisher** (Editor/Publicador)
- Quién publicó el recurso
- Ejemplo: "Francisco de Robles"

**Contributor** (Contribuidor)
- Otros responsables (traductor, ilustrador, etc.)
- Ejemplo: "Gustave Doré (ilustraciones)"

**Type** (Tipo de Recurso)
- Naturaleza del contenido
- Valores: Text, Image, Sound, MovingImage, Dataset, Interactive
- Ejemplo: "Text"

**Format** (Formato)
- Formato físico o digital
- Tipo MIME o dimensiones físicas
- Ejemplo: "application/pdf" o "21 x 30 cm"

**Identifier** (Identificador)
- Referencia única
- ISBN, DOI, URI, etc.
- Ejemplo: "ISBN:978-84-376-0494-7"

**Source** (Fuente)
- Recurso del cual deriva
- Ejemplo: "Original en Biblioteca Nacional, signatura R/12345"

**Language** (Idioma)
- Idioma del contenido
- Código ISO 639
- Ejemplo: "es" (español), "en" (inglés)

**Relation** (Relación)
- Recursos relacionados
- Ejemplo: "Parte de: Colección Cervantina"

**Coverage** (Cobertura)
- Alcance espacial o temporal
- Ejemplo: "España, 1605-1615"

**Rights** (Derechos)
- Información de derechos de autor
- Ejemplo: "Dominio público. Digitalización bajo licencia CC-BY 4.0"

#### Ejemplo XML Resultante:

```xml
<mets:dmdSec ID="dmd_0">
    <mets:mdWrap MDTYPE="DC">
        <mets:xmlData>
            <dc:title>El Ingenioso Hidalgo Don Quijote de la Mancha</dc:title>
            <dc:creator>Miguel de Cervantes Saavedra</dc:creator>
            <dc:date>1605-01-16</dc:date>
            <dc:subject>Novela; Siglo de Oro; Literatura española</dc:subject>
            <dc:publisher>Francisco de Robles</dc:publisher>
            <dc:type>Text</dc:type>
            <dc:format>application/pdf</dc:format>
            <dc:language>es</dc:language>
            <dc:rights>Dominio público</dc:rights>
        </mets:xmlData>
    </mets:mdWrap>
</mets:dmdSec>
```

---

### Sección 2: Metadatos Administrativos (amdSec)

**Propósito:** Describe CÓMO se gestiona el objeto digital.

#### Campos:

**Titular de Derechos** (obligatorio)
- Propietario de los derechos
- Ejemplo: "Biblioteca Nacional de España"

**Resolución del Escáner**
- Para materiales digitalizados
- Ejemplo: "600dpi", "300dpi"

**Acciones de Preservación**
- Procesos aplicados
- Ejemplo: "Digitalización con escáner Zeutschel, OCR con ABBYY FineReader, conversión a PDF/A-1b"

**Estándar de Preservación**
- Por ahora solo: PREMIS

#### Ejemplo XML Resultante:

```xml
<mets:amdSec ID="amd_0">
    <mets:rightsMD ID="rights_0">
        <mets:mdWrap MDTYPE="OTHER" OTHERMDTYPE="RIGHTS">
            <mets:xmlData>
                <rights:rightsHolder>Biblioteca Nacional de España</rights:rightsHolder>
            </mets:xmlData>
        </mets:mdWrap>
    </mets:rightsMD>
    <mets:digiprovMD ID="digiprov_0">
        <mets:mdWrap MDTYPE="PREMIS">
            <mets:xmlData>
                <premis:event>
                    <premis:eventType>ingestion</premis:eventType>
                    <premis:eventDetail>Digitalización con escáner Zeutschel...</premis:eventDetail>
                </premis:event>
            </mets:xmlData>
        </mets:mdWrap>
    </mets:digiprovMD>
</mets:amdSec>
```

---

### Sección 3: Sección de Archivos (fileSec)

**Propósito:** Inventario de todos los archivos que componen el objeto digital.

#### Carga de Archivos

**Método 1: Drag & Drop** ⭐ Recomendado
1. Arrastra archivos a la zona de carga
2. El icono cambia de 📁 a 📂
3. Suelta los archivos
4. El analizador se ejecuta automáticamente

**Método 2: Click para Seleccionar**
1. Click en la zona de carga
2. Selecciona archivos del explorador
3. Click "Abrir"

#### Análisis Automático

La aplicación analiza cada archivo y extrae:

**Para TODOS los archivos:**
- ✅ **MD5** - Checksum para verificación rápida
- ✅ **SHA-256** - Checksum criptográfico seguro
- ✅ **Tamaño** - En bytes
- ✅ **Tipo MIME** - image/jpeg, video/mp4, etc.
- ✅ **Fechas** - Creación y modificación

**Para IMÁGENES (JPG, PNG, TIFF):**
- ✅ **Dimensiones** - Ancho × Alto en píxeles
- ✅ **Resolución** - DPI (dots per inch)
- ✅ **Espacio de color** - sRGB, Adobe RGB, etc.
- ✅ **Profundidad de bits** - 8, 16, 24 bits
- ✅ **EXIF completo:**
  - 📷 Fabricante y modelo de cámara
  - 📷 Fecha y hora de captura
  - 📷 ISO, Apertura (f-number), Velocidad de obturación
  - 📷 Distancia focal, modelo de lente
  - 📷 Coordenadas GPS (si disponible)
  - 📷 Software de edición usado

**Para VIDEOS (MP4, MOV, AVI):**
- ✅ **Duración** - En segundos
- ✅ **Bitrate** - Calidad del video
- ✅ **Códec** - H.264, HEVC, etc.

**Para AUDIO (MP3, WAV, M4A):**
- ✅ **Duración** - En segundos
- ✅ **Bitrate** - Calidad del audio
- ✅ **Sample rate** - 44.1kHz, 48kHz, etc.
- ✅ **Canales** - Mono, Estéreo, 5.1, etc.

#### Categorización Automática

Los archivos se clasifican según:
- **master** - Archivos > 5MB (originales de alta calidad)
- **derivative** - Derivados para web/visualización
- **thumbnail** - Miniaturas < 100KB
- **archive** - Archivos generales

#### Vista de Archivos Cargados

Ejemplo de lo que verás:

```
┌────────────────────────────────────────────────┐
│ foto_original.jpg                    [master]  │
│ 4,523 KB • image/jpeg                          │
│                                                 │
│ MD5: a3d4e5f67890abc1234567890abcdef1          │
│ SHA-256: b7c8d9e01234def56789...               │
│                                                 │
│ 📐 6720 × 4480px • 300dpi • sRGB              │
│                                                 │
│ 📷 Canon EOS 5D Mark IV                        │
│    f/2.8 • 1/250s • ISO 400 • 24mm            │
│    Capturada: 2024-03-15 14:30:22             │
│    GPS: 41.3851° N, 2.1734° E (Barcelona)     │
│                                      [Eliminar]│
└────────────────────────────────────────────────┘
```

#### XML Generado (ejemplo):

```xml
<mets:fileSec>
    <mets:fileGrp ID="filegrp_0" USE="master">
        <mets:file ID="file_0"
                   MIMETYPE="image/jpeg"
                   SIZE="4631552"
                   CREATED="2024-03-15T14:30:22Z"
                   CHECKSUM="a3d4e5f67890abc1234567890abcdef1"
                   CHECKSUMTYPE="MD5">
            <mets:FLocat LOCTYPE="URL"
                        xlink:href="foto_original.jpg"
                        CHECKSUM="b7c8d9e01234def..."
                        CHECKSUMTYPE="SHA-256"/>
        </mets:file>
    </mets:fileGrp>
</mets:fileSec>

<mets:amdSec>
    <mets:techMD ID="tech_0">
        <mets:mdWrap MDTYPE="NISOIMG">
            <mets:xmlData>
                <mix:mix>
                    <mix:imageWidth>6720</mix:imageWidth>
                    <mix:imageHeight>4480</mix:imageHeight>
                    <mix:xSamplingFrequency>300</mix:xSamplingFrequency>
                    <mix:colorSpace>sRGB</mix:colorSpace>
                </mix:mix>
            </mets:xmlData>
        </mets:mdWrap>
    </mets:techMD>
</mets:amdSec>
```

---

### Sección 4: Mapa Estructural (structMap)

**Propósito:** Define la jerarquía y orden de los archivos.

#### Añadir Divisiones

1. Click **"Añadir División"**
2. Ingresa una etiqueta (ej: "Capítulo 1", "Portada", "Página 1")
3. Selecciona archivos asociados
4. Reordena con botones ↑↓

#### Ejemplo de Estructura:

```
Material Digital
├── Portada (cover)
│   └── portada.jpg
├── Índice (tableOfContents)
│   └── indice.pdf
├── Capítulo 1 (chapter)
│   ├── cap1_pag1.jpg
│   ├── cap1_pag2.jpg
│   └── cap1_pag3.jpg
├── Capítulo 2 (chapter)
│   ├── cap2_pag1.jpg
│   └── cap2_pag2.jpg
└── Contraportada (cover)
    └── contraportada.jpg
```

#### XML Generado:

```xml
<mets:structMap TYPE="physical">
    <mets:div TYPE="material">
        <mets:div TYPE="cover" LABEL="Portada" ORDER="1">
            <mets:fptr FILEID="file_0"/>
        </mets:div>
        <mets:div TYPE="tableOfContents" LABEL="Índice" ORDER="2">
            <mets:fptr FILEID="file_1"/>
        </mets:div>
        <mets:div TYPE="chapter" LABEL="Capítulo 1" ORDER="3">
            <mets:fptr FILEID="file_2"/>
            <mets:fptr FILEID="file_3"/>
            <mets:fptr FILEID="file_4"/>
        </mets:div>
    </mets:div>
</mets:structMap>
```

---

## Analizador de Archivos

### Ubicación

Sección 3: "Sección de Ficheros (fileSec)"

### Proceso de Análisis

1. **Detección de Tipo**
   - Identifica si es imagen, video, audio, o documento

2. **Cálculo de Checksums**
   - MD5: ~2 segundos por MB
   - SHA-256: ~3 segundos por MB

3. **Extracción de Metadatos**
   - EXIF: Instantáneo
   - Dimensiones: Instantáneo
   - Duración video/audio: 1-2 segundos

4. **Visualización**
   - Muestra todos los metadatos extraídos
   - Permite revisar antes de generar XML

### Barra de Progreso

```
┌────────────────────────────────────────────┐
│ Analizando archivos... 3 / 10             │
│ ████████████░░░░░░░░░░░░░░ 30%            │
│ Extrayendo metadatos EXIF, calculando     │
│ checksums (MD5, SHA-256)...                │
└────────────────────────────────────────────┘
```

### Formatos Soportados

**Imágenes (con EXIF):**
- JPG/JPEG ✅
- TIFF ✅
- PNG ✅ (EXIF limitado)
- WEBP ✅
- DNG/RAW ⚠️ (parcial)

**Videos:**
- MP4 ✅
- MOV ✅
- AVI ✅
- WEBM ✅
- MKV ⚠️ (parcial)

**Audio:**
- MP3 ✅
- WAV ✅
- M4A ✅
- OGG ✅
- FLAC ⚠️ (parcial)

**Documentos:**
- PDF ✅ (solo checksums y tamaño)
- DOCX ✅ (solo checksums y tamaño)

---

## Validación XML

### Ubicación

Aparece automáticamente después de generar el XML.

### Tipos de Validación

#### 1. Estructura XML
- ✅ XML bien formado
- ✅ Sin errores de sintaxis

#### 2. Elementos Requeridos
- ✅ metsHdr presente
- ✅ dmdSec presente (obligatorio)
- ✅ amdSec presente
- ✅ fileSec presente
- ✅ structMap presente

#### 3. Integridad
- ✅ Archivos tienen checksums
- ✅ Referencias válidas entre secciones

### Panel de Validación

```
┌─────────────────────────────────────────┐
│ ✅ XML Válido                           │
├─────────────────────────────────────────┤
│ ✅ metsHdr    ✅ dmdSec    ✅ amdSec   │
│ ✅ fileSec    ✅ structMap ✅ Checksums│
├─────────────────────────────────────────┤
│ 📁 15 archivos incluidos                │
└─────────────────────────────────────────┘
```

### Indicadores

| Símbolo | Significado |
|---------|-------------|
| ✅ | Presente y válido |
| ⚠️ | Presente pero con advertencias |
| ❌ | Falta o inválido |

### Errores vs Advertencias

**Errores (bloquean la descarga):**
- ❌ dmdSec ausente
- ❌ Título vacío
- ❌ Sin archivos

**Advertencias (permiten continuar):**
- ⚠️ metsHdr ausente (recomendado pero no obligatorio)
- ⚠️ Sin checksums
- ⚠️ structMap vacío

---

## Gestión de Proyectos

### Auto-guardado

**Automático cada 1 segundo**
- Guarda en localStorage del navegador
- No requiere acción del usuario
- Indica "Auto-guardado" en la barra

### Guardar Proyecto

1. Click **💾 Guardar Proyecto**
2. Se descarga archivo JSON:
   - Nombre: `[Proyecto]_2024-11-12.json`
   - Contiene: Todo el estado de la aplicación
   - Tamaño: ~10-50 KB dependiendo del proyecto

### Cargar Proyecto

1. Click **📂 Cargar Proyecto**
2. Selecciona archivo `.json` guardado anteriormente
3. Se restaura todo:
   - Metadatos
   - Referencias a archivos (¡no los archivos físicos!)
   - Estructura
   - Configuración

⚠️ **Importante:** Solo se guarda la metadata, NO los archivos físicos. Mantén los archivos en la misma ubicación.

### Restauración Automática

Al reabrir la aplicación:
- Se carga automáticamente el último proyecto
- Útil si cierras accidentalmente
- Puedes desactivarlo limpiando caché del navegador

---

## Casos de Uso

### Caso 1: Digitalización de Libro Antiguo

**Escenario:**
Biblioteca digitaliza libro del siglo XVII.

**Pasos:**
1. Template: "Libro Digital"
2. Metadatos:
   - Título: "Arte de la Lengua Española (1625)"
   - Autor: "Gonzalo Correas"
   - Publisher: "Universidad de Salamanca"
   - Coverage: "España, siglo XVII"
3. Archivos:
   - 250 páginas escaneadas a 600dpi (JPG)
   - PDF/A compilado
4. Estructura:
   - Portada → Prólogo → Capítulos → Índice
5. Validación: Verificar checksums
6. Resultado: METS listo para repositorio institucional

---

### Caso 2: Colección Fotográfica Personal

**Escenario:**
Fotógrafo organiza 500 fotos de viaje.

**Pasos:**
1. Template: "Colección Fotográfica"
2. Metadatos:
   - Título: "Viaje a Japón 2024"
   - Creator: "María González"
   - Coverage: "Japón, marzo 2024"
3. Archivos:
   - 500 JPG con EXIF completo
   - Analizador extrae: cámara, GPS, fechas automáticamente
4. Estructura:
   - Serie 1: Tokio
   - Serie 2: Kioto
   - Serie 3: Osaka
5. Checksums: MD5 y SHA-256 automáticos
6. Resultado: Colección con metadatos profesionales

---

### Caso 3: Archivo de Video Documental

**Escenario:**
Productora archiva documental terminado.

**Pasos:**
1. Template: "Archivo de Video"
2. Metadatos:
   - Título: "Historia de Barcelona"
   - Type: "MovingImage"
   - Contributor: Director, Editor, etc.
3. Archivos:
   - video_master.mov (10GB, ProRes)
   - video_web.mp4 (500MB, H.264)
   - subtitulos_es.srt
   - subtitulos_en.srt
4. Analizador extrae:
   - Duración: 45:32
   - Códec: ProRes 422 HQ
   - Resolución: 3840×2160
5. Estructura:
   - Video Principal → Subtítulos ES → Subtítulos EN
6. Resultado: Archivo profesional con múltiples versiones

---

## Solución de Problemas

### Problema: No se ven metadatos EXIF

**Causas posibles:**
1. El archivo no tiene EXIF (screenshots, imágenes de internet)
2. El EXIF fue eliminado al editar
3. Formato no soportado

**Solución:**
- Usa fotos originales de cámara o teléfono
- Verifica con un lector EXIF externo
- Convierte a JPG si está en otro formato

---

### Problema: Análisis muy lento

**Causas:**
1. Archivos muy grandes (>50MB)
2. Muchos archivos simultáneos (>20)
3. Navegador lento

**Solución:**
- Carga archivos en lotes más pequeños
- Usa archivos derivados en vez de masters
- Actualiza el navegador
- Cierra otras pestañas

---

### Problema: Error al generar XML

**Causas:**
1. Falta información obligatoria
2. Caracteres especiales en nombres
3. Sin archivos cargados

**Solución:**
- Completa todos los campos marcados con *
- Renombra archivos sin caracteres especiales
- Verifica que haya al menos un archivo

---

### Problema: El proyecto no se guarda

**Causas:**
1. localStorage lleno
2. Modo incógnito del navegador
3. Permisos deshabilitados

**Solución:**
- Limpia caché del navegador
- Usa modo normal (no incógnito)
- Guarda proyecto como JSON manualmente

---

## Preguntas Frecuentes

### ¿Es gratuito?
Sí, 100% gratuito y open source.

### ¿Dónde se guardan mis archivos?
Los archivos se analizan localmente en tu navegador y NO se suben a ningún servidor.

### ¿Puedo usar offline?
Parcialmente. La validación funciona offline, pero necesitas conexión inicial.

### ¿Qué navegadores soporta?
Chrome, Firefox, Safari, Edge (versiones modernas).

### ¿Cuál es el límite de tamaño de archivo?
Depende de tu RAM. Recomendado: <100MB por archivo.

### ¿Puedo editar el XML después?
Sí, el XML generado es estándar y editable en cualquier editor de texto.

### ¿Cómo reporto un bug?
https://github.com/VCNPRO/Mets/issues

---

## Contacto y Soporte

### Documentación
- README: https://github.com/VCNPRO/Mets/blob/main/README_ES.md
- Guías: Dentro de la aplicación

### Asistente Virtual
💬 **Laia** - Chatbot disponible 24/7
- Click en el icono 💬 en la esquina inferior derecha
- Pregunta cualquier duda sobre funcionalidad
- Basada en esta guía completa

### GitHub
- Repositorio: https://github.com/VCNPRO/Mets
- Issues: https://github.com/VCNPRO/Mets/issues
- Pull Requests: Bienvenidos

---

**Versión de la guía:** 2.0
**Última actualización:** 12 de Noviembre, 2024
**Aplicación compatible:** METS Builder v2.0+

---

**¡Gracias por usar METS Builder!** 🎉
