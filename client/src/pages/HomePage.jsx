import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';

const shortcuts = [
  ['News', '/news'],
  ['Current Cabinet', '/current-cabinet'],
  ['Previous Cabinets', '/previous-cabinets'],
  ['Struggles & Milestones', '/struggles'],
  ['Give Feedback', '/feedback'],
];

export default function HomePage() {
  return (
    <div>
      <SectionTitle
        title="Welcome to Teachers' Union Portal"
        subtitle="Browse union updates, leadership information, struggle history, and share your feedback."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shortcuts.map(([label, path]) => (
          <Link key={path} to={path} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-600">
            <h3 className="text-lg font-semibold">{label}</h3>
            <p className="mt-1 text-sm text-slate-600">Open {label.toLowerCase()} page</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
