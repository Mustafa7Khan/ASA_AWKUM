import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    api(`/news/${id}`).then(setItem);
  }, [id]);

  if (!item) return <div className="p-20 text-center text-slate-400">Loading update...</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <button onClick={() => navigate(-1)} className="mb-6 text-brand-700 font-bold hover:underline">← Back to News</button>
      
      <article className="bg-white rounded-3xl border overflow-hidden shadow-sm">
        {item.image && (
          <img src={item.image} className="w-full h-96 object-cover" alt="Article banner" />
        )}
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-black uppercase">
              {item.category || 'Union News'}
            </span>
            <span className="text-slate-400 text-sm">{new Date(item.createdAt).toDateString()}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
            {item.title}
          </h1>
          
          <div className="prose prose-lg text-slate-700 max-w-none whitespace-pre-wrap">
            {item.body}
          </div>

          {item.document && (
            <div className="mt-12 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Official Document Attached</p>
                <p className="text-sm text-slate-500">Download the full PDF/DOC for details</p>
              </div>
              <a 
                href={item.document} 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-3 bg-brand-700 text-white rounded-xl font-bold hover:bg-brand-800 transition"
              >
                Download
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}