export default function SectionTitle({ title, subtitle, center = false }) {
  return (
    <div className={`mb-6 ${center ? 'text-center' : ''}`}>

      {/* Title Row */}
      <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        
        {/* Accent Line */}
        <span className="h-6 w-1 bg-brand-600 rounded-full"></span>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          {title}
        </h2>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className={`mt-2 text-slate-600 leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}