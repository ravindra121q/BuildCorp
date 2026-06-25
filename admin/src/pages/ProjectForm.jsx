import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '', category: 'Commercial', client: '', location: '', 
    year: '', scope: '', description: '', status: 'Completed'
  });
  const [heroImage, setHeroImage] = useState(null);
  const [galleryState, setGalleryState] = useState([]);
  const [existingImages, setExistingImages] = useState({ heroImage: '' });
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialFetchLoading, setInitialFetchLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchProject = async () => {
        try {
          const res = await api.get(`/projects/${id}`);
          setFormData({
            title: res.data.title, category: res.data.category, client: res.data.client,
            location: res.data.location, year: res.data.year, scope: res.data.scope,
            description: res.data.description, status: res.data.status
          });
          setExistingImages({
            heroImage: res.data.heroImage
          });
          setGalleryState(res.data.gallery || []);
          setInitialFetchLoading(false);
        } catch (err) {
          console.error(err);
          navigate('/admin/dashboard');
        }
      };
      fetchProject();
    }
  }, [id, isEdit, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    
    if (heroImage) data.append('heroImage', heroImage);
    
    galleryState.forEach(item => {
      if (typeof item === 'string') {
        data.append('galleryOrder', item);
      } else {
        data.append('galleryOrder', 'NEW_FILE');
        data.append('gallery', item);
      }
    });

    try {
      const config = { headers: { 
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}` 
      }};

      if (isEdit) {
        await api.put(`/projects/${id}`, data, config);
      } else {
        await api.post('/projects', data, config);
      }
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      alert('Upload failed. Please check inputs and file sizes.');
      setLoading(false);
    }
  };

  if (initialFetchLoading) return <div className="text-accent-500 animate-pulse text-sm tracking-widest uppercase">Fetching architectural blueprints...</div>;

  return (
    <div className="max-w-4xl">
      <div className="mb-12 border-b border-white/10 pb-8 flex items-center justify-between">
        <h1 className="text-4xl font-heading font-bold tracking-tighter">
          {isEdit ? 'Reconfigure Architecture' : 'Deploy New Architecture'}
        </h1>
        <Link to="/admin/dashboard" className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors">
          Cancel Operation
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Project Title</label>
            <input 
              type="text" required
              className="w-full bg-brand-900/50 border border-white/10 p-4 text-lg focus:outline-none focus:border-accent-500 transition-colors"
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Category</label>
            <select 
              className="w-full bg-brand-900/50 border border-white/10 p-4 text-lg focus:outline-none focus:border-accent-500 transition-colors appearance-none"
              value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option>Commercial</option><option>Residential</option><option>Industrial</option><option>Infrastructure</option><option>Other</option>
            </select>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Client</label>
            <input type="text" required className="w-full bg-brand-900/50 border border-white/10 p-4 focus:outline-none focus:border-accent-500" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Location</label>
            <input type="text" required className="w-full bg-brand-900/50 border border-white/10 p-4 focus:outline-none focus:border-accent-500" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Year</label>
            <input type="text" required className="w-full bg-brand-900/50 border border-white/10 p-4 focus:outline-none focus:border-accent-500" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Scope</label>
            <input type="text" required className="w-full bg-brand-900/50 border border-white/10 p-4 focus:outline-none focus:border-accent-500" value={formData.scope} onChange={e => setFormData({...formData, scope: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Architectural Description</label>
          <textarea 
            required rows="6"
            className="w-full bg-brand-900/50 border border-white/10 p-4 text-lg focus:outline-none focus:border-accent-500 transition-colors resize-none"
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        {}
        <div className="border border-dashed border-white/20 p-8 bg-brand-900/20">
          <h2 className="text-xl font-heading font-bold tracking-widest uppercase mb-8">Cloudinary Media Asset Sync</h2>
          
          <div className="space-y-8">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold opacity-50 mb-3">Cinematic Hero Image (Required on Create)</label>
              
              {isEdit && existingImages.heroImage && (
                <div className="mb-4">
                  <span className="block text-[10px] uppercase tracking-widest opacity-50 mb-2">Current Hero Image</span>
                  <img src={existingImages.heroImage} alt="Current Hero" className="h-48 w-full object-cover border border-white/10 opacity-70" />
                </div>
              )}

              <input 
                type="file" 
                accept="image/*" 
                onChange={e => setHeroImage(e.target.files[0])} 
                required={!isEdit}
                className="w-full text-white/50 file:mr-4 file:py-3 file:px-6 file:rounded-none file:border-0 file:text-sm file:font-bold file:bg-accent-600 file:text-white hover:file:bg-accent-500 cursor-pointer"
              />
              {isEdit && <p className="text-xs text-white/40 mt-2">Uploading a new image will replace the current hero image.</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs uppercase tracking-widest font-bold opacity-50">Asymmetric Gallery Images</label>
                <label className="cursor-pointer bg-brand-800 hover:bg-brand-700 text-white text-[10px] uppercase font-bold tracking-widest py-2 px-4 transition-colors">
                  Add Images
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    className="hidden"
                    onChange={e => {
                      if(e.target.files.length) {
                        setGalleryState([...galleryState, ...Array.from(e.target.files)]);
                      }
                    }} 
                  />
                </label>
              </div>
              
              {galleryState.length > 0 && (
                <div className="mb-4">
                  <span className="block text-[10px] uppercase tracking-widest opacity-50 mb-4">Live Preview (Alternating Layout) - Drag to Reorder</span>
                  <div className="space-y-4 bg-brand-950 p-4 border border-white/5 rounded">
                    {galleryState.map((item, idx) => {
                      const isExisting = typeof item === 'string';
                      const src = isExisting ? item : URL.createObjectURL(item);
                      
                      return (
                        <div 
                          key={idx} 
                          draggable
                          onDragStart={(e) => {
                            setDraggedIdx(idx);
                            e.dataTransfer.effectAllowed = "move";
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = "move";
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (draggedIdx === null || draggedIdx === idx) return;
                            const newGallery = [...galleryState];
                            const draggedItem = newGallery[draggedIdx];
                            newGallery.splice(draggedIdx, 1);
                            newGallery.splice(idx, 0, draggedItem);
                            setGalleryState(newGallery);
                            setDraggedIdx(null);
                          }}
                          className={`relative w-full overflow-hidden group cursor-grab active:cursor-grabbing ${draggedIdx === idx ? 'opacity-50' : 'opacity-100'} ${idx % 2 === 0 ? 'w-[80%] ml-auto' : 'w-[70%]'}`}
                        >
                          <img 
                            src={src} 
                            alt={`Gallery ${idx+1}`} 
                            className="w-full h-32 md:h-48 object-cover border border-white/10 opacity-80 transition-opacity group-hover:opacity-100" 
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <label className="cursor-pointer bg-accent-600 hover:bg-accent-500 text-white text-[10px] uppercase font-bold tracking-widest py-2 px-4 transition-colors">
                              Replace
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden"
                                onChange={e => {
                                  if(e.target.files[0]) {
                                    const newGallery = [...galleryState];
                                    newGallery[idx] = e.target.files[0];
                                    setGalleryState(newGallery);
                                  }
                                }} 
                              />
                            </label>
                            <button 
                              type="button"
                              onClick={() => {
                                const newGallery = [...galleryState];
                                newGallery.splice(idx, 1);
                                setGalleryState(newGallery);
                              }}
                              className="bg-red-600 hover:bg-red-500 text-white text-[10px] uppercase font-bold tracking-widest py-2 px-4 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-accent-600 hover:bg-accent-500 text-white font-bold uppercase tracking-widest text-lg py-6 transition-colors disabled:opacity-50"
        >
          {loading ? 'Uploading to Cloudinary...' : 'Finalize & Deploy'}
        </button>

      </form>
    </div>
  );
}
