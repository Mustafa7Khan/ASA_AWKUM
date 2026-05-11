import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function NewsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/news')
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">

      <SectionTitle
        title="News & Announcements"
        subtitle="Official updates, decisions, and union communications"
      />

      {/* Loading */}
      {loading && (
        <p className="text-sm text-slate-500">Loading news...</p>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
          No announcements available.
        </div>
      )}

      {/* News Grid */}
      <div className="grid gap-5 md:grid-cols-2">

        {items.map((item, index) => (
          <article
            key={item._id}
            className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition
              ${index === 0 ? 'md:col-span-2 border-brand-200 bg-brand-50' : ''}
            `}
          >

            {/* Date */}
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              {item.date}
            </p>

            {/* Title */}
            <h3 className={`mt-1 font-bold text-slate-900 ${
              index === 0 ? 'text-2xl' : 'text-lg'
            }`}>
              {item.title}
            </h3>

            {/* Body */}
            <p className="mt-2 text-slate-700 leading-relaxed line-clamp-4">
              {item.body}
            </p>

            {/* Read more indicator (UI only) */}
            <div className="mt-3 text-sm text-brand-700 font-medium">
              Read more →
            </div>

          </article>
        ))}
      </div>
    </div>
  );
}