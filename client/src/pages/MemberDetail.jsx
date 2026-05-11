import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function MemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  
  // Use the root URL (port 5000) for static assets
  const ASSET_URL = "http://localhost:5000";

  useEffect(() => {
    // Note: If your backend has a specific route like /cabinet-members/:id, use that instead
    api(`/cabinet-members?_id=${id}`).then(data => {
      const found = Array.isArray(data) ? data.find(m => m._id === id) : data;
      setMember(found);
    }).catch(err => {
      console.error("Error fetching member:", err);
    });
  }, [id]);

  if (!member) return <div className="p-20 text-center">Loading member profiles...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <button onClick={() => navigate(-1)} className="mb-6 text-brand-700 font-bold hover:underline">
        ← Back
      </button>
      
      <div className="bg-white rounded-3xl border p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-10 items-center">
        {/* FIX: Prepend ASSET_URL to the image path */}
        <img 
          src={member.image ? `${ASSET_URL}${member.image}` : 'https://placehold.co/300'} 
          crossOrigin='anonymess'
          className="w-64 h-64 rounded-3xl object-cover shadow-2xl" 
          alt={member.name}
          onError={(e) => { e.target.src = 'https://placehold.co/300'; }}
        />

        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900">{member.name}</h1>
          <p className="text-xl text-brand-700 font-bold mb-6">{member.designation}</p>
          
          {/* Department badge (based on your JSON) */}
          {member.department && (
            <p className="text-sm text-slate-500 mb-4 font-medium italic">
              Department of {member.department}
            </p>
          )}

          <div className="prose text-slate-600">
            {member.bio || "No biography provided for this cabinet member."}
          </div>

          <div className="mt-8 pt-8 border-t flex gap-4 justify-center md:justify-start">
             <span className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500">
                {/* Check if cabinet is an object or just an ID */}
                Cabinet Year: {member.cabinet?.year || '2026'}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}