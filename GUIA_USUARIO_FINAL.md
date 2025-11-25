# 📖 Guía de Usuario - annamets XML Builder

¡Bienvenido a annamets XML Builder! Esta guía está diseñada para ayudarte a crear archivos METS profesionales de manera sencilla, incluso si no tienes experiencia técnica previa.

---

## 1. Introducción al annamets XML Builder

### ¿Qué es annamets XML Builder y para qué sirve?

annamets XML Builder es una herramienta web muy fácil de usar que te ayuda a crear archivos en formato **METS (Metadata Encoding & Transmission Standard)**. METS es como un "documento de identidad" especial para tus archivos digitales (fotos, videos, audios, documentos antiguos, etc.). Permite organizar toda la información importante sobre ellos para que puedan ser guardados y consultados a largo plazo, ¡incluso en el futuro!

La aplicación simplifica este proceso, que tradicionalmente es complejo, y además, incorpora **Inteligencia Artificial (IA)** para analizar automáticamente tus contenidos y añadir datos valiosos.

### ¿Para quién es útil annamets XML Builder?

Esta herramienta es perfecta para:
*   **Bibliotecas y Archivos:** Para preservar colecciones digitales y documentos históricos.
*   **Universidades e Investigadores:** Para organizar repositorios, estudiar entrevistas o analizar datos.
*   **Fotógrafos y Productores Audiovisuales:** Para gestionar grandes colecciones de imágenes, videos o audios, extrayendo metadatos clave.
*   **Cualquier persona** que necesite crear archivos METS de forma profesional y eficiente, sin ser un experto en programación.

### Características principales

*   **Creación fácil de METS:** Genera archivos XML METS válidos para la preservación digital.
*   **Análisis automático de archivos:** Extrae información técnica de tus imágenes, videos y audios (como fechas, modelos de cámara, duración, etc.).
*   **Inteligencia Artificial integrada:** Analiza videos y audios para generar transcripciones, resúmenes, palabras clave y subtítulos.
*   **Plantillas para empezar rápido:** Incluye plantillas predefinidas y regionales para diferentes tipos de proyectos y requisitos específicos.
*   **Gestión de proyectos:** Guarda tu trabajo automáticamente, y te permite guardar y cargar tus proyectos.
*   **Validación automática:** Verifica que tu archivo METS sea correcto y te avisa si hay errores.

### Estándares que soporta

annamets XML Builder trabaja con los principales estándares internacionales de preservación digital, como:
*   **METS:** El estándar principal para la estructura del documento.
*   **Dublin Core, MODS, MARC21:** Para describir el contenido de tus archivos (título, autor, tema).
*   **MIX, EBUCORE:** Para los detalles técnicos de tus imágenes, videos y audios.
*   **PREMIS:** Para documentar todas las acciones de preservación digital que se han realizado.
*   **OpenAI Whisper y Google Gemini:** Las inteligencias artificiales usadas para los análisis avanzados.

---

## 2. Primeros Pasos

### Acceso a la aplicación

Puedes usar annamets XML Builder de dos maneras:

#### Opción 1: Online (recomendado)
La forma más sencilla de empezar es accediendo a la aplicación directamente desde tu navegador web. No necesitas instalar nada.

*   **Visita:** `https://mets-silk.vercel.app/`

#### Opción 2: Local (para usuarios avanzados o desarrolladores)
Si prefieres ejecutar la aplicación en tu propio ordenador (sin conexión a internet, o para desarrollo), puedes instalarla localmente. Necesitarás tener Node.js instalado.

1.  **Descarga el código:**
    ```bash
    git clone https://github.com/VCNPRO/Mets.git
    ```
2.  **Entra a la carpeta del proyecto:**
    ```bash
    cd Mets
    ```
3.  **Instala las dependencias (programas necesarios):**
    ```bash
    npm install
    ```
4.  **Inicia la aplicación:**
    ```bash
    npm run dev
    ```
    Luego, abre tu navegador y visita `http://localhost:5173`.

### Visita guiada por la interfaz principal

Cuando abres annamets XML Builder, verás una interfaz organizada para facilitar tu trabajo:

```
┌────────────────────────────────────────────────────────┐
│ [LOGO] annamets XML Builder                            │
│ [🎨 Plantillas] [🏴 Euskadi] [🇪🇸 Hispana] [🏴 Galicia] [📚 Guías] │
├──────────────────────┬─────────────────────────────────┤
│ COLUMNA IZQUIERDA    │ COLUMNA DERECHA                 │
│ (Metadatos)          │ (Archivos y Estructura)         │
│                      │                                 │
│ 0. Encabezado METS   │ 3. Sección de Ficheros         │
│ 1. Metadatos Desc.   │    (aquí subes y ves tus archivos)
│ 2. Metadatos Admin.  │                                 │
│                      │ 4. Mapa Estructural            │
│                      │    (organizas tus archivos)
├──────────────────────┴─────────────────────────────────┤
│ [Generar XML METS]                                     │
│ (Botón central para crear el documento final)          │
│                                                        │
│ RESULTADO - XML + Validación                           │
│ (Aquí verás el METS generado y si hay errores)         │
└────────────────────────────────────────────────────────┘
```

**Zonas clave:**

*   **Cabecera (arriba del todo):** Contiene el nombre de la aplicación, y los botones de acceso rápido a **Plantillas** (para empezar nuevos proyectos) y **Guías** (como esta que estás leyendo).
*   **Columna Izquierda (Metadatos):** Aquí introducirás toda la información descriptiva y administrativa de tu proyecto y los archivos (Título, autor, derechos, etc.). Se divide en las Secciones 0, 1 y 2.
*   **Columna Derecha (Archivos y Estructura):** Esta es la zona para cargar y gestionar tus archivos, y para definir cómo se organizan (capítulos de un libro, páginas de una revista, etc.). Se divide en las Secciones 3 y 4.
*   **Botón "Generar XML METS":** Cuando hayas terminado de rellenar toda la información, usa este botón para que la aplicación cree el archivo METS final.
*   **Zona de Resultado:** Debajo del botón "Generar", verás el código XML METS que la aplicación ha creado, junto con un informe de validación que te dirá si todo está correcto.

¡Listo para empezar tu primer proyecto! La siguiente sección te enseñará a seleccionar la plantilla más adecuada.

---

## 3. Empezando un Nuevo Proyecto

Al iniciar annamets XML Builder, puedes empezar un proyecto desde cero o usar una de las muchas plantillas disponibles. Las plantillas pre-configuran gran parte de la información (como los metadatos o la estructura básica) para ahorrarte tiempo y asegurar que tu proyecto cumpla con los estándares adecuados.

### Cómo seleccionar una Plantilla

En la **cabecera** de la aplicación, encontrarás varios botones para empezar un nuevo proyecto:

*   **🎨 Plantillas:** Este es el botón principal para acceder a todas las plantillas disponibles. Al hacer clic, se abrirá una ventana donde podrás elegir entre las plantillas base y las regionales.
*   **Acceso Directo a Plantillas Regionales:** Justo al lado del botón "🎨 Plantillas", encontrarás accesos directos a las plantillas regionales más comunes:
    *   **🏴 Euskadi:** Para proyectos de la Biblioteca Digital de Euskadi.
    *   **🇪🇸 Hispana:** Para proyectos que sigan los estándares de Hispana / BVPB.
    *   **🏴 Galicia:** Para proyectos de la Biblioteca Dixital de Galicia.

Al hacer clic en cualquiera de estos botones de plantilla (ya sea el principal o los de acceso directo), la aplicación te pedirá confirmación, ya que al seleccionar una nueva plantilla se borrará cualquier trabajo no guardado que tengas en el proyecto actual.

### Plantillas Base

Estas plantillas son genéricas y muy útiles para empezar rápidamente con los tipos de objetos digitales más comunes:

*   **📚 Libro Digital:** Ideal para libros escaneados, manuscritos o documentos largos con capítulos y páginas.
*   **📰 Revista / Publicación Periódica:** Perfecta para revistas, periódicos o boletines con artículos y secciones.
*   **📷 Colección Fotográfica:** Diseñada para organizar álbumes de fotos o grandes colecciones de imágenes, con soporte para metadatos de cámara (EXIF).
*   **🎬 Archivo de Video:** Para documentales, grabaciones o cualquier material audiovisual, incluyendo espacio para subtítulos.
*   **🎵 Colección de Audio:** Para grabaciones sonoras, música o testimonios orales.
*   **📄 Archivo Documental:** Útil para documentos administrativos, expedientes o archivos históricos.
*   **📋 Vacío:** Si eres un usuario avanzado y quieres configurar todo desde cero, elige esta opción.

### Plantillas Regionales (Euskadi, Hispana, Galicia)

Estas plantillas están diseñadas para cumplir con los requisitos específicos de las principales bibliotecas digitales de España. Si tu proyecto está destinado a ser publicado en alguno de estos repositorios, **es crucial que uses su plantilla regional correspondiente**.

**¿Por qué son diferentes las plantillas regionales?**

Cada institución tiene sus propias "reglas" sobre cómo debe ser el archivo METS que reciben. Estas reglas afectan a:
*   **Metadatos:** Por ejemplo, Galicia usa **MARC21**, Hispana usa **MODS**, mientras que la mayoría de las plantillas base usan **Dublin Core**.
*   **Estructura de Archivos:** Algunas requieren un número y tipo específico de grupos de archivos (como los 5 `fileGrp` obligatorios de Galicia).
*   **Estándares de Preservación:** Pueden requerir validaciones específicas (`jhove` en Galicia) o el uso de estándares técnicos como **MIX** (para imágenes) o **EBUCORE** (para audio/video).

Al elegir una de estas plantillas, la aplicación pre-configurará todo para que tu archivo METS sea compatible con los requisitos de esa biblioteca digital. Si no estás seguro, puedes consultar la sección "4. Secciones del Formulario" y "4.1. Metadatos Administrativos" para más detalles sobre los estándares específicos.

---

## 4. Completa los Metadatos del Proyecto

La columna izquierda de la interfaz de annamets XML Builder está dedicada a los metadatos de tu proyecto. Aquí es donde introduces toda la información "no visible" de tus objetos digitales. Esta información es crucial para la búsqueda, identificación y preservación a largo plazo.

### Sección 0: Encabezado METS (metsHdr)

Esta sección contiene información sobre el **propio documento METS**, no sobre el objeto digital que describe.

*   **Fecha de Creación:** Se rellena automáticamente. Indica cuándo creaste este documento METS.
*   **Fecha de Última Modificación:** Se actualiza automáticamente cada vez que generas el XML METS.
*   **Estado del Registro:** Puedes indicar si el documento METS está `COMPLETO`, `INCOMPLETO`, es `NUEVO` o ha sido `ELIMINADO`.
*   **Nombre del Agente:** La persona u organización responsable de crear o gestionar este documento METS (ej. "Biblioteca Nacional de España", "Juan Pérez").
*   **Tipo de Agente:** Selecciona si el agente es un `INDIVIDUAL` (persona), una `ORGANIZACIÓN` o `OTRO`.
*   **Rol del Agente:** Define el papel del agente (ej. `CREATOR` - quien creó el objeto digital, `ARCHIVIST` - quien lo archiva, `PRESERVATION` - quien realiza las acciones de preservación, etc.).
*   **Notas del Agente:** Cualquier información adicional relevante sobre el agente.

### Sección 1: Metadatos Descriptivos (dmdSec)

Aquí describes **QUÉ es el objeto digital**. Es como la ficha bibliográfica de un libro o la descripción de una película.

#### Campos Básicos (siempre visibles)

Estos son los campos más importantes y suelen ser obligatorios (marcados con *):

*   **Título\*:** El nombre principal de tu objeto digital (ej. "Entrevista a Juan Pérez", "Manuscrito del Quijote", "Colección de Fotos del Siglo XIX").
*   **Autor/Creador\*:** La persona o entidad que creó el objeto digital.
*   **Fecha\*:** La fecha de creación o publicación del objeto digital (ej. "1936-07-18" para un documento de la Guerra Civil, "2023-03-15" para un video). Puedes usar el formato AAAA-MM-DD.
*   **Materia/Tema\*:** Palabras clave o frases que describen de qué trata el objeto digital (ej. "Historia Oral", "Botánica", "Arquitectura Mudéjar").

#### Campos Extendidos (Dublin Core completo)

annamets XML Builder soporta el estándar Dublin Core completo, que incluye 15 elementos para una descripción más rica. Para ver y usar estos campos adicionales, haz clic en **"Mostrar campos extendidos"**.

*   **Descripción:** Un texto más largo y detallado sobre el contenido del objeto digital.
*   **Editor:** Quien publicó o puso a disposición el objeto digital.
*   **Colaborador:** Otros participantes en la creación del objeto.
*   **Tipo:** La naturaleza o género del contenido (ej. `Text`, `Image`, `Sound`, `MovingImage`).
*   **Formato:** El formato físico o digital original (ej. `image/jpeg`, `application/pdf`).
*   **Identificador:** Un código único para el objeto (ej. ISBN, DOI, URL).
*   **Fuente:** De dónde proviene el objeto digital original.
*   **Idioma:** El idioma principal del contenido (código ISO 639-2, ej. `spa` para español, `eus` para euskera, `glg` para gallego, `eng` para inglés).
*   **Relación:** Si el objeto está relacionado con otro.
*   **Cobertura:** Información temporal (fechas) o geográfica (lugares).
*   **Derechos:** Información sobre los derechos de autor o de uso.

**Sugerencia:** Si has realizado un **Análisis con IA** a tus archivos, las palabras clave (`Keywords`) y entidades (`Entidades`) que la IA detecte se pueden copiar y pegar aquí automáticamente para enriquecer tu descripción.

### Sección 2: Metadatos Administrativos (amdSec)

Esta sección describe **CÓMO se gestiona el objeto digital**. Es decir, qué acciones se han tomado para su preservación y quién tiene los derechos sobre él.

*   **Titular de Derechos:** La persona o entidad que posee los derechos legales sobre el objeto digital.
*   **Resolución del Escáner:** Si el objeto es una digitalización, la resolución a la que se escaneó (ej. "600dpi" para alta calidad, "300dpi" para documentos estándar).
*   **Acciones de Preservación:** Una descripción de los procesos que se han aplicado al objeto digital para asegurar su conservación a largo plazo. Aquí puedes incluir:
    *   `Digitalización con escáner Zeutschel OS 15000, 600dpi, formato TIFF sin compresión.`
    *   `OCR aplicado con ABBYY FineReader 15.`
    *   `Conversión a PDF/A-1b para preservación.`
    *   Si utilizaste la IA: `Transcripción automática con OpenAI Whisper-large-v3. Análisis de contenido con Google Gemini-pro. Generación de subtítulos SRT/VTT para accesibilidad.`

Estos detalles se documentan como eventos PREMIS en el XML generado, lo cual es fundamental para la preservación digital.

---

## 5. Gestión de Archivos

La columna derecha de la interfaz te permite añadir, analizar y gestionar los archivos digitales que formarán parte de tu proyecto METS.

### Sección 3: Sección de Ficheros (fileSec)

Aquí es donde añades tus archivos digitales. La aplicación los analiza automáticamente y te muestra información técnica relevante.

#### Carga de Archivos

Puedes cargar archivos de varias maneras:

1.  **Arrastrar y Soltar (Drag & Drop):** Simplemente arrastra uno o varios archivos desde tu explorador de archivos y suéltalos en la zona de carga (el recuadro con el icono 📁).
2.  **Hacer Clic para Seleccionar:** Haz clic en la zona de carga y se abrirá una ventana para que selecciones archivos desde tu ordenador.
3.  **📚 Biblioteca de Archivos:** Puedes reutilizar archivos que ya hayas procesado en proyectos anteriores. Ver sección "5.3. Biblioteca de Archivos" más adelante.

**Formatos compatibles:** annamets XML Builder puede analizar una amplia gama de formatos, incluyendo:
*   **Imágenes:** JPG, PNG, TIFF, GIF, BMP, WEBP.
*   **Videos:** MP4, MOV, AVI, MKV, WebM.
*   **Audio:** MP3, WAV, AAC, OGG, FLAC.
*   **Documentos:** PDF, TXT, DOCX.

#### Análisis Automático de Archivos

Una vez que cargas un archivo, la aplicación lo analiza automáticamente y extrae metadatos técnicos importantes. Esto sucede sin que tengas que hacer nada.

**¿Qué se analiza automáticamente?**

*   **Checksums:** Se calculan dos tipos de códigos de verificación únicos (MD5 y SHA-256) para asegurar la integridad de tus archivos. Esto garantiza que no se han corrompido ni modificado.
*   **Metadatos de Imagen (para JPG, PNG, TIFF):**
    *   **Dimensiones:** Ancho y alto en píxeles.
    *   **Resolución:** Calidad de la imagen en DPI (puntos por pulgada).
    *   **EXIF completo:** Si la imagen fue tomada con una cámara digital, se extrae información como el fabricante y modelo de la cámara, fecha y hora de la captura, configuración (ISO, apertura, velocidad de obturación), distancia focal del objetivo, e incluso coordenadas GPS si están disponibles.
*   **Metadatos de Video (para MP4, MOV, AVI, etc.):**
    *   **Resolución:** 1920x1080 (Full HD), 3840x2160 (4K), etc.
    *   **Relación de Aspecto:** Por ejemplo, 16:9.
    *   **Códec de Video y Audio:** El tipo de compresión usada (ej. H.264 para video, AAC para audio).
    *   **Framerate (FPS):** Cuadros por segundo.
    *   **Bitrate:** La cantidad de datos por segundo.
    *   **Duración:** En segundos.
*   **Metadatos de Audio (para MP3, WAV, AAC, etc.):**
    *   **Códec:** El tipo de compresión usada (ej. MP3, AAC, FLAC).
    *   **Sample Rate:** La frecuencia de muestreo de audio.
    *   **Canales:** Mono o Estéreo.
    *   **Bitrate:** La cantidad de datos por segundo.
    *   **Duración:** En segundos.

**Cómo se muestran los resultados:**
Debajo de cada archivo en la lista, verás un resumen de estos metadatos técnicos. Por ejemplo:

```
foto_paisaje.jpg
  MD5: a3d4e5f6...
  SHA-256: b7c8d9e0...
  📐 6720 × 4480px • 300dpi • sRGB
  📷 Canon EOS 5D Mark IV • f/2.8 • 1/250s • ISO 400
```
```
video_tutorial.mp4
  MD5: c4d5e6f7...
  SHA-256: d8e9f0a1...
  🎬 45.3s • H.264 • 1920×1080px
```

### Análisis con Inteligencia Artificial (IA)

annamets XML Builder integra Inteligencia Artificial para ir más allá de los metadatos técnicos y extraer información del propio contenido de tus archivos de audio y video. **¡Lo mejor es que no necesitas configurar ninguna clave de API!** La aplicación utiliza nuestras propias claves de empresa, protegiéndote de complejidades y costes.

#### Cómo usar el Análisis con IA

1.  **Carga tu archivo:** Asegúrate de que has cargado un archivo de audio o video en la "Sección de Ficheros".
2.  **Haz clic en el botón '🤖 IA':** Junto a cada archivo de audio o video que no haya sido analizado por IA, verás un botón con el icono '🤖 IA'. Haz clic en él.
    *   **Importante:** Si ya has cargado el archivo y lo ves en la lista, pero luego decides analizarlo con IA, la aplicación te pedirá que vuelvas a seleccionar el archivo desde tu ordenador. Esto es un paso temporal para asegurar que siempre se procese la versión original del archivo.
3.  **Selecciona las opciones de análisis:** Se abrirá una ventana con las siguientes opciones (puedes elegir una o varias):
    *   **🎙️ Transcripción Automática:** Convierte el audio de tu archivo a texto, detectando el idioma automáticamente y marcando el tiempo de cada frase.
    *   **📝 Generar Subtítulos:** Crea archivos de subtítulos profesionales (.srt y .vtt) que se sincronizan con la transcripción. Ideales para videos o para hacer el contenido más accesible.
    *   **🧠 Análisis de Contenido:** Utiliza una IA avanzada para generar un resumen del audio o video, extraer las palabras clave (keywords) más importantes, identificar los temas principales y detectar entidades (nombres de personas, organizaciones, lugares).
    *   **☐ Detección de Escenas (Beta):** (Solo para videos) Una función en desarrollo que intentará identificar cambios de escena y segmentar el video automáticamente.
4.  **Inicia el Análisis:** Haz clic en "🚀 Analizar con IA". Verás una barra de progreso que te indicará que el análisis está en curso.
    *   **Ten paciencia:** El análisis de IA, especialmente la transcripción, puede tardar un poco (ej. 30-60 segundos por cada minuto de audio/video). No cierres la aplicación mientras se esté realizando.

#### Resultados del Análisis con IA

Una vez completado el análisis, verás una nueva caja de información debajo de tu archivo, de color morado, con todos los resultados:

```
🤖 Análisis con IA
────────────────────────────────────────
Transcripción: "En esta entrevista, el Dr. Juan Pérez
explica la importancia de la preservación digital en
archivos históricos..."

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

#### Archivos Generados por la IA y cómo descargarlos

La IA no solo te muestra los resultados en pantalla, sino que también genera archivos que puedes descargar:

*   **⬇️ Subtítulos SRT (SubRip):** Un archivo de texto estándar para subtítulos, compatible con la mayoría de reproductores de video y software de edición.
*   **⬇️ Subtítulos VTT (WebVTT):** Otro formato estándar de subtítulos, ideal para videos en páginas web y para mejorar la accesibilidad.
*   **⬇️ Análisis JSON completo:** Un archivo con todos los datos extraídos por la IA en un formato estructurado (JSON), muy útil si quieres usar estos datos con otras herramientas o programas.

Simplemente haz clic en los botones de descarga (ej. `⬇️ entrevista.srt`) para guardar estos archivos en tu ordenador.

### Biblioteca de Archivos

La "Biblioteca de Archivos" es un lugar donde annamets XML Builder guarda automáticamente todos los archivos que has procesado. Esto tiene varias ventajas:

#### ¿Qué es y para qué sirve?

*   **Almacenamiento Local:** Tus archivos (y los metadatos extraídos de ellos) se guardan directamente en tu navegador. Esto significa que están en tu ordenador, no se suben a ningún servidor de annamets.
*   **Reutilización:** Si necesitas usar el mismo archivo en varios proyectos METS, o si cierras y vuelves a abrir la aplicación, el archivo (y su análisis) estará ahí, listo para usar sin tener que volver a cargarlo ni analizarlo.
*   **Ahorro de Tiempo y Costes:** No es necesario volver a calcular los checksums ni ejecutar el análisis de IA, lo que te ahorra tiempo y (en el caso de la IA) posibles costes asociados.

#### Cómo usar la Biblioteca

1.  **Abrir la Biblioteca:** Haz clic en el botón "📚 Abrir Biblioteca de Archivos" en la parte superior de la "Sección de Ficheros".
2.  **Buscar y Filtrar:** Puedes buscar archivos por su nombre o filtrar por tipo (Video, Audio, Imagen, Documento) para encontrar rápidamente lo que necesitas.
3.  **Seleccionar y Añadir:** Haz clic en los archivos que quieras usar en tu proyecto actual y luego en "➕ Añadir Seleccionados".

#### Gestión de la Biblioteca

*   **💾 Exportar:** Puedes hacer una copia de seguridad de toda tu biblioteca de archivos como un archivo JSON.
*   **🗑️ Limpiar:** Si tu biblioteca tiene muchos archivos y va lenta, o si quieres eliminar todo, puedes usar este botón. ¡Ten cuidado, porque se borrará todo lo guardado! Es recomendable "💾 Exportar" primero la biblioteca para no perder los metadatos.

*   **✕ Eliminar:** Puedes borrar archivos individuales de la biblioteca.

**Importante:** La biblioteca usa el almacenamiento local de tu navegador. Si borras los datos de navegación o usas el modo incógnito, los archivos de la biblioteca podrían perderse.

---

## 6. Organiza la Estructura (structMap)

Una vez que has cargado tus archivos y completado los metadatos, la "Sección 4: Mapa Estructural (structMap)" te permite definir la jerarquía y el orden lógico de tu objeto digital. Es como crear un índice o tabla de contenidos para tus archivos.

### Sección 4: Mapa Estructural (structMap)

Aquí es donde organizas visualmente tus archivos en divisiones lógicas, reflejando cómo se relacionan entre sí.

#### Creación de Divisiones Jerárquicas

Puedes añadir "divisiones" que representen partes de tu objeto digital, como capítulos, páginas, secciones, actos de una obra, etc.

*   **Añadir División:** Utiliza el botón "+ Añadir División" para crear un nuevo elemento en tu estructura.
*   **Editar División:** Puedes cambiar el nombre o el tipo de cada división para que refleje mejor su contenido (ej. "Portada", "Capítulo 1", "Página 10").
*   **Mover Divisiones:** Usa los botones de flecha (↑ y ↓) para cambiar el orden de las divisiones dentro de la estructura.

#### Asociación de Archivos

Una vez que tienes tus divisiones creadas, puedes arrastrar los archivos que cargaste en la "Sección 3: Sección de Ficheros" y soltarlos dentro de la división correspondiente.

*   **Arrastrar y Soltar Archivos:** Haz clic en un archivo de la lista de la "Sección de Ficheros" (Columna Derecha) y arrástralo hasta la división donde quieras asociarlo en el "Mapa Estructural".
*   **Múltiples Archivos:** Puedes asociar varios archivos a una misma división.
*   **Eliminar de la División:** Si necesitas quitar un archivo de una división, puedes hacerlo sin eliminar el archivo de la "Sección de Ficheros".

**Ejemplo:** Si estás creando un METS para un libro, tu `structMap` podría verse así:

```
Libro
  ├─ Portada
  │  └─ archivo_portada.jpg
  ├─ Capítulo 1: Introducción
  │  ├─ archivo_capitulo1_pag1.pdf
  │  ├─ archivo_capitulo1_pag2.pdf
  └─ Capítulo 2: Desarrollo
     └─ archivo_capitulo2.pdf
```
Esta estructura se traducirá directamente en la sección `<structMap>` del XML METS final, permitiendo una navegación y comprensión lógica de tu objeto digital.

---

## 7. Generación y Exportación

Una vez que has completado la información de metadatos, cargado tus archivos y organizado la estructura, el último paso es generar tu archivo METS y exportar cualquier dato adicional que necesites.

### Generar XML METS

En la parte inferior de la interfaz, debajo de las dos columnas de trabajo, encontrarás un botón central:

*   **Botón "Generar XML METS":** Haz clic aquí para que la aplicación procese toda la información que has introducido y genere el archivo XML METS siguiendo el estándar.

#### Validación Automática

Inmediatamente después de generar el XML, annamets XML Builder realiza una **validación automática** para comprobar que el documento METS es correcto y cumple con los requisitos mínimos del estándar.

*   **Panel de Validación:** Verás un panel que te indicará el estado:
    *   **✅ XML Válido:** ¡Enhorabuena! Tu documento METS está bien formado y contiene todos los elementos obligatorios.
    *   **⚠️ XML Generado con Advertencias:** Significa que el documento es válido, pero hay algunas recomendaciones que podrías seguir para mejorarlo (ej. faltan algunos checksums o metadatos opcionales).
    *   **❌ Error:** Se ha encontrado un problema grave que impide que el documento METS sea válido (ej. falta un título obligatorio). En este caso, deberás corregir el error antes de que el documento sea totalmente válido.

*   **Mensajes de Error y Advertencia:** El panel te mostrará un listado claro de cualquier error o advertencia, indicándote qué necesitas revisar.

### Descargar XML METS

Una vez que tu XML METS sea válido (o tenga solo advertencias), verás un botón para descargarlo:

*   **Botón "Descargar XML":** Haz clic aquí para guardar el archivo `.xml` en tu ordenador. Este es el archivo METS final que podrás usar en tu repositorio digital.

### Exportar Metadatos

Además del archivo METS, puedes exportar todos los metadatos técnicos y de IA que la aplicación ha extraído de tus archivos en otros formatos útiles:

*   **Dónde Exportar:** En la "Sección 3: Sección de Ficheros", en la parte superior de la lista de archivos, encontrarás tres botones: **📄 CSV**, **📊 Excel** y **🔧 JSON**.

#### 📄 CSV (Valores Separados por Comas)

*   **¿Para qué sirve?** Es un formato de texto plano muy ligero, ideal para importar datos en hojas de cálculo (Excel, Google Sheets) o bases de datos y realizar análisis sencillos.
*   **Contenido:** Incluye los metadatos básicos de cada archivo, los checksums, metadatos técnicos y los metadatos de IA (transcripciones, resúmenes, palabras clave).

#### 📊 Excel (.xlsx)

*   **¿Para qué sirve?** Genera un archivo de Excel con un formato más amigable, ideal para crear informes, visualizaciones o compartir con colegas que no son técnicos.
*   **Contenido:** Similar al CSV, pero con un formato visual más pulido.

#### 🔧 JSON (JavaScript Object Notation)

*   **¿Para qué sirve?** Es un formato estructurado, ideal para desarrolladores o para integrar los datos con otras aplicaciones y sistemas. Incluye todos los metadatos extraídos sin truncar, incluyendo los detalles completos de los análisis de IA.
*   **Contenido:** Un objeto con toda la información técnica, de IA y de los archivos.

**Caso de Uso:** Si tienes una colección de 100 entrevistas procesadas con IA, puedes exportar un Excel o JSON para:
*   Analizar qué idiomas predominan.
*   Identificar las palabras clave más frecuentes en toda la colección.
*   Ver las entidades (personas, lugares) más mencionadas.
*   Realizar análisis estadísticos y crear informes.

---

## 8. Gestión del Proyecto

annamets XML Builder incluye funcionalidades para gestionar tus proyectos, asegurando que tu trabajo se guarda de forma segura y que puedes continuar desde donde lo dejaste.

### Auto-guardado

*   **¿Cómo funciona?:** La aplicación guarda automáticamente cada cambio que realizas en tu proyecto (cada pocos segundos). Este guardado se realiza en el **almacenamiento local de tu navegador**, lo que significa que tu progreso está seguro incluso si cierras accidentalmente la pestaña o el navegador.
*   **Restauración automática:** Cuando vuelves a abrir annamets XML Builder, tu último proyecto se carga automáticamente, permitiéndote continuar justo donde lo dejaste.
*   **Indicador:** Verás un mensaje de "Auto-guardado" en la parte superior de la interfaz para confirmarte que tu trabajo está seguro.

### Guardar Proyecto Manualmente

Aunque el auto-guardado es muy útil, siempre es recomendable guardar tu proyecto de forma manual para tener una copia de seguridad o para compartirlo.

*   **Botón "💾 Guardar Proyecto":** En la parte superior de la interfaz, en la zona de controles del proyecto, haz clic en este botón.
*   **Archivo JSON:** Se descargará un archivo `.json` a tu ordenador. Este archivo contiene todos los metadatos y la estructura de tu proyecto.
*   **Importante:** Este archivo JSON **NO incluye los archivos multimedia originales**, solo sus metadatos y referencias. Si compartes el proyecto, asegúrate de que la otra persona tenga acceso a los archivos originales.

### Cargar Proyecto

Si tienes un archivo de proyecto `.json` guardado previamente, puedes cargarlo en la aplicación:

*   **Botón "📂 Cargar Proyecto":** Haz clic en este botón (también en la zona de controles del proyecto) y selecciona el archivo `.json` desde tu ordenador.
*   **Restauración completa:** Se restaurará todo el estado del proyecto, incluyendo metadatos, archivos y estructura.

### Nuevo Proyecto

Para empezar un proyecto completamente nuevo:

*   **Botón "🎨 Nueva Plantilla":** Haz clic en este botón.
*   **Confirmación:** La aplicación te pedirá confirmación, ya que al iniciar un nuevo proyecto se borrará el trabajo actual (si no lo has guardado manualmente).
*   **Selección de Plantilla:** Tras confirmar, se abrirá el selector de plantillas para que elijas cómo quieres empezar tu nuevo proyecto.

---

## 9. Preguntas Frecuentes y Solución de Problemas

Aquí encontrarás respuestas a las preguntas más comunes y soluciones a posibles problemas que puedan surgir.

### Preguntas Generales

**¿Es annamets XML Builder gratis?**
Sí, la aplicación es completamente gratuita y de código abierto (open source).

**¿Necesito instalar algo en mi ordenador para usarlo?**
No, si la usas online, funciona directamente desde tu navegador web. No necesitas instalar ningún programa adicional.

**¿Funciona la aplicación sin conexión a internet?**
La interfaz básica y las funcionalidades de edición sí funcionan sin conexión. Sin embargo, el **Análisis con IA** (transcripción, resúmenes, etc.) requiere una conexión activa a internet para comunicarse con los servicios de Inteligencia Artificial.

**¿En qué navegadores funciona mejor?**
annamets XML Builder está optimizado para las últimas versiones de navegadores modernos como Google Chrome, Mozilla Firefox, Microsoft Edge y Apple Safari.

### Preguntas sobre el Análisis con IA

**¿Tiene algún coste usar la Inteligencia Artificial?**
La aplicación utiliza tus propias claves de API de la empresa. Los costes de uso de estas APIs dependen de los proveedores (OpenAI y Google) y del volumen de análisis que realices. Normalmente, son costes muy bajos (ej. unos pocos céntimos por minuto de audio/video analizado).

**¿Mis archivos son privados cuando uso la IA?**
Cuando utilizas el Análisis con IA, tus archivos se envían a los servicios de OpenAI y Google para su procesamiento. Es importante que revises las políticas de privacidad y condiciones de servicio de OpenAI y Google. **Para datos extremadamente sensibles, considera no usar la función de IA.**

**¿Puedo usar la aplicación sin la Inteligencia Artificial?**
Sí, todas las funcionalidades básicas de creación de METS, gestión de metadatos, carga de archivos y organización estructural funcionan perfectamente sin necesidad de usar la IA. El Análisis con IA es una funcionalidad adicional.

**¿Qué idiomas soporta la transcripción de audio/video?**
El servicio de transcripción Whisper (de OpenAI) soporta más de 99 idiomas, incluyendo español, inglés, francés, alemán, italiano, portugués y muchos otros, detectándolos automáticamente.

**¿La transcripción es 100% precisa?**
La precisión de la transcripción de IA es muy alta (normalmente entre el 85% y el 95%), pero puede variar según la calidad del audio (ruido de fondo, acentos, claridad de la voz). Siempre es recomendable revisar y corregir manualmente las transcripciones generadas.

### Problemas Comunes y Soluciones

#### Problemas con Archivos

**No se carga mi archivo:**
*   **Verifica el formato:** Asegúrate de que el formato de tu archivo esté entre los compatibles (JPG, PNG, MP4, MP3, PDF, etc.).
*   **Tamaño del archivo:** Archivos muy grandes (varios GB) pueden tardar en cargarse o dar problemas.
*   **Conexión a internet:** Si estás intentando usar la IA, la conexión es necesaria.

**No veo metadatos EXIF en mis fotos:**
*   **Origen de la foto:** Las capturas de pantalla o fotos descargadas de internet suelen no tener metadatos EXIF.
*   **Usa fotos originales:** Para ver metadatos EXIF, utiliza fotos tomadas directamente con tu cámara digital o smartphone.
*   **Redes sociales:** Ten en cuenta que algunas redes sociales eliminan los metadatos EXIF al subir fotos.

**Los Checksums no se calculan:**
*   **Tiempo de procesamiento:** Para archivos grandes, el cálculo de checksums puede tardar unos segundos o minutos. Espera a que la barra de progreso termine.
*   **Interrupción:** Asegúrate de que la carga o el análisis no se interrumpió.

#### Problemas con el Análisis de IA

**"Error: OpenAI API key not configured" o "Error: Gemini API key not configured":**
*   **Configuración del Servidor (Backend):** Este error indica que las claves de API de OpenAI o Google Gemini no están configuradas correctamente en el servidor donde la aplicación está desplegada (ej. Vercel).
*   **Solución:** Debes asegurarte de que las variables de entorno `OPENAI_API_KEY` y `GEMINI_API_KEY` estén definidas y contengan claves válidas en el panel de configuración de tu servidor. Consulta la sección de "Acción requerida" que se te proporcionó cuando se hicieron los cambios en la aplicación.
*   **Validez de la clave:** Si las variables están configuradas, verifica que las claves en sí sean válidas (ej. la de OpenAI empieza con `sk-`, la de Gemini con `AIza-`).

**"Whisper API error: insufficient_quota":**
*   **Créditos de OpenAI:** Tu cuenta de OpenAI puede haberse quedado sin créditos o no tiene un método de pago configurado. Visita https://platform.openai.com/account/billing para añadir fondos o un método de pago.

**El análisis es muy lento:**
*   **Tiempo estimado:** El análisis de IA consume recursos. La transcripción de audio/video puede tardar entre 30 y 60 segundos por cada minuto de contenido. Un video de 10 minutos puede llevar 5-10 minutos de procesamiento. Es normal.
*   **No cierres la ventana:** Evita cerrar la ventana del navegador durante el proceso.

**La transcripción está en un idioma incorrecto:**
*   **Detección automática:** Whisper detecta el idioma automáticamente. Si hay mucha música, ruido de fondo o múltiples idiomas mezclados, la detección puede fallar.
*   **Calidad del audio:** Un audio más limpio y claro mejora la detección y precisión.

#### Problemas con la Biblioteca de Archivos

**No veo mis archivos en la biblioteca:**
*   **¿Cargaste archivos?:** La biblioteca solo guarda archivos que hayas procesado previamente.
*   **LocalStorage:** La biblioteca utiliza el almacenamiento local de tu navegador. Si lo tienes deshabilitado o usas el modo incógnito, los archivos no se guardarán permanentemente.

**La biblioteca está llena o lenta:**
*   **Límite de almacenamiento:** El almacenamiento local del navegador tiene un límite (normalmente entre 5 y 10 MB). Si tienes muchos archivos o archivos con metadatos muy extensos, la biblioteca puede llenarse.
*   **Limpia archivos antiguos:** Usa el botón "🗑️ Limpiar" para vaciar la biblioteca. Es recomendable "💾 Exportar" primero la biblioteca para no perder los metadatos.

#### Problemas con Exportación

**El archivo Excel no se descarga:**
*   **Archivos cargados:** Asegúrate de que tienes archivos cargados en la "Sección de Ficheros".
*   **Bloqueador de ventanas emergentes:** Algunos navegadores pueden bloquear la descarga. Revisa la configuración de tu navegador.

**El archivo JSON generado es muy grande:**
*   **Contenido extenso:** Si tienes muchos archivos o tus análisis de IA son muy detallados, el JSON puede ser muy grande (varias decenas de MB). Esto es normal ya que incluye toda la información.

#### Problemas con Proyectos

**"Error al cargar el proyecto. Archivo inválido.":**
*   **Formato del archivo:** Asegúrate de que el archivo que intentas cargar sea un `.json` válido que fue generado previamente por annamets XML Builder.

**Se perdieron mis cambios no guardados:**
*   **Auto-guardado:** El auto-guardado funciona bien, pero si borras los datos de navegación o usas un navegador diferente, el proyecto auto-guardado no estará disponible.
*   **Guarda manualmente:** Para evitar pérdidas, usa siempre el botón "💾 Guardar Proyecto" para descargar una copia de tu trabajo.

---

**Asistente Virtual Laia:**
Si sigues teniendo dudas, haz clic en el icono de chat 💬 en la esquina inferior derecha para hablar con **Laia**, tu asistente virtual de annamets XML Builder. Ella puede ayudarte con preguntas específicas sobre la aplicación.