import { useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Layout & Components
import Layout from './components/Layout';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NewsPage from './pages/NewsPage';
import CurrentCabinetPage from './pages/CurrentCabinetPage';
import PreviousCabinetsPage from './pages/PreviousCabinetsPage';
import StrugglesPage from './pages/StrugglesPage';
import FeedbackPage from './pages/FeedbackPage';

// Admin Pages
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';

export default function App() {
  // Initialize token from localStorage
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || '');

  // Memoize auth status
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
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/current-cabinet" element={<CurrentCabinetPage />} />
          <Route path="/previous-cabinets" element={<PreviousCabinetsPage />} />
          <Route path="/struggles" element={<StrugglesPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Auth Routes */}
          <Route
            path="/admin-login"
            element={
              isAuthenticated ? (
                <Navigate to="/admin" replace />
              ) : (
                <AdminLoginPage onLogin={handleLogin} />
              )
            }
          />
          
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <AdminPage />
              ) : (
                <Navigate to="/admin-login" replace />
              )
            }
          />

          {/* Fallback for 404s */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}