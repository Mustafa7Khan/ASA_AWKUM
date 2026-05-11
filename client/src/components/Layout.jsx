import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  ['/', 'Home'],
  ['/struggles', 'Struggles'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
];

export default function Layout({ children, isAuthenticated, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-blue-800 text-white shadow-lg">

        <div className="mx-auto w-[92%] max-w-6xl py-4 flex items-center justify-between">

          {/* Logo */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">
              ASA AWKUM
            </h1>
            <p className="text-xs text-white/70 hidden sm:block">
              Voice of teachers and academic rights
            </p>
          </div>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden md:flex items-center gap-2 relative">

            {navItems.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative px-3 py-1.5 rounded-md text-sm font-medium transition
                  ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}

                    {/* 🔥 Active Indicator Bar */}
                    {isActive && (
                      <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Admin (Role-based) */}
            {isAuthenticated && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `relative px-3 py-1.5 rounded-md text-sm font-medium transition
                  ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`
                }
              >
                {({ isActive }) => (
                  <>
                    Admin
                    {isActive && (
                      <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-white rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>
            )}

            {/* Auth Button */}
            <div className="ml-3 pl-3 border-l border-white/20">
              {isAuthenticated ? (
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 rounded-md text-sm font-semibold bg-red-500 hover:bg-red-600 transition"
                >
                  Sign Out
                </button>
              ) : (
                <NavLink
                  to="/admin-login"
                  className="px-3 py-1.5 rounded-md text-sm font-semibold bg-white text-brand-900 hover:bg-slate-100 transition"
                >
                  Login
                </NavLink>
              )}
            </div>
          </nav>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="md:hidden bg-brand-950/95 border-t border-white/10">
            <div className="flex flex-col px-4 py-3 gap-2">

              {navItems.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm transition
                    ${isActive ? 'bg-white text-brand-900' : 'text-white/80 hover:bg-white/10'}`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* Admin mobile */}
              {isAuthenticated && (
                <NavLink
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-md text-sm text-white/80 hover:bg-white/10"
                >
                  Admin
                </NavLink>
              )}

              {/* Auth */}
              {isAuthenticated ? (
                <button
                  onClick={onLogout}
                  className="px-3 py-2 mt-2 rounded-md bg-red-500 text-white text-sm"
                >
                  Sign Out
                </button>
              ) : (
                <NavLink
                  to="/admin-login"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 mt-2 rounded-md bg-white text-brand-900 text-sm font-semibold"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 mx-auto w-[92%] max-w-6xl py-10">
        {children}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t bg-white">
        <div className="mx-auto w-[92%] max-w-6xl py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} ASA AWKUM</p>

          <div className="flex gap-4">
            <a className="hover:text-brand-700">Facebook</a>
            <a className="hover:text-brand-700">Twitter</a>
            <a className="hover:text-brand-700">LinkedIn</a>
          </div>
        </div>
      </footer>

    </div>
  );
}