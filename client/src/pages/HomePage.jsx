import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function HomePage() {
  const [content, setContent] = useState({ news: [], currentCabinet: [], previousCabinets: [], milestones: [] });
  const [feedbackForm, setFeedbackForm] = useState({ email: '', feedback: '' });
  const [feedbackStatus, setFeedbackStatus] = useState('');

  useEffect(() => {
    api('/api/public/overview').then(setContent).catch(() => {});
  }, []);

  async function submitFeedback(event) {
    event.preventDefault();
    try {
      await api('/api/feedback', { method: 'POST', body: JSON.stringify(feedbackForm) });
      setFeedbackForm({ email: '', feedback: '' });
      setFeedbackStatus('Feedback submitted successfully.');
    } catch {
      setFeedbackStatus('Unable to submit feedback right now.');
    }
  }

  return (
    <div className="space-y-10">
      <section>
        <SectionTitle title="Latest News" subtitle="Announcements and updates" />
        <div className="grid gap-4 md:grid-cols-2">
          {content.news.map((item) => (
            <article key={item._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">{item.date}</p>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-slate-700">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Current Cabinet" subtitle="Current elected team" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.currentCabinet.map((member) => (
            <article key={member._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <img src={member.image || 'https://placehold.co/600x600?text=Member'} alt={member.name} className="h-52 w-full rounded-lg object-cover" />
              <h3 className="mt-2 font-semibold">{member.name}</h3>
              <p className="text-sm text-slate-500">{member.designation}</p>
              <p className="text-slate-700">{member.department}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Previous Cabinets" subtitle="Leadership archive" />
        <div className="space-y-3">
          {content.previousCabinets.map((cabinet) => (
            <details key={cabinet._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold">{cabinet.year}</summary>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {cabinet.members.map((member, idx) => (
                  <article key={`${cabinet._id}-${idx}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-slate-500">{member.designation}</p>
                    <p className="text-slate-700">{member.department}</p>
                  </article>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Struggles & Milestones" subtitle="Historical milestones of the union" />
        <ol className="space-y-3 border-l-4 border-brand-700 pl-4">
          {content.milestones.map((milestone) => (
            <li key={milestone._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <strong className="text-brand-900">{milestone.year}</strong>
              <p className="mt-1 text-slate-700">{milestone.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionTitle title="Give Feedback" subtitle="Share suggestions with union leadership" />
        <form onSubmit={submitFeedback} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full rounded border border-slate-300 px-3 py-2"
            value={feedbackForm.email}
            onChange={(e) => setFeedbackForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <textarea
            required
            rows={4}
            placeholder="Your feedback"
            className="w-full rounded border border-slate-300 px-3 py-2"
            value={feedbackForm.feedback}
            onChange={(e) => setFeedbackForm((prev) => ({ ...prev, feedback: e.target.value }))}
          />
          <button className="rounded bg-brand-700 px-4 py-2 text-white hover:bg-brand-900" type="submit">
            Submit Feedback
          </button>
        </form>
        {feedbackStatus ? <p className="mt-3 text-sm text-slate-600">{feedbackStatus}</p> : null}
      </section>
    </div>
  );
}
