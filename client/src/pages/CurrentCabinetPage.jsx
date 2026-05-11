import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

export default function CurrentCabinetPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/current-cabinets/current')
      .then((data) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">

      <SectionTitle
        title="Current Cabinet"
        subtitle="Elected leadership responsible for representing teachers' rights and academic welfare"
      />

      {/* Loading State */}
      {loading && (
        <p className="text-sm text-slate-500">Loading cabinet members...</p>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
          No cabinet members found.
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {items.map((item) => (
          <article
            key={item._id}
            className="group rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={item.image || 'https://placehold.co/600x600?text=Member'}
                alt={item.name}
                className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4">

              <h3 className="text-lg font-bold text-slate-900">
                {item.name}
              </h3>

              <p className="text-brand-700 font-medium text-sm mt-1">
                {item.designation}
              </p>

              <p className="text-slate-600 text-sm mt-1">
                {item.department}
              </p>

            </div>
          </article>
        ))}
      </div>
    </div>
  );
}