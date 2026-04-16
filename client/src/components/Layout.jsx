import { NavLink } from 'react-router-dom';

const navItems = [
  ['/', 'Home'],
  ['/struggles', 'Struggles'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
  ['/admin', 'Admin'],
];

export default function Layout({ children, isAuthenticated, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-gradient-to-r from-brand-900 to-brand-600 text-white">
        <div className="mx-auto flex w-[92%] max-w-6xl flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">ASA AWKUM</h1>
            <p className="text-sm text-slate-100">Voice of teachers and academic rights.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <nav className="flex flex-wrap gap-2">
              {navItems.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `rounded px-3 py-1 text-sm transition-colors ${
                      isActive 
                        ? 'bg-white text-brand-900 shadow' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="ml-2 border-l border-white/20 pl-2">
              {isAuthenticated ? (
                <button 
                  onClick={onLogout} 
                  className="rounded bg-rose-600 px-3 py-1 text-sm font-semibold hover:bg-rose-700 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <NavLink 
                  to="/admin-login" 
                  className="rounded bg-white px-3 py-1 text-sm font-semibold text-brand-900 hover:bg-slate-100 transition-colors"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-6xl py-8">
        {children}
      </main>

      <footer className="mt-10 border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-[92%] max-w-6xl flex-col gap-3 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} ASAAWKUM</p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-brand-700">Facebook </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-brand-700">X/Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-brand-700">LinkedIn</a>
            <a href="mailto:teachersunion@university.edu" className="hover:text-brand-700">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}