import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, token } = useAuth();

  // Verificăm atât starea din context cât și prezența fizică a token-ului în localStorage la un refresh brusc
  const hasToken = isAuthenticated || !!localStorage.getItem('token');

  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;