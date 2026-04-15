import SectionTitle from '../components/SectionTitle';

export default function ContactPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <SectionTitle title="Contact" />
      <div className="space-y-2 text-slate-700">
        <p><strong>Email:</strong> teachersunion@university.edu</p>
        <p><strong>Phone:</strong> +1 000 000 0000</p>
        <p><strong>Office:</strong> Admin Building, Room 204</p>
      </div>
    </div>
  );
}
