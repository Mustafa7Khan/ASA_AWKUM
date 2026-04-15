
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import CurrentCabinetPage from './pages/CurrentCabinetPage';
import PreviousCabinetsPage from './pages/PreviousCabinetsPage';
import StrugglesPage from './pages/StrugglesPage';
import FeedbackPage from './pages/FeedbackPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/current-cabinet" element={<CurrentCabinetPage />} />
          <Route path="/previous-cabinets" element={<PreviousCabinetsPage />} />
          <Route path="/struggles" element={<StrugglesPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>

import { useEffect, useState } from 'react';
import SectionTitle from './components/SectionTitle';

export default function App() {
  const [data, setData] = useState({
    news: [],
    currentCabinet: [],
    previousCabinets: [],
    struggles: [],
  });

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((payload) => setData(payload))
      .catch(() => {
        // Keep empty fallback state if API is unavailable
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-gradient-to-r from-brand-900 to-brand-600 text-white">
        <div className="mx-auto w-[92%] max-w-6xl py-12">
          <h1 className="text-3xl font-bold md:text-4xl">University Teachers' Union</h1>
          <p className="mt-3 max-w-2xl text-slate-100">
            Protecting teacher dignity, rights, and academic progress.
          </p>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-6xl py-8">
        <section className="mb-10">
          <SectionTitle title="Latest News" subtitle="Announcements and election updates" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.news.map((item) => (
              <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" key={item._id ?? item.title}>
                <p className="text-sm text-slate-500">{item.date}</p>
                <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-slate-700">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionTitle title="Current Cabinet" subtitle="Elected representatives" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.currentCabinet.map((member) => (
              <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" key={member._id ?? member.name}>
                <img className="h-52 w-full rounded-lg object-cover" src={member.image} alt={member.name} />
                <h3 className="mt-3 text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-slate-500">{member.designation}</p>
                <p className="mt-1 text-slate-700">{member.department}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionTitle title="Previous Cabinets" subtitle="Leadership archive" />
          <div className="mt-4 space-y-3">
            {data.previousCabinets.map((cabinet) => (
              <details key={cabinet._id ?? cabinet.year} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <summary className="cursor-pointer text-lg font-semibold text-brand-900">{cabinet.year} Cabinet</summary>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cabinet.members.map((member) => (
                    <article className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={member.name}>
                      <h3 className="text-base font-semibold">{member.name}</h3>
                      <p className="text-sm text-slate-500">{member.designation}</p>
                      <p className="mt-1 text-slate-700">{member.department}</p>
                    </article>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="History of Struggle" subtitle="Important milestones" />
          <ol className="mt-4 space-y-3 border-l-4 border-brand-700 pl-4">
            {data.struggles.map((item) => (
              <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" key={item._id ?? item.year}>
                <strong className="text-brand-900">{item.year}</strong>
                <p className="mt-1 text-slate-700">{item.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>

  );
}
