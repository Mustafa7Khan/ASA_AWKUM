import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function FeedbackPage() {
  const [form, setForm] = useState({ email: '', feedback: '' });
  const [status, setStatus] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    try {
      await api('/api/feedback', { method: 'POST', body: JSON.stringify(form) });
      setStatus('Thank you! Your feedback has been submitted.');
      setForm({ email: '', feedback: '' });
    } catch {
      setStatus('Unable to submit feedback right now.');
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionTitle title="Give Feedback" subtitle="Share suggestions with the union" />
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <textarea
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="Write your feedback"
          value={form.feedback}
          onChange={(e) => setForm((prev) => ({ ...prev, feedback: e.target.value }))}
          required
          rows={4}
        />
        <button className="rounded bg-brand-700 px-4 py-2 text-white hover:bg-brand-900" type="submit">
          Submit
        </button>
      </form>
      {status ? <p className="mt-3 text-sm text-slate-600">{status}</p> : null}
    </div>
  );
}
