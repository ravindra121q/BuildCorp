import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import AdminProjects from './AdminProjects';
import ProjectForm from './ProjectForm';
import AdminContent from './AdminContent';
import VisualEditor from './VisualEditor';
import AdminSettings from './AdminSettings';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-brand-950 text-white font-sans flex flex-col md:flex-row">
      {}
      <aside className="w-full md:w-64 bg-brand-900/40 border-r border-white/5 flex flex-col justify-between">
        <div className="p-8">
          <div className="mb-12">
            <h2 className="text-xl font-heading font-bold tracking-widest uppercase">CMS Panel</h2>
          </div>
          <nav className="space-y-4">
            <Link 
              to="/admin/dashboard" 
              className={`block text-sm tracking-widest uppercase py-2 ${location.pathname === '/admin/dashboard' ? 'text-accent-500' : 'text-white/60 hover:text-white transition-colors'}`}
            >
              Projects
            </Link>
            <Link 
              to="/admin/dashboard/content" 
              className={`block text-sm tracking-widest uppercase py-2 ${location.pathname.includes('/content') && !location.pathname.includes('/visual') ? 'text-accent-500' : 'text-white/60 hover:text-white transition-colors'}`}
            >
              Page Content
            </Link>
            <Link 
              to="/admin/dashboard/visual" 
              className={`block text-sm tracking-widest uppercase py-2 ${location.pathname.includes('/visual') ? 'text-accent-500' : 'text-white/60 hover:text-white transition-colors'}`}
            >
              Visual Editor
            </Link>
            <Link 
              to="/admin/dashboard/settings"  
              className={`block text-sm tracking-widest uppercase py-2 ${location.pathname.includes('settings') ? 'text-accent-500' : 'text-white/60 hover:text-white transition-colors'}`}
            >
              Settings
            </Link>
          </nav>
        </div>
        <div className="p-8">
          <button onClick={handleLogout} className="text-xs uppercase tracking-widest text-white/40 hover:text-red-400 transition-colors">
            Terminate Session
          </button>
        </div>
      </aside>

      {}
      <main className="flex-1 p-8 md:p-12 lg:p-16 overflow-y-auto">
        <Routes>
          <Route path="/" element={<AdminProjects />} />
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects/edit/:id" element={<ProjectForm />} />
          <Route path="/content" element={<AdminContent />} />
          <Route path="/visual" element={<VisualEditor />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </main>
    </div>
  );
}
