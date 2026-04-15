import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function NewsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api('/api/news').then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <div>
      <SectionTitle title="News" subtitle="Latest announcements and updates" />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{item.date}</p>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-1 text-slate-700">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
