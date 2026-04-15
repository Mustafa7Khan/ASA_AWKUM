import { useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || '');

  const isAuthenticated = useMemo(() => Boolean(token), [token]);

  function handleLogin(nextToken) {
    localStorage.setItem('adminToken', nextToken);
    setToken(nextToken);
  }

  function handleLogout() {
    localStorage.removeItem('adminToken');
    setToken('');
  }

  return (
    <BrowserRouter>
      <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/admin-login"
            element={isAuthenticated ? <Navigate to="/admin" replace /> : <AdminLoginPage onLogin={handleLogin} />}
          />
          <Route path="/admin" element={isAuthenticated ? <AdminPage /> : <Navigate to="/admin-login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
