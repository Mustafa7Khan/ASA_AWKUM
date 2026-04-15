import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function StrugglesPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api('/api/milestones').then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <SectionTitle title="Struggles & Milestones" subtitle="Important events of the union movement" />
      <ol className="space-y-3 border-l-4 border-brand-700 pl-4">
        {items.map((item) => (
          <li key={item._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <strong className="text-brand-900">{item.year}</strong>
            <p className="mt-1 text-slate-700">{item.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
