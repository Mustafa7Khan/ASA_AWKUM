import { NavLink } from 'react-router-dom';

const navItems = [
  ['/', 'Home'],
  ['/news', 'News'],
  ['/current-cabinet', 'Current Cabinet'],
  ['/previous-cabinets', 'Previous Cabinets'],
  ['/struggles', 'Struggles'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
  ['/feedback', 'Feedback'],
  ['/admin', 'Admin'],
];

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-gradient-to-r from-brand-900 to-brand-600 text-white">
        <div className="mx-auto flex w-[92%] max-w-6xl flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">University Teachers' Union</h1>
            <p className="text-sm text-slate-100">Voice of teachers and academic rights.</p>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navItems.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded px-3 py-1 text-sm ${isActive ? 'bg-white text-brand-900' : 'bg-white/10 hover:bg-white/20'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-6xl py-8">{children}</main>

      <footer className="mt-10 border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-[92%] max-w-6xl flex-col gap-3 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} University Teachers' Union</p>
          <div className="flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-brand-700">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-brand-700">X/Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-brand-700">LinkedIn</a>
            <a href="mailto:teachersunion@university.edu" className="hover:text-brand-700">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
