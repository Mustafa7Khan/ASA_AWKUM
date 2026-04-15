import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function AdminLoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify(form) });
      onLogin(data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionTitle title="Admin Login" subtitle="Login to manage website content" />
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          type="email"
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="Admin email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        />
        <input
          required
          type="password"
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
        />
        <button type="submit" className="rounded bg-brand-700 px-4 py-2 text-white hover:bg-brand-900">
          Login
        </button>
      </form>
      {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}
