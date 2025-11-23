# Autenticación - Mets

## 🌐 URLs del Proyecto

- **Producción**: https://mets-silk.vercel.app
- **Login**: https://mets-silk.vercel.app/login
- **Admin Panel**: https://mets-silk.vercel.app/admin

## 📊 Base de Datos

- **Nombre**: mets-db
- **Tipo**: PostgreSQL (Neon Serverless)
- **Región**: EU Central 1 (Frankfurt)

## 🎨 Branding

- **Color Principal**: Azul (#3b82f6, #2563eb) - temporal
- **Email de Soporte**: soporte@mets.com
- **Nombre Completo**: Mets

## ✅ Estado de Implementación

- [x] Base de datos configurada
- [x] Migraciones aplicadas (users, alerts, admin tables)
- [x] JWT_SECRET configurado
- [x] Backend APIs creadas (Vercel Functions) - ✅ COMPLETADO
- [x] Frontend components (LoginPage, AuthContext) - ✅ COMPLETADO
- [x] Dependencies añadidas a package.json
- [ ] Usuario admin creado
- [ ] Testing completado

## 🚀 Próximos Pasos

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Crear Usuario Admin**
   ```bash
   # Después del primer registro en /login
   psql $POSTGRES_URL -c "UPDATE users SET role = 'admin' WHERE email = 'TU_EMAIL';"
   ```

4. **Testing**
   - Registro de usuario
   - Login/Logout
   - Acceso a /admin
   - Gestión de usuarios

## 📝 Notas Específicas

- Este proyecto usa **Vite + React** (SPA, igual que Annalysis)
- Las APIs están en `/api/[endpoint].ts` como Vercel Functions
- El frontend está en `src/`
- Base de datos ya preparada con schema completo
- Router: React Router (necesita ser configurado en App.tsx)

## 📚 Documentación

- [Guía Completa](./AUTH-SYSTEM.md)
- [Quickstart](./QUICKSTART-AUTH.md)

---

**Última actualización**: 2025-11-23
**Estado**: Backend y Frontend implementados ✅ - Falta crear admin y testing
