import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Check } from 'lucide-react';
import type { Destination } from '../../types';
import { apiService } from '../../services/api';

export const AdminDestinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit State
  const [editing, setEditing] = useState<Destination | null>(null);
  
  // Helper states for lists
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newAttraction, setNewAttraction] = useState('');
  const [newActivity, setNewActivity] = useState('');

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      setLoading(true);
      const data = await apiService.getDestinations();
      setDestinations(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (destinations.some((d) => d.id === editing.id)) {
        await apiService.saveDestination(editing);
      } else {
        await apiService.saveDestination(editing);
      }
      setEditing(null);
      loadDestinations();
    } catch (err: any) {
      alert(err.message || 'Failed to save destination');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this destination?')) return;
    try {
      await apiService.deleteDestination(id);
      loadDestinations();
    } catch (err: any) {
      alert(err.message || 'Failed to delete destination');
    }
  };

  const handleCreateNew = () => {
    setEditing({
      id: 'dest-' + Date.now(),
      name: '',
      slug: '',
      intro: '',
      description: '',
      mainImage: '',
      gallery: [],
      attractions: [],
      activities: [],
      isFeatured: true,
      isPublished: true,
    });
    setNewGalleryUrl('');
    setNewAttraction('');
    setNewActivity('');
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editing) return;
    const name = e.target.value;
    setEditing({ ...editing, name, slug: generateSlug(name) });
  };

  // List Handlers
  const addGalleryImage = () => {
    if (!newGalleryUrl.trim() || !editing) return;
    setEditing({ ...editing, gallery: [...(editing.gallery || []), newGalleryUrl.trim()] });
    setNewGalleryUrl('');
  };

  const removeGalleryImage = (index: number) => {
    if (!editing) return;
    const updated = [...(editing.gallery || [])];
    updated.splice(index, 1);
    setEditing({ ...editing, gallery: updated });
  };

  const addAttraction = () => {
    if (!newAttraction.trim() || !editing) return;
    setEditing({ ...editing, attractions: [...(editing.attractions || []), newAttraction.trim()] });
    setNewAttraction('');
  };

  const removeAttraction = (index: number) => {
    if (!editing) return;
    const updated = [...(editing.attractions || [])];
    updated.splice(index, 1);
    setEditing({ ...editing, attractions: updated });
  };

  const addActivity = () => {
    if (!newActivity.trim() || !editing) return;
    setEditing({ ...editing, activities: [...(editing.activities || []), newActivity.trim()] });
    setNewActivity('');
  };

  const removeActivity = (index: number) => {
    if (!editing) return;
    const updated = [...(editing.activities || [])];
    updated.splice(index, 1);
    setEditing({ ...editing, activities: updated });
  };

  if (loading && destinations.length === 0) {
    return <div className="p-8 text-center text-slate-500">Loading destinations...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manage Destinations</h1>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#15803d] text-white rounded-xl hover:bg-green-800 transition-colors font-bold"
        >
          <Plus size={20} />
          Add Destination
        </button>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinations.map((dest) => (
          <div key={dest.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex gap-4">
            <div className="w-32 h-32 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden">
              {dest.mainImage ? (
                <img src={dest.mainImage} alt={dest.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon size={32} />
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{dest.name}</h3>
                  <div className="flex gap-2">
                    {dest.isFeatured && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded">Featured</span>}
                    {dest.isPublished !== false ? (
                       <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">Published</span>
                    ) : (
                       <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-bold rounded">Draft</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mt-1">{dest.intro}</p>
                <div className="text-xs text-slate-400 mt-2 font-mono">{dest.slug}</div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setEditing(dest)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(dest.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">
                {destinations.some((d) => d.id === editing.id) ? 'Edit Destination' : 'New Destination'}
              </h2>
              <button
                onClick={() => setEditing(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editing.name}
                    onChange={handleNameChange}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] outline-none text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={editing.slug}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] outline-none text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                  Intro
                </label>
                <textarea
                  rows={2}
                  value={editing.intro}
                  onChange={(e) => setEditing({ ...editing, intro: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] outline-none text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] outline-none text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                  Main Image URL
                </label>
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl flex-shrink-0 overflow-hidden border border-slate-200 flex items-center justify-center">
                    {editing.mainImage ? (
                      <img src={editing.mainImage} alt="Main" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-slate-300" size={24} />
                    )}
                  </div>
                  <input
                    type="text"
                    value={editing.mainImage}
                    onChange={(e) => setEditing({ ...editing, mainImage: e.target.value })}
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] outline-none text-sm font-bold self-start"
                  />
                </div>
              </div>

              {/* Gallery */}
              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                  Gallery Images
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
                    placeholder="Add image URL..."
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] outline-none text-sm"
                  />
                  <button
                    onClick={addGalleryImage}
                    className="px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 text-sm font-bold transition-colors"
                  >
                    Add
                  </button>
                </div>
                {editing.gallery && editing.gallery.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {editing.gallery.map((url, i) => (
                      <div key={i} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeGalleryImage(i)}
                          className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Attractions */}
              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                  Attractions
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newAttraction}
                    onChange={(e) => setNewAttraction(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAttraction())}
                    placeholder="Add an attraction..."
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] outline-none text-sm"
                  />
                  <button
                    onClick={addAttraction}
                    className="px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 text-sm font-bold transition-colors"
                  >
                    Add
                  </button>
                </div>
                {editing.attractions && editing.attractions.length > 0 && (
                  <ul className="space-y-2">
                    {editing.attractions.map((attraction, i) => (
                      <li key={i} className="flex justify-between items-center px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold">
                        {attraction}
                        <button onClick={() => removeAttraction(i)} className="text-red-500 hover:text-red-700 p-1">
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Activities */}
              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                  Activities
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addActivity())}
                    placeholder="Add an activity..."
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d] outline-none text-sm"
                  />
                  <button
                    onClick={addActivity}
                    className="px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 text-sm font-bold transition-colors"
                  >
                    Add
                  </button>
                </div>
                {editing.activities && editing.activities.length > 0 && (
                  <ul className="space-y-2">
                    {editing.activities.map((activity, i) => (
                      <li key={i} className="flex justify-between items-center px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold">
                        {activity}
                        <button onClick={() => removeActivity(i)} className="text-red-500 hover:text-red-700 p-1">
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className={`w-6 h-6 rounded flex items-center justify-center border ${editing.isFeatured ? 'bg-[#15803d] border-[#15803d]' : 'bg-slate-50 border-slate-300'}`}>
                    {editing.isFeatured && <Check size={16} className="text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={editing.isFeatured || false}
                    onChange={(e) => setEditing({ ...editing, isFeatured: e.target.checked })}
                    className="hidden"
                  />
                  <span className="text-sm font-extrabold uppercase tracking-wider text-slate-700">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className={`w-6 h-6 rounded flex items-center justify-center border ${editing.isPublished !== false ? 'bg-[#15803d] border-[#15803d]' : 'bg-slate-50 border-slate-300'}`}>
                    {editing.isPublished !== false && <Check size={16} className="text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={editing.isPublished !== false}
                    onChange={(e) => setEditing({ ...editing, isPublished: e.target.checked })}
                    className="hidden"
                  />
                  <span className="text-sm font-extrabold uppercase tracking-wider text-slate-700">Published</span>
                </label>
              </div>

            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={() => setEditing(null)}
                className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 text-sm font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#15803d] text-white rounded-xl hover:bg-green-800 text-sm font-bold transition-colors"
              >
                Save Destination
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


