export default function SectionTitle({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-slate-600">{subtitle}</p>
    </div>
  );
}
