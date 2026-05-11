import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function StrugglesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/milestones')
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">

      <SectionTitle
        title="Struggles & Milestones"
        subtitle="Key events that shaped the union’s journey and academic rights movement"
      />

      {/* Loading */}
      {loading && (
        <p className="text-sm text-slate-500">Loading timeline...</p>
      )}

      {/* Empty */}
      {!loading && items.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
          No milestones recorded yet.
        </div>
      )}

      {/* Timeline */}
      <div className="relative border-l-2 border-slate-200 pl-6 space-y-6">

        {items.map((item, index) => (
          <div key={item._id} className="relative">

            {/* Timeline Dot */}
            <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-brand-700 border-4 border-white shadow" />

            {/* Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">

              {/* Year Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-block rounded-full bg-brand-100 text-brand-800 px-3 py-1 text-xs font-semibold">
                  {item.year}
                </span>

                {index === 0 && (
                  <span className="text-xs text-emerald-600 font-medium">
                    Latest milestone
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-3 text-slate-700 leading-relaxed">
                {item.text}
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}