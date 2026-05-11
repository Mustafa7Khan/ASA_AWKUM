import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function AdminLoginPage({ onLogin }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: form
      });
      console.log("Login attempt for:", form.email);
      onLogin(data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">

      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl p-8">

        <SectionTitle
          title="Admin Login"
          subtitle="Access the Union Content Management System"
          center
        />

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Email */}
          <div>
            <input
              required
              type="email"
              placeholder="Admin email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          {/* Password */}
          <div>
            <input
              required
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-rose-600 bg-rose-50 p-2 rounded-md">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-700 px-4 py-2 text-white font-semibold hover:bg-brand-900 transition disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

    </div>
  );
}