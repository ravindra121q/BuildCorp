import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-brand-950 flex items-center justify-center font-sans text-white">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="bg-brand-900/50 p-12 backdrop-blur-xl border border-white/10 shadow-2xl rounded-sm">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-heading font-bold tracking-widest uppercase mb-2">BuildCorp CMS</h1>
            <p className="text-white/50 text-sm tracking-widest">Authorized Personnel Only</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-white/20 py-3 text-xl focus:outline-none focus:border-accent-500 transition-colors placeholder:text-white/20"
                placeholder="admin@buildcorp.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Password</label>
              <input 
                type="password" 
                className="w-full bg-transparent border-b border-white/20 py-3 text-xl focus:outline-none focus:border-accent-500 transition-colors placeholder:text-white/20"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
            <button type="submit" className="w-full py-4 text-sm tracking-widest mt-4 bg-accent-600 hover:bg-accent-500 text-white font-bold transition-colors">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
