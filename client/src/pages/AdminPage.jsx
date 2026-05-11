import { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

const blankNews = { title: '', date: '', body: '' };
const blankCabinet = { year: '' };
const blankMember = { name: '', designation: '', department: '', cabinet: '' };
const blankMilestone = { year: '', text: '' };

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('feedback'); 
  const ASSET_URL = "https://asa-awkum-server.vercel.app";
  
  // Data States
  const [news, setNews] = useState([]);
  const [cabinets, setCabinets] = useState([]);
  const [members, setMembers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [milestones, setMilestones] = useState([]);

  // Form States
  const [newsForm, setNewsForm] = useState(blankNews);
  const [editNewsId, setEditNewsId] = useState(null);
  const [newsFiles, setNewsFiles] = useState({ image: null });
  const [cabinetForm, setCabinetForm] = useState(blankCabinet);
  const [memberForm, setMemberForm] = useState(blankMember);
  const [editMemberId, setEditMemberId] = useState(null);
  const [memberFile, setMemberFile] = useState(null);
  const [milestoneForm, setMilestoneForm] = useState(blankMilestone);
  const [milestoneFile, setMilestoneFile] = useState(null);

  async function loadAll() {
    setLoading(true);
    try {
      const [n, c, mem, f, m] = await Promise.all([
        api('/news'), api('/cabinets'), api('/cabinet-members'), api('/feedback'), api('/milestones')
      ]);
      setNews(n); setCabinets(c); setMembers(mem); setFeedbacks(f); setMilestones(m);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  }

  useEffect(() => { loadAll(); }, []);

  const handleDelete = async (endpoint, id, name) => {
    if (window.confirm(`Are you sure you want to delete this ${name}?`)) {
      await api(`${endpoint}/${id}`, { method: 'DELETE' });
      loadAll();
    }
  };

  async function saveNews(e) {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(newsForm).forEach(k => fd.append(k, newsForm[k]));
    if (newsFiles.image) fd.append('image', newsFiles.image);
    const url = editNewsId ? `/news/${editNewsId}` : '/news';
    await api(url, { method: editNewsId ? 'PUT' : 'POST', body: fd });
    setNewsForm(blankNews); setEditNewsId(null); setNewsFiles({image:null});
    loadAll();
  }

  async function saveMember(e) {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(memberForm).forEach(k => fd.append(k, memberForm[k]));
    if (memberFile) fd.append('image', memberFile);
    const url = editMemberId ? `/cabinet-members/${editMemberId}` : '/cabinet-members';
    await api(url, { method: editMemberId ? 'PUT' : 'POST', body: fd });
    setMemberForm(blankMember); setEditMemberId(null); setMemberFile(null);
    loadAll();
  }

  async function saveCabinet(e) {
    e.preventDefault();
    await api('/cabinets', { method: 'POST', body: cabinetForm });
    setCabinetForm(blankCabinet); loadAll();
  }

  async function saveMilestone(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append('year', milestoneForm.year);
    fd.append('text', milestoneForm.text);
    if (milestoneFile) fd.append('image', milestoneFile);
    await api('/milestones', { method: 'POST', body: fd });
    setMilestoneForm(blankMilestone); setMilestoneFile(null); loadAll();
  }

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-emerald-400">
      <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-black tracking-[0.3em] uppercase text-xs">Accessing Encrypted Core...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-20 p-4 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-[2rem] p-10 shadow-2xl border-b-4 border-emerald-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
               <h1 className="text-4xl font-black text-white tracking-tighter">ASA <span className="text-emerald-400">COMMAND</span> CENTER</h1>
               <p className="text-indigo-200 text-sm font-bold mt-2 tracking-widest uppercase opacity-80">Full Authority Administrative Portal</p>
            </div>
            <button onClick={loadAll} className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-3 rounded-2xl font-black text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95">SYNCHRONIZE DATABASE</button>
          </div>
        </div>

        {/* 1. CABINET DIRECTORY */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden ring-1 ring-black/5">
          <div className="bg-slate-900 text-white p-8 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-black uppercase tracking-widest">Cabinet Personnel</h3>
            </div>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-4 py-1.5 rounded-full font-black">MERN STACK SECURE</span>
          </div>
          
          <div className="p-8">
            <form onSubmit={saveMember} className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-indigo-50/50 p-6 rounded-[2rem] mb-12 border border-indigo-100 shadow-inner">
              <input className="bg-white rounded-xl px-5 py-3 text-sm font-bold shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-300" placeholder="Full Name" value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} required />
              <select className="bg-white rounded-xl px-5 py-3 text-sm font-bold shadow-sm outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500" value={memberForm.cabinet} onChange={e => setMemberForm({...memberForm, cabinet: e.target.value})} required>
                <option value="">Select Year</option>
                {cabinets.map(c => <option key={c._id} value={c._id}>{c.year}</option>)}
              </select>
              <input className="bg-white rounded-xl px-5 py-3 text-sm font-bold shadow-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Designation" value={memberForm.designation} onChange={e => setMemberForm({...memberForm, designation: e.target.value})} />
              <div className="bg-white rounded-xl px-4 py-2 shadow-sm flex flex-col justify-center border border-indigo-50">
                <span className="text-[8px] font-black text-indigo-400 uppercase mb-1">Avatar Upload</span>
                <input type="file" className="text-[9px] font-bold" onChange={e => setMemberFile(e.target.files[0])} />
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-xs transition-all shadow-lg shadow-indigo-200">
                {editMemberId ? 'COMMIT CHANGES' : 'DEPLOY MEMBER'}
              </button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {members.map(m => (
                <div key={m._id} className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-6 text-center hover:shadow-2xl hover:border-indigo-200 hover:-translate-y-2 transition-all duration-500">
                  <div className="relative inline-block">
                    <img src={`${ASSET_URL}${m.image}`} className="w-20 h-20 rounded-[1.5rem] mx-auto object-cover mb-4 shadow-xl ring-4 ring-white group-hover:ring-indigo-50 transition-all" onError={e => e.target.src='https://placehold.co/200'} />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white"></div>
                  </div>
                  <p className="text-xs font-black text-slate-800 truncate mb-1">{m.name}</p>
                  <p className="text-[9px] text-indigo-600 font-black uppercase tracking-tighter">{m.designation}</p>
                  <div className="mt-3 inline-block bg-slate-100 px-3 py-1 rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest">{m.cabinet?.year}</div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/90 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3">
                    <button onClick={() => {setEditMemberId(m._id); setMemberForm({...m, cabinet: m.cabinet?._id})}} className="text-[10px] bg-emerald-500 text-slate-900 px-5 py-2 rounded-xl font-black hover:bg-emerald-400 transition-colors w-24">EDIT</button>
                    <button onClick={() => handleDelete('/cabinet-members', m._id, 'member')} className="text-[10px] bg-rose-500 text-white px-5 py-2 rounded-xl font-black hover:bg-rose-600 transition-colors w-24">DELETE</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. SYMMETRICAL NEWS & TABBED LIST */}
        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* News Publisher */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-xl h-[600px] flex flex-col relative overflow-hidden ring-1 ring-black/5">
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
            <h3 className="text-xl font-black mb-8 text-slate-800 uppercase tracking-tighter flex items-center gap-3">
               <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">#</span> News Broadcaster
            </h3>
            <form onSubmit={saveNews} className="space-y-4 flex-grow flex flex-col">
              <input className="w-full bg-slate-50 rounded-2xl px-6 py-5 font-bold border-none shadow-inner focus:ring-2 focus:ring-indigo-500 transition-all text-sm" placeholder="Article Headline" value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} required />
              <textarea className="w-full bg-slate-50 rounded-2xl px-6 py-5 flex-grow border-none resize-none shadow-inner focus:ring-2 focus:ring-indigo-500 transition-all text-sm leading-relaxed" placeholder="Draft your content..." value={newsForm.body} onChange={e => setNewsForm({...newsForm, body: e.target.value})} required />
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                 <div className="bg-indigo-50 p-4 rounded-2xl border border-dashed border-indigo-200 flex-1 flex items-center justify-between">
                    <span className="text-[9px] font-black text-indigo-400 uppercase">Feature Image</span>
                    <input type="file" className="text-[9px] w-24" onChange={e => setNewsFiles({...newsFiles, image: e.target.files[0]})} />
                 </div>
                 <button className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg">{editNewsId ? 'UPDATE POST' : 'GO LIVE'}</button>
              </div>
            </form>
          </div>

          {/* Feedback & News Tabs */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl h-[600px] flex flex-col overflow-hidden ring-1 ring-black/5">
            <div className="flex bg-slate-50 border-b">
              <button onClick={() => setActiveTab('feedback')} className={`flex-1 py-6 font-black text-xs uppercase tracking-widest transition-all relative ${activeTab === 'feedback' ? 'bg-white text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
                User Feedback
                {activeTab === 'feedback' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600"></div>}
              </button>
              <button onClick={() => setActiveTab('newslist')} className={`flex-1 py-6 font-black text-xs uppercase tracking-widest transition-all relative ${activeTab === 'newslist' ? 'bg-white text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
                Live Feed Management
                {activeTab === 'newslist' && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600"></div>}
              </button>
            </div>

            <div className="p-8 flex-grow overflow-y-auto custom-scrollbar bg-slate-50/20">
              {activeTab === 'feedback' ? (
                <div className="space-y-4">
                  {feedbacks.map(f => (
                    <div key={f._id} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">{f.email}</p>
                        <span className="text-[9px] text-slate-300 font-bold">{new Date(f.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-slate-600 italic font-medium leading-relaxed">"{f.feedback}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {news.map(n => (
                    <div key={n._id} className="p-5 bg-white rounded-2xl flex justify-between items-center group border border-slate-100 shadow-sm hover:border-indigo-200 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0">
                            {n.image && <img src={`${ASSET_URL}${n.image}`} className="w-full h-full object-cover" />}
                         </div>
                         <h5 className="text-xs font-black text-slate-700 truncate w-48">{n.title}</h5>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => {setEditNewsId(n._id); setNewsForm(n)}} className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all text-xs">✎</button>
                        <button onClick={() => handleDelete('/news', n._id, 'news')} className="w-8 h-8 flex items-center justify-center rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-all text-xs">×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. SYSTEM CONFIGS (TERMS & MILESTONES) */}
        <div className="grid lg:grid-cols-2 gap-10">
           {/* Terms */}
           <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
             <h3 className="text-lg font-black text-slate-800 mb-8 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span> Global Terms
             </h3>
             <form onSubmit={saveCabinet} className="flex gap-3 mb-8 bg-slate-50 p-3 rounded-2xl">
                <input className="flex-1 bg-white rounded-xl px-5 py-3 text-sm font-black border-none shadow-sm focus:ring-2 focus:ring-emerald-500" placeholder="Session (e.g. 2026-27)" value={cabinetForm.year} onChange={e => setCabinetForm({...cabinetForm, year: e.target.value})} required />
                <button className="bg-emerald-500 text-slate-900 px-8 py-3 rounded-xl text-xs font-black hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">CREATE</button>
             </form>
             <div className="flex flex-wrap gap-3">
               {cabinets.map(c => (
                 <div key={c._id} className="bg-indigo-900 text-white px-5 py-2 rounded-xl text-[10px] font-black flex items-center gap-3 shadow-md">
                   {c.year} <button onClick={() => handleDelete('/cabinets', c._id, 'term')} className="hover:text-emerald-400 transition-colors">×</button>
                 </div>
               ))}
             </div>
           </div>

           {/* Milestones with Media */}
           <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-xl flex flex-col relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-indigo-900"></div>
             <h3 className="text-lg font-black text-slate-800 mb-8 uppercase tracking-widest">Historical Timeline</h3>
             <form onSubmit={saveMilestone} className="space-y-4 mb-8 bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100">
                <div className="flex gap-3">
                  <input className="w-28 bg-white rounded-xl px-4 py-3 text-xs font-black shadow-sm" placeholder="Year" value={milestoneForm.year} onChange={e => setMilestoneForm({...milestoneForm, year: e.target.value})} required />
                  <input className="flex-1 bg-white rounded-xl px-4 py-3 text-xs font-black shadow-sm" placeholder="Achievement Detail" value={milestoneForm.text} onChange={e => setMilestoneForm({...milestoneForm, text: e.target.value})} required />
                </div>
                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl shadow-sm">
                   <span className="text-[9px] font-black text-indigo-300">ATTACH PROOF/IMAGE</span>
                   <input type="file" className="text-[10px] w-24" onChange={e => setMilestoneFile(e.target.files[0])} />
                </div>
                <button className="w-full bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black tracking-widest hover:bg-black transition-all">REGISTER MILESTONE</button>
             </form>
             <div className="space-y-3 max-h-48 overflow-y-auto pr-3 custom-scrollbar">
                {milestones.map(m => (
                  <div key={m._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white rounded-lg overflow-hidden border p-0.5">
                          {m.image ? <img src={`${ASSET_URL}${m.image}`} className="w-full h-full object-cover rounded-md" /> : <div className="w-full h-full bg-slate-50 flex items-center justify-center text-[8px] text-slate-300">N/A</div>}
                       </div>
                       <div>
                          <span className="text-[10px] font-black text-emerald-600 block mb-0.5">{m.year}</span>
                          <span className="text-[11px] font-bold text-slate-700">{m.text}</span>
                       </div>
                    </div>
                    <button onClick={() => handleDelete('/milestones', m._id, 'milestone')} className="text-rose-500 text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-rose-50 rounded-lg">DELETE</button>
                  </div>
                ))}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}