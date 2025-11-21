# 🚀 Guía Rápida - annamets XML Builder

**Crea archivos METS profesionales con análisis automático de IA**

---

## ⚡ Inicio Rápido en 5 Pasos

### 1️⃣ Selecciona una Plantilla
Click en **🎨 Nueva Plantilla** y elige:

**Templates Base:**
- 📚 **Libro Digital** - Para libros escaneados
- 📰 **Revista** - Para publicaciones periódicas
- 📷 **Fotografía** - Para colecciones de imágenes
- 🎬 **Video** - Para archivos audiovisuales
- 🎵 **Audio** - Para grabaciones
- 📄 **Documento** - Para archivos históricos

**🆕 Templates Regionales:** (con perfiles METS oficiales)
- 🏴 **Euskadi** (7 plantillas) - Biblioteca Digital de Euskadi
- 🏴 **Galicia** (3 plantillas) - Biblioteca Dixital de Galicia
- 🇪🇸 **Hispana / BVPB** (3 plantillas) - Agregador nacional español

### 2️⃣ Completa los Datos Básicos
Rellena los campos obligatorios (marcados con *):
- **Título** del objeto digital
- **Autor/Creador**
- **Fecha** de creación
- **Titular de derechos**

### 3️⃣ Carga tus Archivos
**Arrastra y suelta** archivos en la zona de carga, o haz click para seleccionar.

**Análisis automático:**
- ✅ Checksums MD5 y SHA-256
- ✅ Metadatos EXIF de imágenes
- ✅ Duración de videos/audio
- ✅ Dimensiones, resolución, códecs
- ✅ Se guardan en la **Biblioteca de Archivos**

**🆕 NUEVO: Análisis con IA** (para audio/video):
- 🎙️ Transcripción automática
- 📝 Generación de subtítulos (.srt, .vtt)
- 🧠 Resumen y keywords
- 🏷️ Detección de entidades

### 4️⃣ Organiza la Estructura
En el **Mapa Estructural**:
- Añade divisiones (capítulos, páginas, secciones)
- Arrastra archivos a cada división
- Reordena según necesites

### 5️⃣ Genera y Descarga
- Click en **"Generar XML METS"**
- Revisa la **validación automática** (✅/⚠️)
- **Descarga** el archivo XML

---

## 🏴 Templates Regionales (NUEVO)

### ¿Qué son?
Perfiles METS oficiales para bibliotecas digitales regionales de España, con estándares específicos de metadatos y requisitos técnicos.

### Regiones disponibles

#### 🏴 Euskadi - Biblioteca Digital de Euskadi
**7 plantillas** con perfiles ELD_001 a ELD_004:
- ✅ **Metadatos:** Dublin Core
- ✅ **Preservación:** PREMIS events + MIX + EBUCORE
- ✅ **Identificación:** Header verde-rojo + badge "Euskadi"
- 📚 No seriados (preservación y difusión)
- 📰 Seriados (preservación y difusión)
- 🎵 Audio, 🎬 Video, 📜 Manuscritos

**Cuándo usar:** Publicas en liburutegidigitala.euskadi.eus

#### 🏴 Galicia - Biblioteca Dixital de Galicia
**3 plantillas** con perfil LOC Historical Newspapers:
- ✅ **Metadatos:** MARC21 (NO Dublin Core)
- ✅ **Preservación:** PREMIS + jhove validation
- ✅ **Derechos:** metsRights completo
- ✅ **Identificación:** Header azul-celeste + badge "Galicia"
- ✅ **5 fileGrp obligatorios:** ARCHIVE_TIF, REFERENCE_JPEG, OCRDIRTY_PDF, THUMBNAIL, OCR_ALTO
- 📰 Prensa histórica, 📚 Monografías, 📜 Manuscritos

**Cuándo usar:** Publicas en biblioteca.galiciana.gal

#### 🇪🇸 Hispana / BVPB - Agregador Nacional
**3 plantillas** con perfil LOC:
- ✅ **Metadatos:** MODS 3.7 (NO Dublin Core)
- ✅ **Preservación:** PREMIS events + MIX
- ✅ **Identificación:** Header rojo-amarillo + badge "Hispana / BVPB"
- 📰 Prensa histórica (BVPB), 📚 Libros antiguos, 🗺️ Cartografía

**Cuándo usar:** Publicas en Hispana, BVPB o BNE

### Particularidades técnicas clave

**Euskadi:**
- Perfiles ELD propios (ELD_001, ELD_002, ELD_003, ELD_004)
- MIX para imágenes, EBUCORE para audio/video
- 4-6 fileGrp según tipo de material

**Galicia:**
- Exactamente 5 fileGrp (obligatorios)
- jhove validation como evento PREMIS
- metsRights completo (category, holder, context, status)
- 400dpi para prensa, 600dpi para manuscritos

**Hispana:**
- MODS completo con autoridades
- structMap con tipos LOC (news:issue, news:page, news:article)
- ALTO XML v2.0+ obligatorio
- 400-600dpi según material

**Ver Guía Completa** para detalles técnicos completos de cada plantilla regional.

---

## 🤖 Análisis con IA (NUEVO)

### Configuración Inicial
1. Click en **🤖 IA** (esquina superior derecha)
2. Ingresa tus API keys:
   - **OpenAI** (para transcripción Whisper)
   - **Gemini** (para análisis de contenido)
3. Guarda la configuración

**¿Dónde conseguir las API keys?**
- OpenAI: https://platform.openai.com/api-keys
- Gemini: https://makersuite.google.com/app/apikey

### Usar el Análisis con IA
1. Carga un archivo de audio o video
2. Click en botón **🤖 IA** junto al archivo
3. Selecciona qué analizar:
   - ☑️ Transcripción automática
   - ☑️ Generar subtítulos
   - ☑️ Análisis de contenido
4. Espera el análisis (30-60 seg/minuto de audio)
5. **Descarga** los archivos generados (.srt, .vtt, .json)

**Resultados que obtendrás:**
- 📝 Transcripción completa del audio
- 🗣️ Idioma detectado + confianza
- 📊 Resumen del contenido
- 🏷️ Keywords y temas principales
- 👤 Entidades (personas, lugares, organizaciones)
- ⬇️ Subtítulos descargables

---

## 📚 Biblioteca de Archivos

### ¿Qué es?
Todos los archivos que procesas se guardan automáticamente en una biblioteca local.

### ¿Para qué sirve?
- ✅ Reutilizar archivos en múltiples proyectos METS
- ✅ No volver a calcular checksums (ahorra tiempo)
- ✅ Mantener análisis de IA para uso futuro
- ✅ Buscar y filtrar por tipo de archivo

### Cómo usar la biblioteca
1. Click **📚 Abrir Biblioteca de Archivos**
2. Busca o filtra archivos
3. Selecciona los que necesitas
4. Click **➕ Añadir Seleccionados**

---

## 💾 Gestión de Proyectos

### Auto-guardado
Tus cambios se guardan automáticamente cada segundo.

### Guardar Proyecto
Click **💾 Guardar Proyecto** para descargar un archivo JSON.

### Cargar Proyecto
Click **📂 Cargar Proyecto** para restaurar un proyecto guardado.

---

## 📊 Exportar Metadatos

**Desde la Sección de Archivos:**
- **📄 CSV** - Compatible con Excel/Google Sheets
- **📊 Excel** - Archivo .xlsx con formato
- **🔧 JSON** - Datos estructurados

**Incluye todos los metadatos:**
- Técnicos (resolución, codec, bitrate)
- EXIF (cámara, ISO, GPS)
- Checksums (MD5, SHA-256)
- **🆕 IA** (transcripción, keywords, entidades)

---

## 📋 Secciones de la App

| Sección | Qué hace |
|---------|----------|
| **🤖 IA** (Header) | Configurar API keys para análisis automático |
| **📚 Guías** (Header) | Ver esta guía y la guía completa |
| **0. Encabezado METS** | Información del documento METS |
| **1. Metadatos Descriptivos** | Título, autor, fecha, tema (Dublin Core) |
| **2. Metadatos Administrativos** | Derechos, preservación |
| **3. Sección de Archivos** | Carga, analiza y exporta archivos multimedia |
| **4. Mapa Estructural** | Organiza la jerarquía de archivos |
| **Resultado** | XML generado con validación |

---

## 🎯 Consejos Rápidos

### Para mejores resultados:
- ✅ Usa fotos con EXIF (directas de cámara)
- ✅ Nombra archivos de forma descriptiva
- ✅ Organiza archivos antes de cargar
- ✅ Revisa la validación antes de descargar
- 🆕 **Configura IA** para audio/video automáticos

### Atajos útiles:
- **Drag & Drop**: Arrastra archivos directamente
- **Auto-guardado**: No necesitas guardar manualmente
- **Templates**: Usa plantillas para comenzar rápido
- **Biblioteca**: Reutiliza archivos ya procesados
- **Exportar**: CSV, Excel, JSON con todos los metadatos
- **IA**: Transcribe y analiza automáticamente

---

## ⚠️ Problemas Comunes

### No veo metadatos EXIF
- Los screenshots no tienen EXIF
- Usa fotos originales de cámara/teléfono

### El archivo no se carga
- Verifica el formato (JPG, PNG, MP4, PDF...)
- Archivos muy grandes pueden tardar

### Falta información en el XML
- Completa los campos obligatorios (*)
- Añade al menos un archivo

### El análisis con IA no funciona
- Verifica que hayas configurado las API keys (🤖 IA)
- Comprueba que tienes conexión a internet
- Asegúrate de que las keys sean válidas

---

## 📞 ¿Necesitas Ayuda?

💬 **Chatea con Laia**, tu asistente virtual
- Click en el icono 💬 en la esquina inferior derecha
- Pregunta cualquier duda sobre el funcionamiento
- Disponible 24/7

📚 **Guía Completa**
- Click en **📚 Guías** en el header
- Selecciona **Guía Completa**
- Documentación detallada de todas las funciones

---

## 🆕 Novedades de esta Versión

### Análisis con Inteligencia Artificial
- 🎙️ **Transcripción automática** con OpenAI Whisper
- 🧠 **Análisis de contenido** con Google Gemini
- 📝 **Generación de subtítulos** (.srt y .vtt)
- 🏷️ **Extracción de keywords** y entidades

### Biblioteca de Archivos
- 💾 **Almacenamiento automático** de archivos procesados
- 🔍 **Búsqueda y filtros** por tipo
- ♻️ **Reutilización** en múltiples proyectos

### Exportación Avanzada
- 📊 **Excel/CSV/JSON** con todos los metadatos
- 📈 **Datos de IA** incluidos en la exportación
- 🔧 **Formato estructurado** para análisis

### Mejoras de UI
- 🎨 **Diseño de dos columnas** (responsive)
- 🤖 **Nueva fuente Orbitron** para el título
- 🎨 **Rebranding** a "annamets"

---

**¡Listo! Ahora tienes METS profesionales con análisis automático de IA.**
