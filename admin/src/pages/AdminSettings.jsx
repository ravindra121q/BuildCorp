import React, { useState, useEffect } from 'react';
import api from '../services/api';

const SETTING_KEYS = {
  seo: ['site_title', 'meta_description', 'meta_keywords'],
  contact: ['global_email', 'global_phone', 'global_hq_address'],
  social: ['social_instagram', 'social_linkedin', 'social_twitter']
};

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/content/global');
      const data = res.data;
      const initialSettings = {};
      Object.values(SETTING_KEYS).flat().forEach(key => {
        // Strip HTML if it exists in the database
        const rawHtml = data[key]?.contentHtml || '';
        const doc = new DOMParser().parseFromString(rawHtml, 'text/html');
        initialSettings[key] = doc.body.textContent || '';
      });
      setSettings(initialSettings);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const promises = Object.entries(settings).map(([key, value]) => {
        return api.put('/content', {
          page: 'global',
          section: key,
          contentHtml: value
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } });
      });
      await Promise.all(promises);
      alert('Global configuration synchronized successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to deploy settings.');
    }
    setSaving(false);
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const formatLabel = (str) => str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  if (loading) return <div className="text-accent-500 animate-pulse text-sm tracking-widest uppercase">Initializing Global Configuration...</div>;

  return (
    <div className="max-w-5xl">
      <div className="mb-12 border-b border-white/10 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tighter mb-2">Global Settings</h1>
          <p className="text-white/50 font-light text-lg">Manage SEO, integrations, and core site identity.</p>
        </div>
        <button 
          onClick={handleSaveAll}
          disabled={saving}
          className="bg-accent-600 hover:bg-accent-500 text-white px-8 py-3 text-xs tracking-widest uppercase font-bold transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          {saving ? 'Synchronizing...' : 'Deploy Global Config'}
        </button>
      </div>

      <div className="space-y-12">
        {/* SEO Configuration */}
        <section className="bg-brand-900/40 backdrop-blur-sm border border-white/5 p-8">
          <h2 className="text-xl font-heading tracking-widest uppercase text-accent-500 mb-8 border-b border-white/10 pb-4">
            Search Engine Optimization (SEO)
          </h2>
          <div className="space-y-6">
            {SETTING_KEYS.seo.map(key => (
              <div key={key}>
                <label className="block text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">{formatLabel(key)}</label>
                {key.includes('description') || key.includes('keywords') ? (
                  <textarea 
                    value={settings[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full bg-brand-950 border border-white/20 p-4 text-white focus:outline-none focus:border-accent-500 transition-colors resize-none min-h-[100px]"
                  />
                ) : (
                  <input 
                    type="text"
                    value={settings[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full bg-brand-950 border border-white/20 p-4 text-white focus:outline-none focus:border-accent-500 transition-colors"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Global Contact Info */}
        <section className="bg-brand-900/40 backdrop-blur-sm border border-white/5 p-8">
          <h2 className="text-xl font-heading tracking-widest uppercase text-accent-500 mb-8 border-b border-white/10 pb-4">
            Master Contact Identity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SETTING_KEYS.contact.map(key => (
              <div key={key} className={key === 'global_hq_address' ? 'md:col-span-2' : ''}>
                <label className="block text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">{formatLabel(key)}</label>
                <input 
                  type="text"
                  value={settings[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full bg-brand-950 border border-white/20 p-4 text-white focus:outline-none focus:border-accent-500 transition-colors"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="bg-brand-900/40 backdrop-blur-sm border border-white/5 p-8">
          <h2 className="text-xl font-heading tracking-widest uppercase text-accent-500 mb-8 border-b border-white/10 pb-4">
            Social Connectors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SETTING_KEYS.social.map(key => (
              <div key={key}>
                <label className="block text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2">{formatLabel(key)}</label>
                <input 
                  type="text"
                  placeholder="https://"
                  value={settings[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full bg-brand-950 border border-white/20 p-4 text-white focus:outline-none focus:border-accent-500 transition-colors"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
