# 📸 Guía del Analizador de Archivos Multimedia

## 🎯 Dónde Encontrarlo

El analizador está en la **Sección 3: "Sección de Ficheros (fileSec)"** de la aplicación.

## 📍 Ubicación Exacta en la Interfaz

```
METS Builder
│
├── 0. Encabezado METS (metsHdr)
├── 1. Metadatos Descriptivos (dmdSec)
├── 2. Metadatos Administrativos (amdSec)
├── 3. Sección de Ficheros (fileSec) ◄── AQUÍ ESTÁ
│   └── [Selector de archivos]
│       ├── Barra de progreso (mientras analiza)
│       └── Lista de archivos con metadatos
└── 4. Mapa Estructural (structMap)
```

## 🚀 Cómo Usarlo

### Paso 1: Cargar Archivos
1. Abre la aplicación: `http://localhost:5173`
2. Desplázate a la **Sección 3**
3. Haz clic en el selector de archivos
4. Selecciona una o varias imágenes/videos

### Paso 2: Observar el Análisis
Verás aparecer:
```
┌───────────────────────────────────────────┐
│ Analizando archivos... 1 / 3             │
│ ████████████░░░░░░░░░░░░ 33%             │
│ Extrayendo metadatos EXIF, calculando    │
│ checksums (MD5, SHA-256)...               │
└───────────────────────────────────────────┘
```

### Paso 3: Ver Resultados
Después de unos segundos, verás la información completa:

#### Para una FOTO JPG:
```
foto_paisaje.jpg                [master]
2,450 KB • image/jpeg

MD5: a3d4e5f67890abc...
SHA-256: b7c8d9e01234def...

📐 6720 × 4480px • 300dpi • sRGB

📷 Canon EOS 5D Mark IV • f/2.8 • 1/250s • ISO 400
                                  [Eliminar]
```

#### Para un VIDEO MP4:
```
video_tutorial.mp4              [archive]
15,234 KB • video/mp4

MD5: c4d5e6f78901abc...
SHA-256: d8e9f0a12345def...

🎬 45.3s • 5000kbps
                                  [Eliminar]
```

#### Para un AUDIO MP3:
```
cancion.mp3                     [archive]
5,120 KB • audio/mpeg

MD5: e5f6a7b89012abc...
SHA-256: f9a0b1c23456def...

🎬 3.5s
                                  [Eliminar]
```

## 📊 Qué Analiza Automáticamente

### Para Imágenes (JPG, PNG, TIFF):
✅ **Checksums**
  - MD5 (para verificación)
  - SHA-256 (para seguridad)

✅ **Metadatos Técnicos**
  - Dimensiones (ancho × alto)
  - Resolución (DPI)
  - Espacio de color (sRGB, Adobe RGB, etc.)
  - Profundidad de bits
  - Compresión

✅ **EXIF Completo**
  - Fabricante de cámara
  - Modelo de cámara
  - Fecha de captura
  - Configuración de exposición:
    - ISO
    - Apertura (f-number)
    - Velocidad de obturación
  - Distancia focal
  - Modelo de lente
  - Coordenadas GPS (si están disponibles)
  - Software usado para edición

### Para Videos (MP4, MOV, AVI):
✅ **Checksums** (MD5 + SHA-256)
✅ **Duración** en segundos
✅ **Bitrate**
✅ **Códec** (si es detectable)

### Para Audio (MP3, WAV, M4A):
✅ **Checksums** (MD5 + SHA-256)
✅ **Duración** en segundos
✅ **Bitrate**
✅ **Sample rate**
✅ **Canales** (mono/estéreo)

## 🔗 Vinculación con XML METS

Todos estos metadatos se incluyen automáticamente en el XML generado:

### En techMD (Metadatos Técnicos):
```xml
<mets:techMD ID="tech_0">
    <mets:mdWrap MDTYPE="NISOIMG">
        <mets:xmlData>
            <mix:mix>
                <mix:imageWidth>6720</mix:imageWidth>
                <mix:imageHeight>4480</mix:imageHeight>
                <mix:xSamplingFrequency>300</mix:xSamplingFrequency>
            </mix:mix>
        </mets:xmlData>
    </mets:mdWrap>
</mets:techMD>
```

### En fileSec (con Checksums):
```xml
<mets:file ID="file_123"
           MIMETYPE="image/jpeg"
           SIZE="2508800"
           CHECKSUM="a3d4e5f67890abc..."
           CHECKSUMTYPE="MD5">
    <mets:FLocat LOCTYPE="URL"
                 xlink:href="foto.jpg"
                 CHECKSUM="b7c8d9e01234def..."
                 CHECKSUMTYPE="SHA-256"/>
</mets:file>
```

## 💡 Consejos

### Mejores Resultados:
- ✅ Usa imágenes JPG con EXIF (fotos de cámara digital)
- ✅ Los archivos editados en Photoshop mantienen algunos EXIF
- ✅ Videos MP4 modernos tienen buenos metadatos
- ⚠️ Imágenes descargadas de web pueden tener EXIF limitado
- ⚠️ Screenshots no tienen datos de cámara

### Tipos de Archivo Soportados:
- **Imágenes**: JPG, JPEG, PNG, TIFF, WEBP
- **Videos**: MP4, MOV, AVI, WEBM
- **Audio**: MP3, WAV, M4A, OGG
- **Otros**: Se calculan checksums pero sin metadatos específicos

## 🎬 Ejemplo Real

### Antes (sin analizador):
```
foto.jpg
2,450 KB
```

### Ahora (con analizador):
```
foto.jpg                        [master]
2,450 KB • image/jpeg

MD5: a3d4e5f67890abc1234567890abcdef1
SHA-256: b7c8d9e01234def5678901234567890a...

📐 6720 × 4480px • 300dpi • sRGB

📷 Canon EOS 5D Mark IV
   f/2.8 • 1/250s • ISO 400
```

### En el XML METS resultante:
Todo esto se traduce a metadatos estándar METS/MIX/PREMIS que cualquier repositorio digital puede procesar.

## 🔍 Verificación

Para verificar que el analizador funciona:

1. Inicia la app: `npm run dev`
2. Ve a Sección 3
3. Carga una foto de tu cámara/teléfono
4. Si ves 📷 con datos de cámara = ✅ EXIF extraído
5. Si ves MD5/SHA-256 = ✅ Checksums calculados
6. Si ves 📐 con dimensiones = ✅ Metadatos técnicos extraídos

## ✅ Estado

- ✅ **Implementado y funcionando**
- ✅ **Visible en Sección 3**
- ✅ **Automático (sin configuración necesaria)**
- ✅ **Compatible con múltiples formatos**
- ✅ **Cumple con estándares METS/MIX/PREMIS**

---

**¿No ves los metadatos?**
- Verifica que el archivo tenga EXIF (fotos de cámara sí, screenshots no)
- Revisa la consola del navegador (F12) por errores
- Asegúrate de usar formatos soportados (JPG, PNG, MP4, etc.)
