import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function CurrentCabinetPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api('/api/current-cabinet').then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <SectionTitle title="Current Cabinet" subtitle="Current elected leadership" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <img src={item.image || 'https://placehold.co/600x600?text=Member'} alt={item.name} className="h-52 w-full rounded-lg object-cover" />
            <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-slate-500">{item.designation}</p>
            <p className="text-slate-700">{item.department}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
