// DÓNDE: App.tsx
// MISIÓN: Configurar routing con BrowserRouter para Mets

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './src/contexts/AuthContext';
import { ProtectedRoute } from './src/components/auth/ProtectedRoute';
import MetsApp from './src/pages/MetsApp';
import LoginPage from './src/pages/LoginPage';
import AdminPage from './src/pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Ruta principal - App METS - ACCESO DIRECTO TEMPORAL */}
          <Route
            path="/"
            element={<MetsApp />}
          />

          {/* Ruta de login - Mantenida pero no requerida */}
          <Route path="/login" element={<LoginPage />} />

          {/* Ruta de administración - ACCESO DIRECTO TEMPORAL */}
          <Route
            path="/admin"
            element={<AdminPage />}
          />

          {/* Redirigir cualquier otra ruta a / */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
