# 📖 GUÍA COMPLETA DE USUARIO - METS XML BUILDER

## 📑 ÍNDICE

1. [¿Qué es esta aplicación?](#qué-es-esta-aplicación)
2. [¿Qué es METS y para qué sirve?](#qué-es-mets-y-para-qué-sirve)
3. [¿Quién debe usar esta aplicación?](#quién-debe-usar-esta-aplicación)
4. [Paso 1: Metadatos Descriptivos (dmdSec)](#paso-1-metadatos-descriptivos-dmdsec)
5. [Paso 2: Metadatos Administrativos (amdSec)](#paso-2-metadatos-administrativos-amdsec)
6. [Paso 3: Sección de Ficheros (fileSec)](#paso-3-sección-de-ficheros-filesec)
7. [Paso 4: Mapa Estructural (structMap)](#paso-4-mapa-estructural-structmap)
8. [Paso 5: Generar y Descargar el XML](#paso-5-generar-y-descargar-el-xml)
9. [Cómo entregar al cliente](#cómo-entregar-al-cliente)
10. [Casos de uso prácticos](#casos-de-uso-prácticos)
11. [Preguntas frecuentes](#preguntas-frecuentes)
12. [Solución de problemas](#solución-de-problemas)

---

## ¿Qué es esta aplicación?

**METS XML Builder** es una herramienta web que permite crear documentos XML METS de forma visual e intuitiva, sin necesidad de escribir código XML manualmente.

### ¿Qué problema resuelve?

En lugar de escribir esto manualmente:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<mets:mets xmlns:mets="http://www.loc.gov/METS/" ...>
  <mets:dmdSec ID="dmd_0">
    <mets:mdWrap MDTYPE="DC">
      <mets:xmlData>
        <dc:title>El Quijote</dc:title>
        ...
```

La aplicación te permite rellenar formularios sencillos y genera automáticamente el XML completo y válido.

---

## ¿Qué es METS y para qué sirve?

**METS** = Metadata Encoding & Transmission Standard (Estándar de Codificación y Transmisión de Metadatos)

### ¿Para qué se usa METS?

METS es un **estándar internacional** creado por la Biblioteca del Congreso de EE.UU. para:

1. **Describir objetos digitales complejos** (libros escaneados, manuscritos, documentos históricos)
2. **Preservar patrimonio digital** a largo plazo
3. **Intercambiar información** entre bibliotecas y archivos digitales
4. **Estructurar colecciones** de archivos digitales

### Componentes de un documento METS

Un documento METS contiene 4 secciones principales:

| Sección | Qué describe | Ejemplo |
|---------|--------------|---------|
| **dmdSec** (Descriptive Metadata) | **QUÉ ES** el objeto | "El Quijote, por Cervantes, 1605" |
| **amdSec** (Administrative Metadata) | **CÓMO SE GESTIONA** | "Escaneado a 600dpi, Derechos: BNE" |
| **fileSec** (File Section) | **QUÉ ARCHIVOS CONTIENE** | "portada.jpg, pagina1.jpg, pagina2.jpg" |
| **structMap** (Structural Map) | **CÓMO SE ORGANIZAN** | "Portada → Capítulo 1 → Capítulo 2" |

---

## ¿Quién debe usar esta aplicación?

Esta herramienta es ideal para:

- ✅ **Bibliotecarios digitales** que digitalizan colecciones
- ✅ **Archiveros** que preservan documentos históricos
- ✅ **Gestores de patrimonio cultural** que crean repositorios digitales
- ✅ **Estudiantes** aprendiendo sobre metadatos digitales
- ✅ **Desarrolladores** que necesitan generar METS para sistemas de gestión documental

---

## PASO 1: Metadatos Descriptivos (dmdSec)

### ¿Qué son los metadatos descriptivos?

Son los datos que **describen QUÉ ES** tu objeto digital. Es como la ficha bibliográfica de un libro.

### Campos del formulario

#### 📌 **Título del Objeto Digital** (OBLIGATORIO)

**¿Qué es?** El nombre principal del documento u objeto que estás digitalizando.

**Cuándo usar:**
- Nombre del libro: "Don Quijote de la Mancha"
- Título de un manuscrito: "Carta de Cristóbal Colón a los Reyes Católicos"
- Nombre de una colección: "Fotografías de la Guerra Civil Española"

**Ejemplos:**
```
✅ El Quijote
✅ Constitución Española de 1978
✅ Actas del Consejo Municipal de Madrid 1850-1900
✅ Colección de Grabados del Museo del Prado
❌ archivo.pdf (demasiado genérico)
❌ documento1 (no descriptivo)
```

#### 📌 **Autor/Creador** (OBLIGATORIO)

**¿Qué es?** La persona u organización que creó el contenido original.

**Cuándo usar:**
- Autor de un libro: "Miguel de Cervantes Saavedra"
- Fotógrafo: "Robert Capa"
- Institución: "Real Academia Española"
- Desconocido: "Anónimo" o "Autor desconocido"

**Ejemplos:**
```
✅ Miguel de Cervantes
✅ Biblioteca Nacional de España
✅ Anónimo
✅ Ministerio de Cultura
❌ (dejar en blanco)
```

#### 📌 **Fecha de Creación/Publicación** (OBLIGATORIO)

**¿Qué es?** Cuándo se creó o publicó el documento original.

**Formato:** El navegador mostrará un selector de fecha. Selecciona la fecha más precisa que conozcas.

**Ejemplos:**
```
✅ 1605-01-16 (si conoces la fecha exacta)
✅ 1605-01-01 (si solo conoces el año)
✅ 1978-12-27 (Constitución Española)
```

**Nota:** Si no conoces la fecha exacta, usa el 1 de enero del año aproximado.

#### 📌 **Asunto/Tema** (OPCIONAL)

**¿Qué es?** De qué trata el documento. Palabras clave o categorías temáticas.

**Cuándo usar:**
- Género literario
- Tema principal
- Clasificación temática

**Ejemplos:**
```
✅ Novela clásica española
✅ Literatura del Siglo de Oro
✅ Fotografía documental - Guerra Civil
✅ Derecho constitucional
✅ Cartografía histórica - América Latina
```

#### 📌 **Estándar de Metadatos** (OBLIGATORIO)

**¿Qué es?** El formato en que se guardarán los metadatos en el XML.

**Opciones disponibles:**

| Estándar | Cuándo usar | Nivel de detalle |
|----------|-------------|------------------|
| **Dublin Core (DC)** | Proyectos sencillos, descripciones básicas | Básico (15 campos estándar) |
| **MODS** | Proyectos profesionales, bibliotecas | Avanzado (mucha flexibilidad) |

**Recomendación:**
- 🟢 **Usa Dublin Core** si estás empezando o tienes un proyecto simple
- 🟢 **Usa MODS** si trabajas en una institución profesional o necesitas más detalle

**Ejemplo de diferencia:**

**Dublin Core:** Simple y directo
```xml
<dc:title>El Quijote</dc:title>
<dc:creator>Miguel de Cervantes</dc:creator>
```

**MODS:** Más estructurado y profesional
```xml
<mods:titleInfo>
  <mods:title>El Quijote</mods:title>
</mods:titleInfo>
<mods:name type="personal">
  <mods:namePart>Miguel de Cervantes</mods:namePart>
  <mods:role>
    <mods:roleTerm>author</mods:roleTerm>
  </mods:role>
</mods:name>
```

### ✅ Checklist Sección 1

Antes de continuar, verifica:
- [ ] Has introducido un título descriptivo
- [ ] Has indicado el autor (o "Anónimo")
- [ ] Has seleccionado una fecha
- [ ] Has elegido un estándar de metadatos

---

## PASO 2: Metadatos Administrativos (amdSec)

### ¿Qué son los metadatos administrativos?

Son los datos sobre **CÓMO SE GESTIONA** el objeto digital: quién tiene los derechos, cómo se digitalizó, qué acciones de preservación se han realizado.

### Campos del formulario

#### 📌 **Titular de los Derechos** (OBLIGATORIO)

**¿Qué es?** Quién posee los derechos de autor o custodia del objeto original.

**Cuándo usar:**
- Institución que custodia el original
- Propietario de los derechos de autor
- Organización responsable

**Ejemplos:**
```
✅ Biblioteca Nacional de España
✅ Archivo Histórico Provincial de Madrid
✅ Museo del Prado
✅ Universidad Complutense de Madrid
✅ Dominio Público
✅ Creative Commons BY-SA 4.0
```

**Importante:** Este campo es crítico para cuestiones legales. Si no estás seguro, indica la institución que custodia el documento.

#### 📌 **Resolución de Escáner** (OPCIONAL)

**¿Qué es?** La calidad técnica con la que se digitalizó el documento.

**Formato típico:** `XXXdpi` (dots per inch = puntos por pulgada)

**Cuándo usar:**

| Resolución | Tipo de contenido | Calidad |
|------------|-------------------|---------|
| **300dpi** | Documentos de texto simples | Básica |
| **400dpi** | Documentos con imágenes | Media |
| **600dpi** | Libros antiguos, manuscritos | Alta |
| **1200dpi** | Documentos históricos valiosos | Muy alta |

**Ejemplos:**
```
✅ 600dpi
✅ 300dpi color
✅ 1200dpi escala de grises
❌ buena calidad (no técnico)
❌ alta (muy vago)
```

**Nota:** Si no sabes la resolución exacta, puedes dejar este campo vacío.

#### 📌 **Acciones de Preservación Digital** (OPCIONAL)

**¿Qué es?** Qué procesos técnicos se aplicaron al digitalizar o preservar el documento.

**Cuándo usar:**
- Conversiones de formato
- Procesos de mejora de imagen
- Tecnologías aplicadas
- Acciones de conservación digital

**Ejemplos comunes:**
```
✅ Conversión a JPEG2000
✅ OCR con Tesseract 4.0
✅ Restauración digital con Adobe Photoshop
✅ Conversión a PDF/A para preservación
✅ Migración de formato TIFF a JPEG2000
✅ Limpieza de manchas y restauración de color
```

**Glosario rápido:**
- **OCR** = Optical Character Recognition (convertir imagen a texto)
- **JPEG2000** = Formato de imagen de alta calidad para preservación
- **PDF/A** = Formato PDF específico para archivo a largo plazo
- **TIFF** = Formato sin pérdida de calidad

#### 📌 **Estándar de Preservación** (OBLIGATORIO)

**¿Qué es?** El formato en que se guardarán estos metadatos administrativos.

**Opción disponible:** PREMIS (único estándar soportado actualmente)

**PREMIS** = Preservation Metadata Implementation Strategies

Es el estándar internacional más usado para metadatos de preservación digital.

**No necesitas cambiarlo** - déjalo en PREMIS.

### ✅ Checklist Sección 2

Antes de continuar:
- [ ] Has indicado quién posee los derechos
- [ ] Has rellenado los campos técnicos que conoces
- [ ] El estándar está en PREMIS

---

## PASO 3: Sección de Ficheros (fileSec)

### ¿Qué es la sección de ficheros?

Es el **inventario completo de todos los archivos** que forman parte de tu objeto digital.

Si estás digitalizando un libro de 100 páginas, aquí añadirás los 100 archivos de imagen (uno por página).

### Cómo añadir archivos

1. **Haz clic en el botón "Seleccionar archivos"** o "Choose Files"
2. **Selecciona uno o varios archivos** de tu ordenador
   - Puedes seleccionar múltiples archivos manteniendo `Ctrl` (Windows) o `Cmd` (Mac)
3. **Los archivos aparecerán listados** con su nombre y tamaño

### Información capturada automáticamente

Por cada archivo, la aplicación captura:

| Dato | Ejemplo | Qué es |
|------|---------|--------|
| **Nombre** | `portada.jpg` | Nombre original del archivo |
| **Tamaño** | `2.4 MB` | Peso del archivo en kilobytes/megabytes |
| **Tipo MIME** | `image/jpeg` | Tipo de archivo técnico |
| **ID único** | `file_1699123456_0` | Identificador generado automáticamente |

### Tipos de archivos soportados

La aplicación acepta **cualquier tipo de archivo**, pero los más comunes son:

#### 📄 Imágenes
```
✅ .jpg / .jpeg   - Fotografías, páginas escaneadas
✅ .png           - Imágenes con transparencia
✅ .tiff / .tif   - Imágenes de alta calidad sin compresión
✅ .jp2           - JPEG2000 (preservación)
```

#### 📄 Documentos
```
✅ .pdf           - Documentos PDF
✅ .txt           - Texto plano
✅ .xml           - Datos estructurados
```

#### 📄 Audio/Video
```
✅ .mp3           - Audio
✅ .wav           - Audio sin compresión
✅ .mp4           - Video
```

### ⚠️ IMPORTANTE: Limitación actual

**La aplicación NO sube los archivos a ningún servidor.**

Solo captura la **información de los archivos** (nombre, tamaño, tipo). Los archivos permanecen en tu ordenador.

Esto significa que el XML generado contendrá:
```xml
<mets:file ID="file_123" MIMETYPE="image/jpeg" SIZE="2457600">
  <mets:FLocat LOCTYPE="OTHER" xlink:href="portada.jpg"/>
</mets:file>
```

**Para uso en producción**, necesitarías:
1. Subir los archivos a un servidor
2. Reemplazar `portada.jpg` con la URL completa: `https://tu-servidor.com/archivos/portada.jpg`

### Cómo eliminar archivos

Si añadiste un archivo por error:

1. Localiza el archivo en la lista
2. Haz clic en el botón rojo **"Eliminar"**
3. El archivo desaparecerá de la lista

**Nota:** Eliminar un archivo también lo eliminará de las asociaciones en el Mapa Estructural (Paso 4).

### Ejemplo práctico: Digitalizar un libro

Imagina que digitalizas un libro de 50 páginas:

**Archivos que añadirías:**
```
portada.jpg          (1.2 MB)
contraportada.jpg    (1.1 MB)
pagina_001.jpg       (2.4 MB)
pagina_002.jpg       (2.3 MB)
pagina_003.jpg       (2.5 MB)
...
pagina_050.jpg       (2.4 MB)
```

**Total:** 52 archivos

### ✅ Checklist Sección 3

Antes de continuar:
- [ ] Has añadido todos los archivos del objeto digital
- [ ] Los nombres de archivo son descriptivos
- [ ] Has verificado que no hay archivos duplicados
- [ ] Has eliminado archivos erróneos si los había

---

## PASO 4: Mapa Estructural (structMap)

### ¿Qué es el mapa estructural?

Es la **jerarquía y organización** de tus archivos. Define cómo se relacionan entre sí.

**Analogía:** Es como el **índice de un libro**, pero vinculando cada sección a sus archivos concretos.

### Conceptos clave

#### División Estructural

Una **división** es una parte lógica de tu objeto digital:
- Portada
- Capítulo 1
- Capítulo 2
- Índice
- Apéndice
- Página 1, Página 2, etc.

Cada división se asocia a uno o más archivos.

### Cómo añadir una división estructural

#### Paso 4.1: Escribir la etiqueta

En el campo **"Etiqueta de la División"**, escribe un nombre descriptivo:

**Ejemplos:**
```
✅ Portada
✅ Capítulo 1: El ingenioso hidalgo
✅ Página 1
✅ Lámina ilustrada - Figura 3
✅ Índice alfabético
✅ Contraportada
```

#### Paso 4.2: Asociar archivos

En el campo **"Asociar Archivos"**:

1. Mantén presionado `Ctrl` (Windows) o `Cmd` (Mac)
2. Haz clic en todos los archivos que pertenecen a esta división
3. Los archivos seleccionados se resaltarán

**Ejemplo 1: Portada simple**
- Etiqueta: `Portada`
- Archivos asociados: `portada.jpg`

**Ejemplo 2: Capítulo con múltiples páginas**
- Etiqueta: `Capítulo 1`
- Archivos asociados: `pagina_001.jpg`, `pagina_002.jpg`, `pagina_003.jpg`

#### Paso 4.3: Añadir la división

Haz clic en el botón azul **"Añadir División"**.

La división aparecerá en la lista de **"Divisiones Estructurales Definidas"**.

### Gestionar divisiones

Una vez añadidas, puedes:

#### ⬆️ Mover hacia arriba
Cambia el orden de las divisiones. La primera división aparecerá primero en el XML.

#### ⬇️ Mover hacia abajo
Mueve la división más abajo en el orden.

#### 🗑️ Eliminar
Borra la división completamente (los archivos NO se eliminan, solo la asociación).

### Orden de las divisiones

**El orden es importante** - debe reflejar la secuencia lógica del documento:

```
✅ CORRECTO:
1. Portada
2. Índice
3. Capítulo 1
4. Capítulo 2
5. Contraportada

❌ INCORRECTO:
1. Capítulo 2
2. Portada
3. Contraportada
4. Capítulo 1
5. Índice
```

Usa los botones ⬆️ ⬇️ para reordenar.

### Casos de uso prácticos

#### Caso 1: Libro simple (una página = un archivo)

```
División: "Portada"           → portada.jpg
División: "Página 1"          → pagina_001.jpg
División: "Página 2"          → pagina_002.jpg
División: "Página 3"          → pagina_003.jpg
División: "Contraportada"     → contraportada.jpg
```

#### Caso 2: Libro con capítulos

```
División: "Portada"                    → portada.jpg
División: "Capítulo 1: Introducción"   → pag_001.jpg, pag_002.jpg, pag_003.jpg
División: "Capítulo 2: Desarrollo"     → pag_004.jpg, pag_005.jpg, pag_006.jpg
División: "Capítulo 3: Conclusión"     → pag_007.jpg, pag_008.jpg
División: "Bibliografía"               → pag_009.jpg
```

#### Caso 3: Manuscrito con ilustraciones

```
División: "Página 1 - Texto"           → pagina_1_texto.jpg
División: "Lámina 1 - Ilustración"     → lamina_1.jpg
División: "Página 2 - Texto"           → pagina_2_texto.jpg
División: "Lámina 2 - Mapa"            → mapa_1.jpg
```

#### Caso 4: Colección fotográfica

```
División: "Fotografía 1 - Plaza Mayor"        → foto_001_master.tif, foto_001_preview.jpg
División: "Fotografía 2 - Catedral"           → foto_002_master.tif, foto_002_preview.jpg
División: "Fotografía 3 - Ayuntamiento"       → foto_003_master.tif, foto_003_preview.jpg
```

### ⚠️ Mensajes de error comunes

#### "Añade archivos en la sección de Ficheros para asociarlos"
**Causa:** No has añadido archivos en el Paso 3.
**Solución:** Vuelve al Paso 3 y añade archivos primero.

#### Botón "Añadir División" deshabilitado
**Causa:** Falta la etiqueta o no has seleccionado archivos.
**Solución:** Completa ambos campos.

### ✅ Checklist Sección 4

Antes de continuar:
- [ ] Has creado divisiones para todas las partes importantes
- [ ] Cada división tiene una etiqueta descriptiva
- [ ] Cada división tiene archivos asociados
- [ ] El orden de las divisiones es correcto
- [ ] Has usado los botones ⬆️⬇️ para ordenar si era necesario

---

## PASO 5: Generar y Descargar el XML

### Validación previa

Antes de generar, la aplicación verifica:

✅ **Requisito 1:** Que hayas completado el título en Metadatos Descriptivos
✅ **Requisito 2:** Que hayas añadido al menos un archivo en Sección de Ficheros

Si falta algo, verás un mensaje de error en rojo:
```
Error: Por favor, completa la sección de Metadatos Descriptivos.
```
o
```
Error: Por favor, añade al menos un archivo en la Sección de Ficheros.
```

### Generar el XML

1. **Revisa todos los datos** - una vez generado, tendrás que volver a completar el formulario para cambios
2. **Haz clic en el botón azul "Generar XML METS"**
3. **Espera unos segundos** (el botón dirá "Generando...")
4. **El XML aparecerá en la sección "Resultado"**

### Visualizar el XML generado

El XML se mostrará en un cuadro de texto con el código completo:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<mets:mets xmlns:mets="http://www.loc.gov/METS/"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           ...>
  <mets:dmdSec ID="dmd_0">
    ...
  </mets:dmdSec>
  ...
</mets:mets>
```

Puedes:
- **Ver el código** directamente en el cuadro de texto
- **Copiarlo** manualmente si lo necesitas
- **Descargarlo** como archivo

### Descargar el archivo XML

1. **Haz clic en el botón "Descargar XML"**
2. El navegador descargará automáticamente un archivo llamado:
   ```
   mets_document.xml
   ```
3. El archivo se guardará en tu carpeta de descargas

### ¿Qué contiene el XML?

El archivo XML generado contiene:

1. **Declaración XML** con encoding UTF-8
2. **Namespaces** (espacios de nombres) de los estándares:
   - METS
   - XLink
   - Dublin Core (si elegiste DC)
   - MODS (si elegiste MODS)
   - PREMIS
3. **Sección dmdSec** con tus metadatos descriptivos
4. **Sección amdSec** con metadatos administrativos (técnicos, derechos, preservación)
5. **Sección fileSec** con el inventario de archivos
6. **Sección structMap** con la estructura jerárquica

### Validar el XML

Para verificar que el XML es válido:

**Opción 1: Editor XML**
1. Abre el archivo con un editor XML (Oxygen XML, XMLSpy, etc.)
2. El editor validará automáticamente contra los schemas

**Opción 2: Validador online**
1. Ve a https://www.xmlvalidation.com/
2. Pega el contenido del XML
3. Selecciona "Validate against XSD"
4. Usa el schema de METS: http://www.loc.gov/standards/mets/mets.xsd

**Opción 3: Navegador**
1. Abre el archivo `mets_document.xml` con Chrome, Firefox o Edge
2. Si el XML está bien formado, verás una estructura coloreada con sangría
3. Si hay errores, verás un mensaje de error

---

## CÓMO ENTREGAR AL CLIENTE

### 📦 Paquete de entrega estándar

Cuando completes un proyecto METS para un cliente, entrega:

#### 1. **El archivo XML METS** (`mets_document.xml`)
   - Renombra con un nombre descriptivo: `quijote_mets.xml`

#### 2. **Carpeta con los archivos originales**
   ```
   proyecto_quijote/
   ├── quijote_mets.xml
   └── archivos/
       ├── portada.jpg
       ├── pagina_001.jpg
       ├── pagina_002.jpg
       └── ...
   ```

#### 3. **Documento de metadatos (opcional pero recomendado)**

   Crea un PDF o Word con:
   - Título del proyecto
   - Fecha de entrega
   - Descripción del contenido
   - Estándares utilizados (Dublin Core o MODS, PREMIS)
   - Total de archivos
   - Tamaño total
   - Notas especiales

#### 4. **Informe técnico (para proyectos profesionales)**

   Incluye:
   - Resolución de digitalización utilizada
   - Software usado
   - Formato de archivos
   - Acciones de preservación aplicadas
   - Derechos de autor y licencias

### 📧 Email de entrega ejemplo

```
Asunto: Entrega proyecto METS - [Nombre del proyecto]

Estimado/a [Nombre del cliente],

Adjunto el paquete completo del proyecto de digitalización
y catalogación METS para [Nombre del objeto digital].

El paquete contiene:
- 1 archivo XML METS (nombre_mets.xml)
- 52 archivos de imagen en formato JPEG
- Documento de metadatos descriptivos

Especificaciones técnicas:
- Estándar de metadatos: Dublin Core
- Estándar de preservación: PREMIS
- Resolución de escáner: 600dpi
- Formato de archivos: JPEG, calidad 95%
- Tamaño total: 127 MB

El archivo XML es compatible con repositorios digitales que
soporten el estándar METS 1.x.

Quedo a su disposición para cualquier aclaración.

Saludos cordiales,
[Tu nombre]
```

### 💾 Formatos de entrega

Según el tamaño del proyecto:

#### Pequeño (< 100 MB)
- **Email** con archivos adjuntos
- **WeTransfer** (gratis hasta 2GB)
- **Google Drive / Dropbox** compartido

#### Mediano (100 MB - 5 GB)
- **WeTransfer**
- **Google Drive / Dropbox / OneDrive**
- **USB** entregado en mano

#### Grande (> 5 GB)
- **Disco duro externo**
- **Subida a servidor FTP del cliente**
- **Almacenamiento cloud empresarial**

### 📋 Checklist de entrega

Antes de enviar al cliente:

- [ ] El XML se valida correctamente
- [ ] Los nombres de archivo en el XML coinciden con los archivos reales
- [ ] Todos los archivos referenciados existen
- [ ] Los archivos están organizados en carpetas lógicas
- [ ] Has incluido documentación
- [ ] Has probado abrir el XML en un editor
- [ ] El nombre del archivo XML es descriptivo
- [ ] Has hecho una copia de seguridad

---

## CASOS DE USO PRÁCTICOS

### Caso 1: Digitalización de un libro antiguo (50 páginas)

**Contexto:** Una biblioteca digitaliza un libro del siglo XVIII.

#### Paso 1: Metadatos Descriptivos
```
Título: Tratado de Navegación Marítima
Autor: Juan de la Cosa
Fecha: 1500-01-01
Asunto: Cartografía náutica - Historia de la navegación
Estándar: MODS
```

#### Paso 2: Metadatos Administrativos
```
Titular de Derechos: Biblioteca Nacional de España
Resolución de Escáner: 600dpi
Acciones de Preservación: Conversión a JPEG2000, OCR con ABBYY FineReader
Estándar: PREMIS
```

#### Paso 3: Sección de Ficheros
```
Añadir archivos:
- portada.jp2
- pagina_001.jp2
- pagina_002.jp2
- ...
- pagina_050.jp2
- contraportada.jp2
(Total: 52 archivos)
```

#### Paso 4: Mapa Estructural
```
División: "Portada"                    → portada.jp2
División: "Dedicatoria"                → pagina_001.jp2
División: "Prólogo"                    → pagina_002.jp2, pagina_003.jp2
División: "Capítulo I: Del Mar"        → pagina_004.jp2 ... pagina_020.jp2
División: "Capítulo II: De los Vientos"→ pagina_021.jp2 ... pagina_040.jp2
División: "Índice"                     → pagina_041.jp2
División: "Contraportada"              → contraportada.jp2
```

---

### Caso 2: Colección de fotografías históricas

**Contexto:** Un museo digitaliza 20 fotografías de la Guerra Civil Española.

#### Paso 1: Metadatos Descriptivos
```
Título: Colección fotográfica - Guerra Civil Española 1936-1939
Autor: Robert Capa
Fecha: 1937-06-01
Asunto: Fotografía documental - Historia contemporánea - España
Estándar: Dublin Core
```

#### Paso 2: Metadatos Administrativos
```
Titular de Derechos: Museo Nacional Centro de Arte Reina Sofía
Resolución de Escáner: 1200dpi
Acciones de Preservación: Escaneo en TIFF sin compresión, copia JPEG para acceso
Estándar: PREMIS
```

#### Paso 3: Sección de Ficheros
```
Por cada fotografía, 2 archivos:
- foto_001_master.tif (archivo maestro)
- foto_001_access.jpg (copia de acceso)
- foto_002_master.tif
- foto_002_access.jpg
...
(Total: 40 archivos)
```

#### Paso 4: Mapa Estructural
```
División: "Fotografía 1 - Bombardeo de Madrid"
  → foto_001_master.tif, foto_001_access.jpg

División: "Fotografía 2 - Refugiados"
  → foto_002_master.tif, foto_002_access.jpg

...
```

---

### Caso 3: Manuscrito medieval con ilustraciones

**Contexto:** Un archivo digitaliza un manuscrito iluminado del siglo XIV.

#### Paso 1: Metadatos Descriptivos
```
Título: Libro de Horas de la Reina María
Autor: Anónimo
Fecha: 1350-01-01
Asunto: Manuscritos iluminados - Arte medieval - Libros de horas
Estándar: MODS
```

#### Paso 2: Metadatos Administrativos
```
Titular de Derechos: Archivo Histórico Nacional
Resolución de Escáner: 800dpi color
Acciones de Preservación: Restauración digital, corrección de color, conversión TIFF a JPEG2000
Estándar: PREMIS
```

#### Paso 3: Sección de Ficheros
```
- folio_001r.jp2 (recto del folio 1)
- folio_001v.jp2 (verso del folio 1)
- folio_002r.jp2
- folio_002v.jp2
- miniatura_001.jp2 (ilustración a página completa)
...
```

#### Paso 4: Mapa Estructural
```
División: "Folio 1 recto - Texto"       → folio_001r.jp2
División: "Folio 1 verso - Texto"       → folio_001v.jp2
División: "Folio 2 recto - Miniatura"   → folio_002r.jp2, miniatura_001.jp2
División: "Folio 2 verso - Texto"       → folio_002v.jp2
...
```

---

### Caso 4: Tesis doctoral con anexos multimedia

**Contexto:** Una universidad archiva tesis doctorales con contenido multimedia.

#### Paso 1: Metadatos Descriptivos
```
Título: Análisis acústico del canto de aves migratorias
Autor: María García López
Fecha: 2023-09-15
Asunto: Ornitología - Bioacústica - Tesis doctoral
Estándar: Dublin Core
```

#### Paso 2: Metadatos Administrativos
```
Titular de Derechos: Universidad Autónoma de Madrid
Resolución: Born-digital (creado digitalmente)
Acciones de Preservación: Conversión a PDF/A, normalización audio a WAV
Estándar: PREMIS
```

#### Paso 3: Sección de Ficheros
```
- tesis_completa.pdf
- anexo_a_tablas.xlsx
- anexo_b_graficos.pdf
- grabacion_001_mirlo.wav
- grabacion_002_golondrina.wav
- grabacion_003_jilguero.wav
```

#### Paso 4: Mapa Estructural
```
División: "Documento principal"           → tesis_completa.pdf
División: "Anexo A - Datos estadísticos"  → anexo_a_tablas.xlsx
División: "Anexo B - Gráficos"            → anexo_b_graficos.pdf
División: "Grabación 1 - Mirlo común"     → grabacion_001_mirlo.wav
División: "Grabación 2 - Golondrina"      → grabacion_002_golondrina.wav
División: "Grabación 3 - Jilguero"        → grabacion_003_jilguero.wav
```

---

## PREGUNTAS FRECUENTES

### ❓ ¿Puedo guardar mi trabajo para continuarlo después?

**No, actualmente la aplicación no guarda automáticamente.**

Si recargas la página, perderás todo el progreso.

**Solución temporal:**
1. Completa todo en una sesión
2. Si necesitas pausar, NO cierres el navegador ni recargues la pestaña
3. Considera tomar notas aparte de lo que vas completando

**Próximas versiones:** Se añadirá guardado automático en el navegador.

---

### ❓ ¿Los archivos se suben a algún servidor?

**No.** Los archivos permanecen en tu ordenador.

La aplicación solo captura:
- Nombre del archivo
- Tamaño
- Tipo (MIME type)

El XML resultante contendrá referencias a los nombres de archivo, pero NO los archivos en sí.

---

### ❓ ¿Puedo editar el XML después de generarlo?

**Sí**, pero tendrás que hacerlo manualmente con un editor de texto o XML.

**Editores recomendados:**
- **Notepad++** (Windows - gratis)
- **Visual Studio Code** (Windows/Mac/Linux - gratis)
- **Oxygen XML Editor** (Profesional - pago)
- **XMLSpy** (Profesional - pago)

**Nota:** La aplicación no tiene función de importar XML para editarlo. Si generas el XML y luego quieres cambiar algo, tendrás que:
1. Volver a rellenar los formularios, o
2. Editar el XML manualmente

---

### ❓ ¿Qué hago si me equivoco en un campo?

**Antes de generar el XML:**
- Simplemente corrige el campo y continúa

**Después de generar el XML:**
- Opción 1: Vuelve a rellenar los formularios y genera de nuevo
- Opción 2: Edita el XML manualmente con un editor de texto

---

### ❓ ¿Puedo usar la aplicación sin conexión a Internet?

**No, actualmente necesitas conexión a Internet** porque:
- La aplicación está alojada en la web
- Usa CDN para Tailwind CSS

**Próximas versiones:** Se podría añadir soporte offline (PWA).

---

### ❓ ¿El XML generado es compatible con mi repositorio digital?

**Depende del repositorio.**

El XML generado sigue el estándar METS oficial y debería ser compatible con:
- **DSpace**
- **Fedora**
- **CONTENTdm**
- **Islandora**
- **ArchivesSpace**
- Cualquier sistema que soporte METS 1.x

**Pero:** Algunos repositorios requieren:
- Profiles específicos de METS (ej: METS/ALTO, METS/MODS)
- Secciones adicionales
- Validaciones específicas

**Recomendación:** Consulta la documentación de tu repositorio o haz una prueba de importación.

---

### ❓ ¿Puedo generar múltiples documentos METS en lote?

**No, actualmente la aplicación solo genera un documento METS a la vez.**

Para proyectos grandes con cientos de objetos digitales, necesitarías:
1. Usar la aplicación múltiples veces (tedioso), o
2. Desarrollar scripts automatizados, o
3. Usar software profesional de catalogación masiva

---

### ❓ ¿Hay límite en el número de archivos que puedo añadir?

**No hay límite técnico**, pero ten en cuenta:

- El navegador puede ralentizarse con +1000 archivos
- El XML generado será muy grande
- Recomendación: Hasta 500 archivos por documento METS

Para colecciones grandes, considera crear múltiples documentos METS.

---

### ❓ ¿Qué formato debo elegir: Dublin Core o MODS?

| Criterio | Usa Dublin Core | Usa MODS |
|----------|-----------------|----------|
| **Proyecto sencillo** | ✅ Sí | ❌ No |
| **Proyecto profesional** | ⚠️ Depende | ✅ Sí |
| **Primera vez con METS** | ✅ Sí | ❌ No |
| **Biblioteca/Archivo profesional** | ❌ No | ✅ Sí |
| **Necesitas interoperabilidad básica** | ✅ Sí | ✅ Sí |
| **Necesitas descripción muy detallada** | ❌ No | ✅ Sí |

**Regla simple:**
- **Si tienes dudas → Dublin Core**
- **Si trabajas en institución → Pregunta al responsable técnico**

---

## SOLUCIÓN DE PROBLEMAS

### ⚠️ Error: "Por favor, completa la sección de Metadatos Descriptivos"

**Causa:** El campo "Título" está vacío.

**Solución:**
1. Ve al Paso 1
2. Completa el campo "Título del Objeto Digital"
3. Intenta generar de nuevo

---

### ⚠️ Error: "Por favor, añade al menos un archivo en la Sección de Ficheros"

**Causa:** No has añadido ningún archivo.

**Solución:**
1. Ve al Paso 3
2. Haz clic en "Seleccionar archivos"
3. Añade al menos un archivo
4. Intenta generar de nuevo

---

### ⚠️ El botón "Añadir División" está deshabilitado (gris)

**Posibles causas:**

1. **No has escrito una etiqueta**
   - Solución: Escribe algo en "Etiqueta de la División"

2. **No has seleccionado archivos**
   - Solución: Selecciona uno o más archivos en el selector

3. **No hay archivos en la Sección de Ficheros**
   - Solución: Vuelve al Paso 3 y añade archivos

---

### ⚠️ El XML se ve como texto plano sin formato

**Causa:** Normal, el XML es texto plano.

**Para verlo con formato:**
1. Guarda el archivo como `.xml`
2. Ábrelo con Chrome, Firefox o Edge
3. O usa un editor XML (Notepad++, VS Code)

---

### ⚠️ No puedo seleccionar múltiples archivos en structMap

**Causa:** No estás manteniendo presionada la tecla correcta.

**Solución:**
- **Windows:** Mantén `Ctrl` mientras haces clic
- **Mac:** Mantén `Cmd` (⌘) mientras haces clic
- **Linux:** Mantén `Ctrl` mientras haces clic

---

### ⚠️ Perdí todo mi trabajo al recargar la página

**Causa:** La aplicación no guarda automáticamente.

**Prevención futura:**
- Completa todo en una sesión
- No recargues la página
- No cierres el navegador hasta generar el XML
- Toma notas de tus datos en un documento aparte

---

### ⚠️ El archivo descargado no se abre

**Posibles causas:**

1. **El navegador bloqueó la descarga**
   - Solución: Revisa la barra de descargas, autoriza la descarga

2. **No tienes programa para abrir XML**
   - Solución: Usa cualquier navegador o editor de texto

3. **El archivo está corrupto**
   - Solución: Genera el XML de nuevo

---

### ⚠️ El XML no es válido según mi repositorio

**Posibles causas:**

1. **El repositorio requiere un perfil específico de METS**
   - Solución: Consulta la documentación del repositorio

2. **Faltan secciones obligatorias**
   - Solución: Añade todas las secciones requeridas

3. **Formato de datos incorrecto**
   - Solución: Verifica fechas, URLs, etc.

---

## 📚 GLOSARIO DE TÉRMINOS

| Término | Significado |
|---------|-------------|
| **METS** | Metadata Encoding & Transmission Standard - Estándar para codificar metadatos |
| **dmdSec** | Descriptive Metadata Section - Sección de metadatos descriptivos |
| **amdSec** | Administrative Metadata Section - Sección de metadatos administrativos |
| **fileSec** | File Section - Sección de ficheros/inventario |
| **structMap** | Structural Map - Mapa estructural/jerarquía |
| **Dublin Core** | Estándar simple de 15 elementos para metadatos descriptivos |
| **MODS** | Metadata Object Description Schema - Esquema avanzado de descripción |
| **PREMIS** | Preservation Metadata Implementation Strategies - Estándar de preservación |
| **XML** | eXtensible Markup Language - Lenguaje de marcado extensible |
| **MIME Type** | Identificador estándar del tipo de archivo (ej: image/jpeg) |
| **Namespace** | Espacio de nombres XML que evita conflictos entre elementos |
| **XSD** | XML Schema Definition - Definición de esquema XML para validación |
| **OCR** | Optical Character Recognition - Reconocimiento óptico de caracteres |
| **DPI** | Dots Per Inch - Puntos por pulgada (resolución de escáner) |
| **TIFF** | Tagged Image File Format - Formato de imagen sin compresión |
| **JPEG2000** | Formato de imagen de alta calidad para preservación |
| **PDF/A** | PDF for Archive - Formato PDF especializado para archivo a largo plazo |

---

## 📞 SOPORTE Y RECURSOS

### Documentación oficial METS
- **Web oficial:** https://www.loc.gov/standards/mets/
- **Schema XSD:** http://www.loc.gov/standards/mets/mets.xsd
- **Tutorial:** https://www.loc.gov/standards/mets/METSOverview.v2.html

### Documentación Dublin Core
- **Web oficial:** https://www.dublincore.org/
- **Especificación:** https://www.dublincore.org/specifications/dublin-core/

### Documentación MODS
- **Web oficial:** https://www.loc.gov/standards/mods/
- **Ejemplos:** https://www.loc.gov/standards/mods/mods-examples.html

### Documentación PREMIS
- **Web oficial:** https://www.loc.gov/standards/premis/
- **Data Dictionary:** https://www.loc.gov/standards/premis/v3/

### Herramientas útiles

**Validadores XML:**
- https://www.xmlvalidation.com/
- https://codebeautify.org/xmlvalidator

**Editores XML:**
- Oxygen XML Editor: https://www.oxygenxml.com/
- Visual Studio Code: https://code.visualstudio.com/

**Repositorios digitales:**
- DSpace: https://duraspace.org/dspace/
- Fedora: https://fedorarepository.org/

---

## ✅ RESUMEN RÁPIDO - 5 PASOS

1. **Metadatos Descriptivos** → QUÉ ES (título, autor, fecha)
2. **Metadatos Administrativos** → CÓMO SE GESTIONA (derechos, resolución)
3. **Sección de Ficheros** → QUÉ ARCHIVOS (seleccionar archivos)
4. **Mapa Estructural** → CÓMO SE ORGANIZAN (portada, capítulos, páginas)
5. **Generar y Descargar** → OBTENER EL XML

**Tiempo estimado:** 15-30 minutos (depende del número de archivos)

---

## 📜 LICENCIA Y CRÉDITOS

Esta aplicación genera archivos XML conformes a:
- **METS** (Library of Congress)
- **Dublin Core** (Dublin Core Metadata Initiative)
- **MODS** (Library of Congress)
- **PREMIS** (Library of Congress)

Todos los estándares son abiertos y de dominio público.

---

**Versión de la guía:** 1.0
**Última actualización:** Noviembre 2025
**Aplicación:** METS XML Builder

---

