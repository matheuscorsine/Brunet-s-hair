import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import {
  LoginPage,
  SignUpPage,
  DashboardPage,
  AgendaPage,
  ClientsPage,
  ReportsPage,
  SettingsPage,
} from './pages';

// Componente para proteger rotas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Componente principal com navegação por abas
function MainApp() {
  const { currentTab } = useStore();
  
  return (
    <AnimatePresence mode="wait">
      {currentTab === 'dashboard' && <DashboardPage key="dashboard" />}
      {currentTab === 'agenda' && <AgendaPage key="agenda" />}
      {currentTab === 'clients' && <ClientsPage key="clients" />}
      {currentTab === 'reports' && <ReportsPage key="reports" />}
      {currentTab === 'settings' && <SettingsPage key="settings" />}
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Rotas protegidas */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
