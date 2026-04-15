import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function PreviousCabinetsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api('/api/previous-cabinets').then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <SectionTitle title="Previous Cabinets" subtitle="Union leadership archives" />
      <div className="space-y-3">
        {items.map((cabinet) => (
          <details key={cabinet._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <summary className="cursor-pointer font-semibold">{cabinet.year}</summary>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {cabinet.members.map((member, idx) => (
                <article key={`${cabinet._id}-${idx}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-slate-500">{member.designation}</p>
                  <p className="text-slate-700">{member.department}</p>
                </article>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
