import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';

import NewsPage from './NewsPage';
import CurrentCabinetPage from './CurrentCabinetPage';
import PreviousCabinetsPage from './PreviousCabinetsPage';
import StrugglesPage from './StrugglesPage';
import FeedbackPage from './FeedbackPage';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">
          Teachers' Union Portal
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
          Protecting teacher dignity, rights, and academic progress through collective leadership.
        </p>
      </section>

      {/* News Section */}
      <section className="bg-white shadow-md rounded-2xl p-6">
        <SectionTitle title="Latest News" />
        <NewsPage limit={3} />
        <div className="mt-4 text-right">
          <Link
            to="/news"
            className="inline-block px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
          >
            See All News →
          </Link>
        </div>
      </section>

      {/* Cabinet Sections (Responsive Grid) */}
      <section className="grid md:grid-cols-2 gap-6">
        
        <div className="bg-white shadow-md rounded-2xl p-6">
          <SectionTitle title="Current Cabinet" />
          <CurrentCabinetPage />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <SectionTitle title="Previous Cabinets" />
          <PreviousCabinetsPage />
        </div>

      </section>

      {/* Struggles Section */}
      <section className="bg-white shadow-md rounded-2xl p-6">
        <SectionTitle title="Struggles & Milestones" />
        <StrugglesPage limit={3} />
        <div className="mt-4 text-right">
          <Link
            to="/struggles"
            className="inline-block px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
          >
            Explore More →
          </Link>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="bg-white shadow-md rounded-2xl p-6">
        <SectionTitle title="Your Voice Matters" />
        <FeedbackPage />
      </section>

      {/* Mission Section */}
      <section className="rounded-2xl bg-brand-900 p-8 text-white text-center sm:text-left">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold">Our Commitment</h2>
          <p className="mt-4 text-slate-200 leading-relaxed">
            The University Teachers' Union stands as a bulwark for academic freedom. 
            We ensure that the voices of educators are heard in every decision-making 
            process, fostering an environment where both teachers and students thrive.
          </p>
        </div>
      </section>

    </div>
  );
}