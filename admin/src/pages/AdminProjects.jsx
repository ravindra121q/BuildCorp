import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this architectural project? This cannot be undone.')) {
      try {
        await api.delete(`/projects/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchProjects();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-accent-500 animate-pulse text-sm tracking-widest uppercase">Syncing Database...</div>;

  return (
    <div>
      <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-2">
            Portfolio Management <span className="text-accent-500 text-2xl">({projects.length})</span>
          </h1>
          <p className="text-white/50 font-light text-lg">Manage, upload, and architect your digital presence.</p>
        </div>
        <Link to="/admin/dashboard/projects/new" className="bg-accent-600 hover:bg-accent-500 text-white px-8 py-3 text-sm tracking-widest uppercase font-bold transition-colors">
          Deploy New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <div key={project._id} className="bg-brand-900/40 backdrop-blur-sm border border-white/10 group hover:border-accent-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 flex flex-col relative overflow-hidden">
            {project.isFeatured && (
              <div className="absolute top-4 right-4 bg-accent-600 text-white text-[10px] uppercase font-bold tracking-widest py-1 px-3 z-10 shadow-lg">
                Featured
              </div>
            )}
            <div className="h-56 w-full overflow-hidden relative">
              <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent opacity-80"></div>
            </div>
            <div className="p-8 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="text-accent-500 text-[10px] tracking-widest uppercase block">{project.category}</span>
                <span className="text-white/40 text-[10px] tracking-widest uppercase border border-white/10 px-2 py-1">{project.year || 'N/A'}</span>
              </div>
              <h3 className="text-3xl font-heading font-bold mb-2 line-clamp-2">{project.title}</h3>
              <p className="text-white/50 text-xs tracking-widest uppercase mb-8 flex-1">{project.location || 'Unknown Location'}</p>
              
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <Link 
                  to={`/admin/dashboard/projects/edit/${project._id}`} 
                  className="bg-white/5 hover:bg-white/10 text-center py-3 text-xs uppercase tracking-widest text-white transition-colors border border-white/5"
                >
                  Configure
                </Link>
                <a 
                  href={`http://localhost:5173/projects/${project._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-600/10 hover:bg-accent-600/20 text-accent-500 text-center py-3 text-xs uppercase tracking-widest transition-colors border border-accent-500/20"
                >
                  View Live
                </a>
                <button 
                  onClick={() => handleDelete(project._id)} 
                  className="col-span-2 mt-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-center py-3 text-[10px] uppercase font-bold tracking-widest transition-colors border border-red-500/20"
                >
                  Decommission Project
                </button>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-white/20">
            <p className="text-white/50 text-xl font-light">No projects found. Deploy your first architecture.</p>
          </div>
        )}
      </div>
    </div>
  );
}
