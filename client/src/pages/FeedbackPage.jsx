import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function FeedbackPage() {
  const [form, setForm] = useState({ email: '', feedback: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      await api('/feedback', {
        method: 'POST',
        body: form
      });

      setStatus('success');
      setForm({ email: '', feedback: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <SectionTitle
        title="Give Feedback"
        subtitle="Your voice helps improve transparency, governance, and academic welfare"
      />

      {/* Info Card */}
      <div className="rounded-2xl bg-brand-50 border border-brand-200 p-4 text-sm text-brand-900">
        Feedback is reviewed by the union committee and helps shape decisions,
        policies, and future initiatives.
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <form onSubmit={onSubmit} className="space-y-4">

          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Your Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((p) => ({ ...p, email: e.target.value }))
            }
            required
          />

          <textarea
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Write your feedback..."
            rows={5}
            value={form.feedback}
            onChange={(e) =>
              setForm((p) => ({ ...p, feedback: e.target.value }))
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-700 px-4 py-2 text-white font-semibold hover:bg-brand-900 transition disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>

          {/* Status */}
          {status === 'success' && (
            <p className="text-sm text-green-600 bg-green-50 p-2 rounded">
              Thank you! Your feedback has been submitted.
            </p>
          )}

          {status === 'error' && (
            <p className="text-sm text-rose-600 bg-rose-50 p-2 rounded">
              Unable to submit feedback right now. Please try again.
            </p>
          )}

        </form>
      </div>
    </div>
  );
}