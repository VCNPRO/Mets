# 📊 Estudio de Precios - annamets XML Builder

## Análisis de Mercado para Bibliotecas y Fondos Históricos

**Fecha**: Enero 2025
**Versión**: 1.0

---

## 📈 Resumen Ejecutivo

**Rango de precio recomendado**: **€299 - €1,999/año** dependiendo del segmento

**Propuesta de valor única**:
- Única herramienta que combina generación METS + análisis IA (Whisper + Gemini)
- Ahorro de 70-80% vs. servicios de transcripción tradicionales
- ROI positivo desde 10-15 horas de audio procesadas al mes

---

## 🎯 Segmentación de Clientes

### 1. Bibliotecas Pequeñas / Archivos Municipales
- **Presupuesto anual TI**: €5,000 - €20,000
- **Volumen**: 100-500 objetos digitales/año
- **Pain point**: Personal limitado, presupuesto ajustado
- **Precio sugerido**: **€299/año** (€24.92/mes)

### 2. Bibliotecas Universitarias / Archivos Regionales
- **Presupuesto anual TI**: €50,000 - €200,000
- **Volumen**: 1,000-5,000 objetos digitales/año
- **Pain point**: Necesitan estandarización y eficiencia
- **Precio sugerido**: **€799/año** (€66.58/mes)

### 3. Bibliotecas Nacionales / Archivos Estatales
- **Presupuesto anual TI**: €200,000 - €1,000,000+
- **Volumen**: 10,000+ objetos digitales/año
- **Pain point**: Cumplimiento de estándares, preservación a largo plazo
- **Precio sugerido**: **€1,999/año** (€166.58/mes)

### 4. Empresas Privadas (Fondos Corporativos)
- **Presupuesto**: Variable, alta disposición de pago
- **Volumen**: Variable
- **Pain point**: Compliance, acceso rápido a información
- **Precio sugerido**: **€2,999/año** (€249.92/mes)

---

## 💰 Análisis de Costos de Operación

### Costos Variables (por cliente/uso)

#### 1. API de OpenAI Whisper
- **Precio**: $0.006/minuto ($0.36/hora de audio)
- **Ejemplo**: 100 horas de audio/mes = $36/mes = €34/mes

#### 2. API de Google Gemini
- **Precio**: ~$1.25 por millón de tokens input
- **Ejemplo**: 100 análisis/mes (~5M tokens) = $6.25/mes = €6/mes

#### 3. Infraestructura (hosting, CDN, base de datos)
- **Estimado**: €20-50/mes por cliente según volumen

**Total costos variables por cliente**: €60-90/mes (cliente intensivo)

---

## 🔍 Análisis Competitivo

### Soluciones Directas (METS)

| Herramienta | Tipo | Precio | Limitaciones |
|-------------|------|--------|--------------|
| **Preservica Starter** | SaaS | $199/mes ($2,388/año) | Sin IA, límite 5GB |
| **Preservica Professional** | SaaS | $500+/mes (~$6,000/año) | Complejidad alta |
| **DSpace** | Open Source | Gratis | Requiere TI dedicado, sin IA |
| **Archivists' Toolkit** | Desktop | Gratis | UI anticuada, sin cloud |

### Soluciones Indirectas (Transcripción)

| Servicio | Precio | Capacidades |
|----------|--------|-------------|
| **Servicios profesionales** | $98-150/hora de audio | Solo transcripción, sin METS |
| **Rev.com** | $1.50/minuto ($90/hora) | Solo transcripción |
| **Trint** | $80/mes (7 horas) | Solo transcripción |

---

## 💎 Propuesta de Valor de annamets

### Funcionalidades Únicas

✅ **Generación automática de XML METS** (estándar LoC)
✅ **Análisis EXIF completo** (imágenes)
✅ **Metadatos técnicos de audio/video** (códecs, bitrate, duración)
✅ **Checksums MD5 + SHA-256** automáticos
✅ **Transcripción IA** con OpenAI Whisper
✅ **Análisis de contenido IA** con Google Gemini
✅ **Generación de subtítulos** (.srt, .vtt)
✅ **Extracción de keywords y entidades**
✅ **Biblioteca de archivos** con reutilización
✅ **Exportación a CSV/Excel/JSON**
✅ **Eventos PREMIS** de preservación
✅ **100% en navegador** (sin instalación)

### ROI para el Cliente

#### Caso de Uso 1: Biblioteca Universitaria
**Necesidad**: Digitalizar 50 entrevistas históricas (25 horas de audio)

**Opción A - Servicios tradicionales:**
- Transcripción: 25 horas × $100/hora = $2,500
- Metadatos METS: 50 documentos × $20/doc = $1,000
- **Total: $3,500** (solo una vez)

**Opción B - annamets:**
- Suscripción anual: €799/año
- Costos API (25 horas): 25 × $0.36 = $9 + $6.25 análisis = $15.25
- **Total año 1: €813** (~$870)
- **Ahorro: 75%**
- Beneficio adicional: Pueden procesar contenido ilimitado el resto del año

#### Caso de Uso 2: Archivo Regional
**Necesidad**: Catalogar 2,000 fotografías históricas con metadatos completos

**Opción A - Manual:**
- Tiempo: 2,000 fotos × 5 min/foto = 166 horas
- Costo personal: 166 horas × €25/hora = €4,150

**Opción B - annamets:**
- Suscripción: €799/año
- Tiempo: 2,000 fotos × 1 min/foto = 33 horas (automatización)
- Costo personal: 33 horas × €25/hora = €825
- **Total: €1,624 vs €4,150**
- **Ahorro: 61%**

#### Caso de Uso 3: Biblioteca Nacional
**Necesidad**: Procesamiento continuo (200 objetos/mes, mix de formatos)

**Opción A - Software enterprise + servicios:**
- Preservica Professional: $6,000/año
- Servicios de transcripción externos: $3,000/año
- **Total: $9,000/año**

**Opción B - annamets:**
- Suscripción Enterprise: €1,999/año (~$2,200)
- Costos API estimados: $600/año
- **Total: ~$2,800/año**
- **Ahorro: 69%**

---

## 📊 Modelos de Pricing Recomendados

### Opción 1: SaaS por Niveles (RECOMENDADO)

| Plan | Precio/Año | Límites | Ideal para |
|------|-----------|---------|------------|
| **Básico** | €299 | 500 objetos/año, 10 horas IA/mes | Archivos pequeños |
| **Profesional** | €799 | 2,000 objetos/año, 50 horas IA/mes | Bibliotecas universitarias |
| **Enterprise** | €1,999 | Ilimitado, 200 horas IA/mes | Bibliotecas nacionales |
| **Enterprise Plus** | Personalizado | Ilimitado, IA ilimitada, soporte prioritario | Grandes instituciones |

**Ventajas:**
- Previsible para clientes
- Ingresos recurrentes
- Fácil de escalar

**Extras opcionales:**
- Horas IA adicionales: €0.50/hora
- Soporte prioritario: +€200/año
- Formación personalizada: €500/sesión
- Instalación on-premise: Consultar

### Opción 2: Freemium + Premium

| Plan | Precio | Características |
|------|--------|-----------------|
| **Gratis** | €0 | 50 objetos/año, sin IA, marca de agua |
| **Premium** | €49/mes (€490/año) | Ilimitado, 20 horas IA/mes |
| **Business** | €149/mes (€1,490/año) | Ilimitado, 100 horas IA/mes, sin marca |

**Ventajas:**
- Adquisición viral
- Upsell natural
- Democratiza acceso

**Desventajas:**
- Costos de soporte para usuarios gratuitos
- Conversión típica 2-5%

### Opción 3: Licencia Perpetua + Mantenimiento

| Componente | Precio |
|------------|--------|
| Licencia perpetua | €2,999 (pago único) |
| Mantenimiento anual (20%) | €600/año |
| Sin límites de uso | ✅ |
| Instalación on-premise | ✅ |

**Ventajas:**
- Atractivo para instituciones públicas
- Sin costos recurrentes percibidos
- Cumple requisitos de compra pública

**Desventajas:**
- Cash flow irregular
- Menor valor de vida del cliente (LTV)

---

## 🎯 Estrategia de Precios Recomendada

### Fase 1: Lanzamiento (Meses 1-6)
**Modelo**: SaaS con descuento de early adopter

- **Básico**: €199/año (33% descuento)
- **Profesional**: €599/año (25% descuento)
- **Enterprise**: €1,499/año (25% descuento)

**Objetivo**: 50 clientes pagos (30 básico, 15 profesional, 5 enterprise)
**Ingresos proyectados**: €19,470/año

### Fase 2: Estabilización (Meses 7-18)
**Modelo**: Precios completos + upselling

- **Básico**: €299/año
- **Profesional**: €799/año
- **Enterprise**: €1,999/año

**Objetivo**: 200 clientes pagos (120 básico, 60 profesional, 20 enterprise)
**Ingresos proyectados**: €123,780/año

### Fase 3: Expansión (Año 2+)
**Modelo**: Precios premium + Enterprise personalizado

- Aumentar precios 10-15% tras validar valor
- Añadir plan Enterprise Plus (€5,000+/año) para grandes instituciones
- Servicios profesionales (consultoría, formación)

**Objetivo**: 500 clientes pagos
**Ingresos proyectados**: €350,000+/año

---

## 🌍 Consideraciones Geográficas

### Europa (Principal)
- Precio base en euros
- IVA variable según país (21% España, 19% Alemania, etc.)
- Fuerte cultura de preservación digital
- Subvenciones europeas (H2020, Digital Europe)

### Latinoamérica
- Precios en USD con descuento 40-50%
- **Básico**: $149/año
- **Profesional**: $399/año
- Grandes oportunidades en Brasil, México, Argentina

### Norteamérica
- Precios en USD (paridad con EUR)
- Mercado maduro, mayor competencia
- Foco en universidades privadas (mayor presupuesto)

---

## 💼 Estrategias de Venta

### Canal Directo (Web)
- Landing page con calculadora de ROI
- Prueba gratuita 14 días (con funciones IA limitadas)
- Demostraciones en video
- Casos de éxito documentados

### Canal Institucional
- Participación en congresos (SAA, IFLA, ICA)
- Webinars para bibliotecarios
- Partnerships con asociaciones nacionales
- Licitaciones públicas (requiere licencia perpetua)

### Canal Partner
- Resellers tecnológicos para bibliotecas
- Consultoras de digitalización
- Comisión: 20-30% primer año, 10% renovaciones

---

## 📈 Proyecciones Financieras (Año 1)

### Escenario Conservador
- 100 clientes pagos
- Mix: 60% Básico, 30% Profesional, 10% Enterprise
- **Ingresos**: €61,890/año (€5,158/mes)
- **Costos API**: ~€3,000/año
- **Infraestructura**: €2,400/año
- **Marketing**: €12,000/año
- **Margen bruto**: €44,490 (72%)

### Escenario Optimista
- 250 clientes pagos
- Mix: 50% Básico, 35% Profesional, 15% Enterprise
- **Ingresos**: €169,462/año (€14,122/mes)
- **Costos API**: ~€7,500/año
- **Infraestructura**: €6,000/año
- **Marketing**: €25,000/año
- **Margen bruto**: €130,962 (77%)

---

## 🎁 Estrategias de Adquisición

### Pricing Táctico

1. **Descuento Académico**: -20% para universidades (.edu)
2. **Descuento ONG**: -30% para organizaciones sin ánimo de lucro
3. **Pago Anual**: -15% vs. pago mensual
4. **Early Adopter**: -33% primeros 6 meses
5. **Volumen**: Licencias múltiples con descuento progresivo

### Incentivos de Referido
- Cliente refiere otro cliente: 1 mes gratis (ambos)
- 3 referencias exitosas: Upgrade a plan superior gratis 6 meses

### Programa de Embajadores
- Bibliotecarios influencers: Licencia gratis + comisión 15%
- Casos de estudio documentados
- Co-marketing en eventos

---

## ⚠️ Riesgos y Mitigaciones

### Riesgo 1: Costos API impredecibles
**Mitigación**:
- Límites claros por plan
- Alertas al 80% del límite
- Opción de compra de packs adicionales

### Riesgo 2: Percepción de precio alto
**Mitigación**:
- Calculadora ROI en web
- Casos de estudio con ahorro documentado
- Prueba gratuita funcional

### Riesgo 3: Competencia de open source
**Mitigación**:
- Destacar funciones IA únicas
- UX superior
- Soporte incluido
- Sin necesidad de TI dedicado

### Riesgo 4: Licitaciones públicas
**Mitigación**:
- Ofrecer opción de licencia perpetua
- Cumplimiento de estándares europeos
- Documentación de seguridad (GDPR)

---

## 📋 Checklist Pre-Lanzamiento Comercial

### Producto
- [ ] Sistema de planes/suscripciones implementado
- [ ] Límites de uso por plan funcionales
- [ ] Sistema de facturación (Stripe/Paddle)
- [ ] Panel de administración de clientes
- [ ] Métricas de uso en tiempo real

### Legal
- [ ] Términos de servicio
- [ ] Política de privacidad (GDPR)
- [ ] Política de reembolsos
- [ ] Acuerdo de nivel de servicio (SLA)

### Marketing
- [ ] Landing page optimizada
- [ ] Calculadora ROI
- [ ] 3 casos de estudio mínimo
- [ ] Videos demostrativos
- [ ] Material para partners

### Ventas
- [ ] Proceso de onboarding documentado
- [ ] Formación de usuarios (tutoriales)
- [ ] Sistema de soporte (email + chat)
- [ ] FAQ completa

---

## 🎯 Recomendación Final

**Modelo sugerido**: **SaaS por niveles con descuentos de lanzamiento**

**Precios iniciales (6 meses)**:
- Básico: €199/año
- Profesional: €599/año
- Enterprise: €1,499/año

**Precios objetivo (después 6 meses)**:
- Básico: €299/año
- Profesional: €799/año
- Enterprise: €1,999/año

**Razones**:
1. ✅ Precios 50-70% más bajos que Preservica
2. ✅ Funciones IA únicas en el mercado
3. ✅ ROI documentable desde primer mes
4. ✅ Escalable según tamaño de institución
5. ✅ Ingresos recurrentes predecibles
6. ✅ Compatible con presupuestos de bibliotecas

**Proyección conservadora Año 1**: €60,000-170,000 en ingresos
**Objetivo ambicioso Año 2**: €300,000-500,000 en ingresos

---

## 📞 Próximos Pasos

1. **Validar precios** con 10-15 bibliotecas objetivo (entrevistas)
2. **Crear landing page** con calculadora ROI
3. **Implementar sistema de suscripciones** (Stripe)
4. **Desarrollar 3 casos de estudio** completos
5. **Preparar pitch deck** para presentaciones
6. **Lanzar beta cerrada** con early adopters (€0, feedback a cambio)
7. **Lanzamiento público** con descuento de introducción

---

**Elaborado por**: Claude Code
**Fecha**: Enero 2025
**Versión**: 1.0
