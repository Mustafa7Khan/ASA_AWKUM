import SectionTitle from '../components/SectionTitle';

export default function AboutPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionTitle title="About the Union" />
      <p className="text-slate-700">
        The University Teachers' Union works to protect teacher dignity, secure fair policy,
        support research and welfare, and strengthen academic excellence through collective action.
      </p>
    </div>
  );
}
