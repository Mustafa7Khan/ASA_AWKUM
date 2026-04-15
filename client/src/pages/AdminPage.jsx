import { useEffect, useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { api } from '../lib/api';

const blankNews = { title: '', date: '', body: '' };
const blankCurrent = { name: '', designation: '', department: '', image: '' };
const blankPrevious = { year: '', membersText: '' };
const blankMilestone = { year: '', text: '' };

function CrudList({ items, onEdit, onDelete, renderItem }) {
  if (items.length === 0) return <p className="text-sm text-slate-500">No items yet.</p>;

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item._id} className="rounded border border-slate-200 bg-slate-50 p-3">
          {renderItem(item)}
          <div className="mt-2 flex gap-2">
            <button onClick={() => onEdit(item)} className="rounded bg-amber-500 px-3 py-1 text-sm text-white">Edit</button>
            <button onClick={() => onDelete(item._id)} className="rounded bg-rose-600 px-3 py-1 text-sm text-white">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const [news, setNews] = useState([]);
  const [current, setCurrent] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [newsForm, setNewsForm] = useState(blankNews);
  const [newsEditId, setNewsEditId] = useState('');
  const [currentForm, setCurrentForm] = useState(blankCurrent);
  const [currentEditId, setCurrentEditId] = useState('');
  const [previousForm, setPreviousForm] = useState(blankPrevious);
  const [previousEditId, setPreviousEditId] = useState('');
  const [milestoneForm, setMilestoneForm] = useState(blankMilestone);
  const [milestoneEditId, setMilestoneEditId] = useState('');

  const memberFormatHelp = useMemo(() => 'Format each line: Name | Designation | Department | OptionalImageURL', []);

  async function loadAll() {
    const [newsData, currentData, previousData, milestoneData, feedbackData] = await Promise.all([
      api('/api/news'),
      api('/api/current-cabinet'),
      api('/api/previous-cabinets'),
      api('/api/milestones'),
      api('/api/feedback'),
    ]);
    setNews(newsData);
    setCurrent(currentData);
    setPrevious(previousData);
    setMilestones(milestoneData);
    setFeedbacks(feedbackData);
  }

  useEffect(() => {
    loadAll().catch(() => {});
  }, []);

  async function saveNews(e) {
    e.preventDefault();
    if (newsEditId) {
      await api(`/api/news/${newsEditId}`, { method: 'PUT', body: JSON.stringify(newsForm) });
    } else {
      await api('/api/news', { method: 'POST', body: JSON.stringify(newsForm) });
    }
    setNewsForm(blankNews);
    setNewsEditId('');
    loadAll();
  }

  async function saveCurrent(e) {
    e.preventDefault();
    if (currentEditId) {
      await api(`/api/current-cabinet/${currentEditId}`, { method: 'PUT', body: JSON.stringify(currentForm) });
    } else {
      await api('/api/current-cabinet', { method: 'POST', body: JSON.stringify(currentForm) });
    }
    setCurrentForm(blankCurrent);
    setCurrentEditId('');
    loadAll();
  }

  function parseMembers(text) {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name = '', designation = '', department = '', image = ''] = line.split('|').map((part) => part.trim());
        return { name, designation, department, image };
      });
  }

  async function savePrevious(e) {
    e.preventDefault();
    const payload = { year: previousForm.year, members: parseMembers(previousForm.membersText) };
    if (previousEditId) {
      await api(`/api/previous-cabinets/${previousEditId}`, { method: 'PUT', body: JSON.stringify(payload) });
    } else {
      await api('/api/previous-cabinets', { method: 'POST', body: JSON.stringify(payload) });
    }
    setPreviousForm(blankPrevious);
    setPreviousEditId('');
    loadAll();
  }

  async function saveMilestone(e) {
    e.preventDefault();
    if (milestoneEditId) {
      await api(`/api/milestones/${milestoneEditId}`, { method: 'PUT', body: JSON.stringify(milestoneForm) });
    } else {
      await api('/api/milestones', { method: 'POST', body: JSON.stringify(milestoneForm) });
    }
    setMilestoneForm(blankMilestone);
    setMilestoneEditId('');
    loadAll();
  }

  return (
    <div className="space-y-8">
      <SectionTitle title="Admin Panel" subtitle="Manage news, cabinets, milestones, and read feedback." />

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">News (Add/Edit/Delete)</h3>
        <form onSubmit={saveNews} className="mb-4 grid gap-2 md:grid-cols-3">
          <input className="rounded border px-3 py-2" placeholder="Title" value={newsForm.title} onChange={(e) => setNewsForm((p) => ({ ...p, title: e.target.value }))} required />
          <input className="rounded border px-3 py-2" placeholder="Date" value={newsForm.date} onChange={(e) => setNewsForm((p) => ({ ...p, date: e.target.value }))} required />
          <input className="rounded border px-3 py-2 md:col-span-3" placeholder="Body" value={newsForm.body} onChange={(e) => setNewsForm((p) => ({ ...p, body: e.target.value }))} required />
          <button className="rounded bg-brand-700 px-4 py-2 text-white" type="submit">{newsEditId ? 'Update' : 'Add'} News</button>
        </form>
        <CrudList
          items={news}
          onEdit={(item) => {
            setNewsForm({ title: item.title, date: item.date, body: item.body });
            setNewsEditId(item._id);
          }}
          onDelete={async (id) => {
            await api(`/api/news/${id}`, { method: 'DELETE' });
            loadAll();
          }}
          renderItem={(item) => (
            <>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-slate-500">{item.date}</p>
            </>
          )}
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Current Cabinet (Add/Edit/Delete)</h3>
        <form onSubmit={saveCurrent} className="mb-4 grid gap-2 md:grid-cols-2">
          <input className="rounded border px-3 py-2" placeholder="Name" value={currentForm.name} onChange={(e) => setCurrentForm((p) => ({ ...p, name: e.target.value }))} required />
          <input className="rounded border px-3 py-2" placeholder="Designation" value={currentForm.designation} onChange={(e) => setCurrentForm((p) => ({ ...p, designation: e.target.value }))} required />
          <input className="rounded border px-3 py-2" placeholder="Department" value={currentForm.department} onChange={(e) => setCurrentForm((p) => ({ ...p, department: e.target.value }))} required />
          <input className="rounded border px-3 py-2" placeholder="Image URL" value={currentForm.image} onChange={(e) => setCurrentForm((p) => ({ ...p, image: e.target.value }))} />
          <button className="rounded bg-brand-700 px-4 py-2 text-white" type="submit">{currentEditId ? 'Update' : 'Add'} Member</button>
        </form>
        <CrudList
          items={current}
          onEdit={(item) => {
            setCurrentForm({ name: item.name, designation: item.designation, department: item.department, image: item.image || '' });
            setCurrentEditId(item._id);
          }}
          onDelete={async (id) => {
            await api(`/api/current-cabinet/${id}`, { method: 'DELETE' });
            loadAll();
          }}
          renderItem={(item) => <p>{item.name} - {item.designation}</p>}
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Previous Cabinets (Add/Edit/Delete)</h3>
        <form onSubmit={savePrevious} className="mb-4 space-y-2">
          <input className="w-full rounded border px-3 py-2" placeholder="Year (e.g. 2024-2025)" value={previousForm.year} onChange={(e) => setPreviousForm((p) => ({ ...p, year: e.target.value }))} required />
          <p className="text-xs text-slate-500">{memberFormatHelp}</p>
          <textarea className="w-full rounded border px-3 py-2" rows={4} placeholder="Name | Designation | Department | Image URL" value={previousForm.membersText} onChange={(e) => setPreviousForm((p) => ({ ...p, membersText: e.target.value }))} required />
          <button className="rounded bg-brand-700 px-4 py-2 text-white" type="submit">{previousEditId ? 'Update' : 'Add'} Previous Cabinet</button>
        </form>
        <CrudList
          items={previous}
          onEdit={(item) => {
            const membersText = (item.members || [])
              .map((member) => `${member.name} | ${member.designation} | ${member.department} | ${member.image || ''}`)
              .join('\n');
            setPreviousForm({ year: item.year, membersText });
            setPreviousEditId(item._id);
          }}
          onDelete={async (id) => {
            await api(`/api/previous-cabinets/${id}`, { method: 'DELETE' });
            loadAll();
          }}
          renderItem={(item) => <p>{item.year} ({item.members?.length || 0} members)</p>}
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">Milestones (Add/Edit/Delete)</h3>
        <form onSubmit={saveMilestone} className="mb-4 grid gap-2 md:grid-cols-2">
          <input className="rounded border px-3 py-2" placeholder="Year" value={milestoneForm.year} onChange={(e) => setMilestoneForm((p) => ({ ...p, year: e.target.value }))} required />
          <input className="rounded border px-3 py-2" placeholder="Milestone text" value={milestoneForm.text} onChange={(e) => setMilestoneForm((p) => ({ ...p, text: e.target.value }))} required />
          <button className="rounded bg-brand-700 px-4 py-2 text-white" type="submit">{milestoneEditId ? 'Update' : 'Add'} Milestone</button>
        </form>
        <CrudList
          items={milestones}
          onEdit={(item) => {
            setMilestoneForm({ year: item.year, text: item.text });
            setMilestoneEditId(item._id);
          }}
          onDelete={async (id) => {
            await api(`/api/milestones/${id}`, { method: 'DELETE' });
            loadAll();
          }}
          renderItem={(item) => <p>{item.year} - {item.text}</p>}
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">User Feedbacks</h3>
        {feedbacks.length === 0 ? <p className="text-sm text-slate-500">No feedback submitted yet.</p> : null}
        <div className="space-y-2">
          {feedbacks.map((entry) => (
            <article key={entry._id} className="rounded border border-slate-200 bg-slate-50 p-3">
              <p className="font-medium">{entry.email}</p>
              <p className="text-slate-700">{entry.feedback}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
