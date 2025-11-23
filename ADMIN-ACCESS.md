# Admin Dashboard - Mets

## 🚀 Acceso Rápido

### URL de Acceso
```
http://localhost:5173/admin        (desarrollo con Vite)
https://mets.vercel.app/admin      (producción)
```

### Requisitos
1. Estar logueado con un usuario
2. Tener rol de `admin` en la base de datos

## 📝 Instalación y Configuración

### 1. Aplicar Migración de Base de Datos

```bash
# Opción 1: Script automático
npm run migrate:admin

# Opción 2: SQL directo
psql $POSTGRES_URL -f migrations/db-migration-admin-management.sql
```

### 2. Crear Usuario Admin

```bash
# Método 1: Script Node.js
node scripts/make-admin.js tu-email@mets.com

# Método 2: SQL directo
psql $POSTGRES_URL -c "UPDATE users SET role = 'admin' WHERE email = 'tu-email@mets.com';"
```

### 3. Configurar Variables de Entorno

Añade en `.env.local` o Vercel Dashboard:

```bash
# Para enviar notificaciones por email (opcional)
RESEND_API_KEY=re_xxxxx
ADMIN_EMAIL=admin@mets.com
```

## ✨ Características del Admin Dashboard

- ✅ **Gestión de Usuarios**: Ver, editar, categorizar usuarios
- ✅ **Monitoreo de Costes**: Tracking automático de gastos
- ✅ **Sistema de Alertas**: Notificaciones automáticas
- ✅ **Métricas y Gráficos**: Visualización de datos con Recharts
- ✅ **Auditoría**: Logs de todas las acciones admin
- ✅ **Exportación**: Descarga de datos en CSV/JSON

## 🔐 Seguridad

El acceso al admin está protegido con:
- Verificación de autenticación JWT
- Validación de rol admin en BD
- Componente `ProtectedRoute` con `requireAdmin={true}`
- Redirección automática a `/login` si no autorizado

## 📚 Estructura

```
Mets/
├── App.tsx                       # Router principal con rutas
├── src/
│   ├── pages/
│   │   ├── MetsApp.tsx          # App principal de Mets
│   │   ├── LoginPage.tsx        # Página de login
│   │   └── AdminPage.tsx        # Página admin (protegida)
│   ├── components/
│   │   └── admin/
│   │       ├── AdminDashboard.tsx        # Dashboard principal
│   │       ├── ErrorMonitoringPanel.tsx # Panel de errores
│   │       └── ...                       # Más componentes
│   └── contexts/
│       └── AuthContext.tsx      # Context de autenticación
├── api/admin/                    # Vercel Serverless Functions
│   ├── users/
│   ├── stats/
│   ├── alerts/
│   └── ...
└── lib/
    ├── admin-users.ts            # Lógica de usuarios
    ├── admin-alerts.ts           # Sistema de alertas
    └── admin-logs.ts             # Auditoría

scripts/
├── make-admin.js                 # Crear admin
└── apply-admin-migration.js      # Migración BD
```

## 🚀 Uso Rápido

```bash
# 1. Instalar dependencias (si es necesario)
npm install

# 2. Aplicar migración
npm run migrate:admin

# 3. Crear admin
node scripts/make-admin.js tu-email@mets.com

# 4. Iniciar servidor Vite
npm run dev

# 5. Acceder
# http://localhost:5173/admin
```

## 🛣️ Rutas Configuradas

```typescript
/                  → MetsApp (protegida, requiere login)
/login             → LoginPage (pública)
/admin             → AdminPage (protegida, requiere admin)
```

## 📊 APIs Disponibles

Las APIs están en `api/admin/` como Vercel Serverless Functions:

```typescript
GET  /api/admin/stats              // Estadísticas plataforma
GET  /api/admin/users              // Lista usuarios
PATCH /api/admin/users             // Actualizar usuario
GET  /api/admin/alerts             // Alertas activas
POST /api/admin/alerts             // Verificar alertas
```

## ⚠️ Diferencias con Verbadoc/Annalogica

Mets usa **Vite + React** en lugar de Next.js:
- Router: `react-router-dom` (en lugar de Next.js App Router)
- APIs: Vercel Serverless Functions en `/api` (VercelRequest/VercelResponse)
- Páginas: Componentes React en `src/pages/`
- Protección: `ProtectedRoute` component (en lugar de middleware)

## ❓ Troubleshooting

### No puedo acceder al admin
1. Verifica que estés logueado
2. Confirma que tu usuario tiene `role = 'admin'` en BD
3. Revisa la consola del navegador para errores de autenticación

### Error de migración
```bash
# Verificar tablas existentes
psql $POSTGRES_URL -c "\dt"

# Re-aplicar migración si es necesario
psql $POSTGRES_URL -f migrations/db-migration-admin-management.sql
```

### Error "AuthContext is undefined"
Verifica que `AuthProvider` esté envolviendo las rutas en `App.tsx`

### Las APIs no funcionan
1. Verifica que las variables de entorno estén configuradas en Vercel
2. Confirma que el formato de las APIs sea compatible con VercelRequest
3. Revisa los logs en Vercel Dashboard

## 📖 Documentación Completa

Para más detalles, consulta:
- `ADMIN-DASHBOARD.md` - Guía completa del sistema
- `QUICKSTART-ADMIN.md` - Inicio rápido
- `AUTH-SYSTEM.md` - Sistema de autenticación
