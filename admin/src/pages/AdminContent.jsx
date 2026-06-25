import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import api from '../services/api';

const PAGE_SECTIONS = {
  home: ['hero_subtitle_top', 'hero_title', 'hero_subtitle', 'stat_1_val', 'stat_1_label', 'stat_2_val', 'stat_2_label', 'stat_3_val', 'stat_3_label', 'stat_4_val', 'stat_4_label'],
  about: ['subheading', 'heading', 'paragraph_1', 'paragraph_2', 'philosophy_heading', 'philosophy_text'],
  services: ['subheading', 'heading', 'description', 'service_1', 'service_2', 'service_3', 'service_4'],
  projects: ['subheading', 'heading', 'description'],
  project_detail: ['cta_subheading', 'cta_heading'],
  contact: ['subheading', 'heading', 'description', 'hq_heading', 'address', 'phone', 'email'],
  footer: ['description', 'company_heading', 'contact_heading', 'address', 'email', 'phone']
};

export default function AdminContent() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [contentMap, setContentMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [batchLoading, setBatchLoading] = useState(false);

  const formatLabel = (str) => str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const isRichText = (sectionName) => {
    const richFields = ['description', 'paragraph', 'philosophy_text', 'service_'];
    return richFields.some(field => sectionName.includes(field));
  };

  const stripHtml = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // Editor modules config
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'clean']
    ],
  };

  useEffect(() => {
    fetchPageContent(selectedPage);
  }, [selectedPage]);

  const fetchPageContent = async (pageName) => {
    try {
      const res = await api.get(`/content/${pageName}`);
      setContentMap(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSection = async (sectionName, htmlContent) => {
    setLoading(true);
    try {
      await api.put('/content', {
        page: selectedPage,
        section: sectionName,
        contentHtml: htmlContent
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchPageContent(selectedPage);
    } catch (err) {
      console.error(err);
      alert('Failed to save content');
    }
    setLoading(false);
  };

  const handleSaveAll = async () => {
    setBatchLoading(true);
    try {
      const promises = PAGE_SECTIONS[selectedPage].map(sectionName => {
        const block = contentMap[sectionName];
        if (block && block.contentHtml) {
          return api.put('/content', {
            page: selectedPage,
            section: sectionName,
            contentHtml: block.contentHtml
          }, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } });
        }
        return Promise.resolve();
      });
      await Promise.all(promises);
      await fetchPageContent(selectedPage);
      alert('All modifications to this page have been successfully deployed.');
    } catch (err) {
      console.error(err);
      alert('Failed to deploy some content updates.');
    }
    setBatchLoading(false);
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-12 border-b border-white/10 pb-8">
        <h1 className="text-4xl font-heading font-bold tracking-tighter mb-2">Global CMS Content</h1>
        <p className="text-white/50 font-light text-lg">Edit the live textual content across your architectural portfolio.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {Object.keys(PAGE_SECTIONS).map(page => (
          <button
            key={page}
            onClick={() => { setSelectedPage(page); setOpenSection(null); }}
            className={`px-6 py-3 text-xs tracking-widest uppercase font-bold transition-all duration-300 ${
              selectedPage === page 
                ? 'bg-accent-600 text-white shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                : 'bg-brand-900/50 text-white/50 hover:text-white hover:bg-brand-800 border border-white/5'
            }`}
          >
            {page.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading tracking-widest uppercase">
          {selectedPage.replace('_', ' ')} Structure
        </h2>
        <button 
          onClick={handleSaveAll}
          disabled={batchLoading}
          className="bg-brand-800 hover:bg-brand-700 text-white px-8 py-3 text-xs tracking-widest uppercase font-bold transition-colors border border-white/10"
        >
          {batchLoading ? 'Deploying Page...' : 'Deploy Entire Page'}
        </button>
      </div>

      <div className="space-y-12">
        {PAGE_SECTIONS[selectedPage].map((sectionName) => {
          const block = contentMap[sectionName] || { section: sectionName, contentHtml: '' };
          const isOpen = openSection === sectionName;
          
          return (
            <div key={sectionName} className="bg-brand-900/40 backdrop-blur-sm border border-white/5 overflow-hidden transition-all duration-300">
              <div 
                className="flex justify-between items-center p-6 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setOpenSection(isOpen ? null : sectionName)}
              >
                <div className="flex items-center gap-4">
                  <h3 className={`text-lg font-heading font-bold ${isOpen ? 'text-accent-500' : 'text-white'}`}>
                    {formatLabel(sectionName)}
                  </h3>
                  <span className="text-[10px] text-white/30 tracking-widest uppercase bg-black/20 px-2 py-1 rounded">
                    Key: {sectionName}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {!contentMap[sectionName] && <span className="text-[10px] text-yellow-500/70 uppercase tracking-widest font-bold">Using Fallback</span>}
                  <span className="text-white/30 text-xl font-light">{isOpen ? '−' : '+'}</span>
                </div>
              </div>
              
              {isOpen && (
                <div className="p-6 pt-0 border-t border-white/5 mt-4">
                  <div className="mb-6">
                    {isRichText(sectionName) ? (
                      <div className="bg-white text-black">
                        <ReactQuill 
                          theme="snow" 
                          value={block.contentHtml} 
                          onChange={(html) => setContentMap({...contentMap, [sectionName]: { ...block, contentHtml: html }})} 
                          modules={modules}
                          className="h-64 mb-12"
                        />
                      </div>
                    ) : (
                      <textarea
                        value={stripHtml(block.contentHtml)}
                        onChange={(e) => setContentMap({...contentMap, [sectionName]: { ...block, contentHtml: e.target.value }})}
                        className="w-full bg-brand-950 border border-white/20 p-4 text-white focus:outline-none focus:border-accent-500 transition-colors resize-y min-h-[100px]"
                        placeholder="Enter text..."
                      />
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button 
                      onClick={() => handleSaveSection(sectionName, block.contentHtml)}
                      disabled={loading}
                      className="bg-accent-600 hover:bg-accent-500 text-white px-8 py-3 text-xs font-bold tracking-widest uppercase transition-colors"
                    >
                      {loading ? 'Saving Block...' : 'Save Block Individually'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {Object.keys(contentMap).length === 0 && (
          <p className="text-white/50 italic">No content blocks exist for this page yet. Create one below.</p>
        )}

        {/* Removed Create New Content Block Form to enforce strict schema */}
      </div>
    </div>
  );
}
