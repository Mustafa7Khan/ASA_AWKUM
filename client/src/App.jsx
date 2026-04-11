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
    <div>
      <header className="hero">
        <div className="container">
          <h1>University Teachers' Union</h1>
          <p>Protecting teacher dignity, rights, and academic progress.</p>
        </div>
      </header>

      <main className="container">
        <section>
          <SectionTitle title="Latest News" subtitle="Announcements and election updates" />
          <div className="grid">
            {data.news.map((item) => (
              <article className="card" key={item._id ?? item.title}>
                <p className="muted">{item.date}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Current Cabinet" subtitle="Elected representatives" />
          <div className="grid">
            {data.currentCabinet.map((member) => (
              <article className="card" key={member._id ?? member.name}>
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p className="muted">{member.designation}</p>
                <p>{member.department}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Previous Cabinets" subtitle="Leadership archive" />
          {data.previousCabinets.map((cabinet) => (
            <details key={cabinet._id ?? cabinet.year} className="accordion-item">
              <summary>{cabinet.year} Cabinet</summary>
              <div className="grid">
                {cabinet.members.map((member) => (
                  <article className="card" key={member.name}>
                    <h3>{member.name}</h3>
                    <p className="muted">{member.designation}</p>
                    <p>{member.department}</p>
                  </article>
                ))}
              </div>
            </details>
          ))}
        </section>

        <section>
          <SectionTitle title="History of Struggle" subtitle="Important milestones" />
          <ol className="timeline">
            {data.struggles.map((item) => (
              <li key={item._id ?? item.year}>
                <strong>{item.year}</strong>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
