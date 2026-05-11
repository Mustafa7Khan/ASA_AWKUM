import { useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

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
import NewsDetail from './pages/NewsDetail';
import MemberDetail from './pages/MemberDetail';
// Admin Pages
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
}

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  const isAuthenticated = useMemo(() => Boolean(token), [token]);

  function handleLogin(nextToken) {
    localStorage.setItem('token', nextToken);
    setToken(nextToken);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setToken('');
  }

  return (
    <BrowserRouter>

      <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>

        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/current-cabinet" element={<CurrentCabinetPage />} />
          <Route path="/previous-cabinets" element={<PreviousCabinetsPage />} />
          <Route path="/struggles" element={<StrugglesPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/member/:id" element={<MemberDetail />} />

          {/* ================= AUTH ROUTES ================= */}
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

          {/* ================= PROTECTED ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </Layout>

    </BrowserRouter>
  );
}