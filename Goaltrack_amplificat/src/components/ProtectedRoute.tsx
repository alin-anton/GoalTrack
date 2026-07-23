import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Dacă utilizatorul nu este autentificat, îl forțăm să meargă pe /login
  // `replace` șterge istoricul de navigare ca să nu poată da "Back" înapoi pe pagina protejată
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Dacă este autentificat, permitem afișarea componentelor "copil" (ex: pagina Home)
  return <Outlet />;
};

export default ProtectedRoute;