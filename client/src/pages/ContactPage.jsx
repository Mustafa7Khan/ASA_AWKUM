import SectionTitle from '../components/SectionTitle';

export default function ContactPage() {
  return (
    <div className="space-y-6">

      <SectionTitle
        title="Contact Us"
        subtitle="Reach out to the Teachers' Union for queries, support, or collaboration."
      />

      {/* Contact Cards */}
      <div className="grid md:grid-cols-3 gap-4">

        {/* Email */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-slate-900">Email</h3>
          <a
            href="mailto:teachersunion@university.edu"
            className="mt-2 block text-brand-700 hover:underline"
          >
            teachersunion@university.edu
          </a>
          <p className="text-sm text-slate-500 mt-2">
            We usually respond within 24–48 hours.
          </p>
        </div>

        {/* Phone */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-slate-900">Phone</h3>
          <p className="mt-2 text-slate-700">+1 000 000 0000</p>
          <p className="text-sm text-slate-500 mt-2">
            Available during office hours.
          </p>
        </div>

        {/* Office */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-slate-900">Office</h3>
          <p className="mt-2 text-slate-700">
            Admin Building, Room 204
          </p>
          <p className="text-sm text-slate-500 mt-2">
            University campus location.
          </p>
        </div>

      </div>

      {/* Footer Note */}
      <div className="rounded-2xl bg-gradient-to-r from-brand-950 to-brand-700 text-white p-6">
        <h4 className="font-semibold">Need urgent support?</h4>
        <p className="text-white/80 text-sm mt-1">
          Contact union representatives directly through official channels for faster response.
        </p>
      </div>

    </div>
  );
}