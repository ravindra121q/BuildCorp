import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import api from '../services/api';

export default function VisualEditor() {
  const [editorOpen, setEditorOpen] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef(null);

  // Editor configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'clean']
    ],
  };

  useEffect(() => {
    
    const handleMessage = (e) => {
      
      if (e.data && e.data.type === 'OPEN_EDITOR') {
        setCurrentBlock({
          page: e.data.page,
          section: e.data.section,
          model: e.data.model,
          projectId: e.data.projectId
        });
        setHtmlContent(e.data.contentHtml);
        setEditorOpen(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      
      const token = localStorage.getItem('adminToken');
      
      if (currentBlock.model === 'project' && currentBlock.projectId) {
        await api.put(`/projects/${currentBlock.projectId}`, {
          [currentBlock.section]: htmlContent
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await api.put('/content', {
          page: currentBlock.page,
          section: currentBlock.section,
          contentHtml: htmlContent
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'CONTENT_UPDATED',
          section: currentBlock.section,
          contentHtml: htmlContent
        }, '*');
      }

      setEditorOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save content');
    }
    setLoading(false);
  };

  return (
    <div className="relative w-full h-[calc(100vh-8rem)]">
      {}
      <div className="absolute top-0 left-0 w-full bg-accent-600 text-white text-xs font-bold uppercase tracking-widest p-2 text-center z-10 shadow-lg">
        Visual Edit Mode Active: Hover over text blocks and click to edit
      </div>

      {}
      <iframe 
        ref={iframeRef}
        src="http://localhost:5173?editMode=true"
        title="Visual Website Editor"
        className="w-full h-full border-2 border-white/5 pt-8 bg-black"
      />

      {}
      {editorOpen && (
        <div className="absolute inset-0 bg-brand-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-brand-900 border border-white/20 p-8 w-full max-w-3xl shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h3 className="text-2xl font-heading font-bold">
                Editing: <span className="text-accent-500">{currentBlock?.section}</span>
              </h3>
              <button 
                onClick={() => setEditorOpen(false)}
                className="text-white/50 hover:text-white uppercase tracking-widest text-xs"
              >
                Cancel
              </button>
            </div>
            
            <div className="bg-white text-black mb-6">
              <ReactQuill 
                theme="snow" 
                value={htmlContent} 
                onChange={setHtmlContent} 
                modules={modules}
                className="h-64 mb-12"
              />
            </div>

            <button 
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-4 uppercase tracking-widest transition-colors"
            >
              {loading ? 'Publishing Changes...' : 'Save & Deploy Live'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
