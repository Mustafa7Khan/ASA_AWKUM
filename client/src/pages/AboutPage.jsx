import SectionTitle from '../components/SectionTitle';

export default function AboutPage() {
  return (
    <div className="space-y-8">

      {/* Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <SectionTitle
          title="About the Union"
          subtitle="Building academic strength through unity, fairness, and representation."
        />

        <p className="text-slate-700 leading-relaxed mt-4">
          The University Teachers' Union is dedicated to protecting teacher dignity,
          ensuring fair policies, supporting academic research, and strengthening
          institutional governance through collective action and democratic representation.
        </p>
      </div>

      {/* Mission / Vision Grid */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Mission */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-slate-900">Our Mission</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            To safeguard teachers’ rights, improve working conditions, and ensure
            transparent decision-making within the university system.
          </p>
        </div>

        {/* Vision */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-slate-900">Our Vision</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A progressive academic environment where educators are respected,
            empowered, and actively involved in shaping the future of education.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="rounded-2xl bg-gradient-to-r from-brand-950 to-brand-700 text-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold">Core Values</h3>

        <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-white/90 text-sm">
          <li>• Academic Freedom</li>
          <li>• Transparency</li>
          <li>• Fair Representation</li>
          <li>• Professional Integrity</li>
          <li>• Unity among Faculty</li>
          <li>• Student Welfare Balance</li>
        </ul>
      </div>

    </div>
  );
}