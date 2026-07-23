import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

// Vom construi adevărata pagină de Login la Pasul 4.
// Până atunci, folosim un mic placeholder ca să nu primim eroare.
const LoginPlaceholder = () => (
  <div className="flex h-screen items-center justify-center bg-slate-900 text-white text-2xl font-bold">
    Pagina de Login (Se construiește la Pasul 4...)
  </div>
);

const App: React.FC = () => {
  return (
    // 1. AuthProvider face datele de login disponibile în toată aplicația
    <AuthProvider>
      {/* 2. Router activează navigarea între pagini */}
      <Router>
        <Routes>
          
          {/* RUTE PUBLICE */}
          <Route path="/login" element={<LoginPlaceholder />} />

          {/* RUTE PROTEJATE */}
          {/* Tot ce este pus în interiorul <ProtectedRoute> necesită token JWT */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            {/* Aici vei putea adăuga pe viitor <Route path="/dashboard" element={<Dashboard />} /> etc. */}
          </Route>

          {/* CATCH-ALL (Dacă scrie un URL greșit, îl trimitem la /home, unde ProtectedRoute decide ce face cu el) */}
          <Route path="*" element={<Navigate to="/home" replace />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;