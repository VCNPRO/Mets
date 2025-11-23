// DÓNDE: src/pages/AdminPage.tsx
// MISIÓN: Página del dashboard de administración para Mets

import { AdminDashboard } from '../components/admin/AdminDashboard';

export default function AdminPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto">
        <AdminDashboard />
      </div>
    </div>
  );
}
