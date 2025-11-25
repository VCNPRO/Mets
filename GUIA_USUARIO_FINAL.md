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