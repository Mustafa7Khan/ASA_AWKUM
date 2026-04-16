import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';

const shortcuts = [
  { label: 'News', path: '/news', desc: 'Read the latest union announcements.' },
  { label: 'Current Cabinet', path: '/current-cabinet', desc: 'Meet your elected representatives.' },
  { label: 'Previous Cabinets', path: '/previous-cabinets', desc: 'View our leadership archive.' },
  { label: 'Struggles & Milestones', path: '/struggles', desc: 'Explore the history of our union.' },
  { label: 'Give Feedback', path: '/feedback', desc: 'Share your suggestions with us.' },
  { label: 'About Us', path: '/about', desc: 'Learn about our mission and vision.' },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section>
        <SectionTitle
          title="Welcome to the Teachers' Union Portal"
          subtitle="Protecting teacher dignity, rights, and academic progress through collective leadership."
        />
        
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-brand-600 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold group-hover:text-brand-700">{item.label}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              <div className="mt-3 text-xs font-bold uppercase tracking-wider text-brand-600">
                View Page &rarr;
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Mission Statement */}
      <section className="rounded-2xl bg-brand-900 p-8 text-white">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold">Our Commitment</h2>
          <p className="mt-4 text-slate-100 leading-relaxed">
            The University Teachers' Union stands as a bulwark for academic freedom. 
            We ensure that the voices of educators are heard in every decision-making 
            process, fostering an environment where both teachers and students thrive.
          </p>
        </div>
      </section>
    </div>
  );
}