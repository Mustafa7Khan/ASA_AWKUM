import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';
import FeedbackPage from './FeedbackPage'; 

const ASSET_URL = "http://localhost:5000";

export default function HomePage() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [currentCabinet, setCurrentCabinet] = useState(null);
  const [members, setMembers] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [prevCabinets, setPrevCabinets] = useState([]);
  const [expandedYear, setExpandedYear] = useState(null);
  const [yearMembers, setYearMembers] = useState({});

  useEffect(() => {
    api('/news?limit=3').then(setNews);
    api('/milestones?limit=3').then(setMilestones);

    const fetchCabinet = async () => {
      try {
        const data = await api('/cabinet-members/current');
        setCurrentCabinet(data.cabinet);
        setMembers(data.members || []);
      } catch (err) {
        console.warn("Dashboard Notice: No active cabinet is set.");
      }
    };
    fetchCabinet();
    api('/cabinets/previous').then(setPrevCabinets);
  }, []);

  const handleExpandYear = async (year) => {
    if (expandedYear === year) {
      setExpandedYear(null);
      return;
    }
    setExpandedYear(year);
    if (!yearMembers[year]) {
      const data = await api(`/cabinet-members/year/${year}`);
      setYearMembers(prev => ({ ...prev, [year]: data.members }));
    }
  };

  return (
    <div className="space-y-16 pb-20 px-4 md:px-0 bg-[#f8fafc]">
      
      {/* HERO SECTION - Deep Midnight Gradient */}
      <section className="relative overflow-hidden text-center py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[3rem] shadow-2xl border-b-4 border-emerald-500">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-500 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Academic Staff <span className="text-emerald-400">Union</span> Portal
          </h1>
          <p className="mt-8 text-lg md:text-xl text-indigo-100/70 max-w-3xl mx-auto leading-relaxed font-medium">
            Advancing the frontiers of education and protecting the legacy of our educators since <span className="text-emerald-400 font-bold">{milestones[0]?.year || 'inception'}</span>.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
             <button onClick={() => navigate('/current-cabinet')} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-2xl font-black transition-all shadow-lg shadow-emerald-500/20 active:scale-95 text-sm uppercase tracking-widest">Executive Council</button>
             <button onClick={() => navigate('/news')} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md rounded-2xl font-black transition-all text-sm uppercase tracking-widest">Latest Bulletin</button>
          </div>
        </div>
      </section>

      {/* THREE COLUMN GRID (News, Leadership, Milestones) */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Latest Updates */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col group">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
             <SectionTitle title="Latest Updates" />
          </div>
          <div className="space-y-6 flex-grow">
            {news.map(item => (
              <div key={item._id} className="cursor-pointer group/item p-4 rounded-2xl hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100" onClick={() => navigate(`/news/${item._id}`)}>
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">{new Date(item.createdAt).toLocaleDateString()}</span>
                <h3 className="font-bold text-slate-800 group-hover/item:text-indigo-700 transition line-clamp-2 mt-1 leading-snug">{item.title}</h3>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/news')} className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition shadow-lg shadow-slate-200">View Archive</button>
        </div>

        {/* Current Leadership */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col ring-4 ring-indigo-50/50">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
             <SectionTitle title="Current Leadership" />
          </div>
          <div className="space-y-4 flex-grow">
            {members.map(m => (
              <div key={m._id} onClick={() => navigate(`/member/${m._id}`)} className="flex items-center gap-5 p-4 bg-slate-50 hover:bg-emerald-50 rounded-[1.5rem] cursor-pointer border border-slate-100 hover:border-emerald-200 transition-all group">
                <img src={`${ASSET_URL}${m.image}`} className="w-14 h-14 rounded-xl object-cover shadow-md group-hover:scale-110 transition-transform" alt="" onError={(e) => { e.target.src = 'https://placehold.co/150'; }} />
                <div>
                  <h4 className="font-black text-slate-900 text-sm group-hover:text-emerald-700">{m.name}</h4>
                  <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-0.5">{m.designation}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/current-cabinet')} className="mt-8 w-full py-4 bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-800 transition shadow-lg shadow-indigo-200">Full Cabinet</button>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-2 h-8 bg-slate-900 rounded-full"></div>
             <SectionTitle title="Legacy & Wins" />
          </div>
          <div className="space-y-8 flex-grow">
            {milestones.map(m => (
              <div key={m._id} className="relative pl-8 border-l-2 border-indigo-100">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-4 border-indigo-600 rounded-full"></div>
                <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">{m.year}</h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-2">{m.text}</p>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/struggles')} className="mt-8 w-full py-4 border-2 border-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition">Read Our History</button>
        </div>
      </div>

      {/* HISTORICAL CABINETS SECTION - Elevated Accordion */}
      <section className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-xl">
        <div className="mb-10 text-center">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-2 block">Archives</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Historical Cabinets</h2>
          <p className="text-slate-500 mt-2 font-medium">Chronicles of leadership across the decades</p>
        </div>
        
        <div className="grid gap-4 max-w-5xl mx-auto">
          {prevCabinets.map(cab => (
            <div key={cab._id} className={`rounded-3xl border transition-all duration-500 ${expandedYear === cab.year ? 'border-indigo-200 bg-indigo-50/30' : 'border-slate-100 bg-slate-50 hover:border-indigo-100'}`}>
              <button onClick={() => handleExpandYear(cab.year)} className="w-full flex justify-between items-center p-6 transition">
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${expandedYear === cab.year ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>
                      {String(cab.year).split('-')[0].slice(-2)}
                   </div>
                   <span className="text-lg font-black text-slate-800">Executive Council {cab.year}</span>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${expandedYear === cab.year ? 'bg-indigo-100 text-indigo-600 rotate-45' : 'bg-slate-200 text-slate-500'}`}>
                   <span className="text-2xl font-light">+</span>
                </div>
              </button>

              {expandedYear === cab.year && (
                <div className="p-8 border-t border-indigo-100 bg-white/50 backdrop-blur-sm animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {yearMembers[cab.year]?.map(mem => (
                      <div key={mem._id} onClick={() => navigate(`/member/${mem._id}`)} className="bg-white p-5 rounded-[2rem] border border-slate-100 text-center cursor-pointer hover:shadow-xl hover:border-emerald-200 transition-all group">
                        <div className="relative inline-block mb-4">
                           <img src={mem.image ? `${ASSET_URL}${mem.image}` : 'https://placehold.co/150'} className="w-20 h-20 rounded-2xl mx-auto object-cover group-hover:scale-105 transition duration-500 shadow-lg" alt="" />
                           <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5"></div>
                        </div>
                        <h5 className="font-black text-slate-800 text-sm">{mem.name}</h5>
                        <p className="text-[10px] text-indigo-600 font-black uppercase tracking-tighter mt-1">{mem.designation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FEEDBACK SECTION */}
      <section className="max-w-5xl mx-auto pt-10">
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-[3rem] p-1 border border-indigo-100 shadow-inner">
             <FeedbackPage />
          </div>
      </section>
      
    </div>
  );
}

// Add these styles to your index.css or a global style file
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.4s ease forwards;
}
*/