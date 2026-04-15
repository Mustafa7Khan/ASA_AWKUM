export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      {subtitle ? <p className="mt-1 text-slate-600">{subtitle}</p> : null}
    </div>
  );
}
