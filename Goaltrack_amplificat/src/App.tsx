import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Stats from './pages/Stats'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* RUTE PUBLICE */}
          <Route path="/login" element={<Login />} />

          {/* RUTE PROTEJATE (necesită token) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Route>

          {/* CATCH-ALL: Redirecționează orice link greșit către home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;