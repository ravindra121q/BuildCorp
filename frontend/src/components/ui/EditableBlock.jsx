import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

export default function EditableBlock({ section, page, model = 'content', projectId, defaultHtml, className }) {
  const [editedHtml, setEditedHtml] = useState(null);
  const [isEditMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    const editMode = urlParams.get('editMode') === 'true' || sessionStorage.getItem('editMode') === 'true';
    if (editMode) sessionStorage.setItem('editMode', 'true');
    return editMode;
  });

  useEffect(() => {
    if (!isEditMode) return;

    
    const handleMessage = (e) => {
      if (e.data.type === 'CONTENT_UPDATED' && e.data.section === section) {
        setEditedHtml(e.data.contentHtml);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isEditMode, section]);

  const handleClick = (e) => {
    if (!isEditMode) return;
    e.preventDefault();
    e.stopPropagation();
    
    
    window.parent.postMessage({
      type: 'OPEN_EDITOR',
      page,
      section,
      model,
      projectId,
      contentHtml: editedHtml !== null ? editedHtml : defaultHtml
    }, '*');
  };

  const currentHtml = editedHtml !== null ? editedHtml : defaultHtml;

  return (
    <div 
      className={`relative group ${isEditMode ? 'cursor-pointer' : ''}`}
    >
      {isEditMode && (
        <button 
          type="button"
          onClick={handleClick}
          className="absolute inset-0 z-50 bg-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center border-2 border-dashed border-accent-500 backdrop-blur-[1px] w-full h-full"
          title="Click to edit"
        >
          <span className="bg-accent-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
            Edit {section}
          </span>
        </button>
      )}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentHtml) }} className={className} />
    </div>
  );
}
