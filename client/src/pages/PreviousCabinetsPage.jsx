import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function PreviousCabinetsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/previous-cabinets')
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">

      <SectionTitle
        title="Previous Cabinets"
        subtitle="Historical record of elected leadership and union governance"
      />

      {/* Loading */}
      {loading && (
        <p className="text-sm text-slate-500">Loading archives...</p>
      )}

      {/* Empty */}
      {!loading && items.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
          No previous cabinets found.
        </div>
      )}

      {/* Timeline */}
      <div className="relative border-l-2 border-slate-200 pl-6 space-y-6">

        {items.map((cabinet) => (
          <div key={cabinet._id} className="relative">

            {/* Dot */}
            <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-brand-600 border-4 border-white shadow" />

            {/* Cabinet Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">

              {/* Year Header */}
              <h2 className="text-lg font-bold text-slate-900">
                {cabinet.year}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Cabinet Members: {cabinet.members?.length || 0}
              </p>

              {/* Members Grid */}
              <div className="mt-4 grid gap-3 md:grid-cols-2">

                {cabinet.members.map((member, idx) => (
                  <div
                    key={`${cabinet._id}-${idx}`}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 hover:bg-slate-100 transition"
                  >
                    <h3 className="font-semibold text-slate-900">
                      {member.name}
                    </h3>

                    <p className="text-sm text-brand-700 font-medium">
                      {member.designation}
                    </p>

                    <p className="text-sm text-slate-600">
                      {member.department}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}