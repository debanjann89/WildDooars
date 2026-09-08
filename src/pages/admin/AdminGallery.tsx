import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import { apiService } from '../../services/api';
import type { GalleryPhoto } from '../../services/api';

const categoryOptions = [
  { value: 'forest', label: 'Forest & Landscapes' },
  { value: 'animals', label: 'Wild Animals' },
  { value: 'safaris', label: 'Jungle Safaris' }
] as const;

export const AdminGallery: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [editing, setEditing] = useState<GalleryPhoto | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    loadPhotos();
  }, []);

  async function loadPhotos() {
    const list = await apiService.getGallery();
    setPhotos(list);
  }

  const filteredPhotos = filterCategory === 'all'
    ? photos
    : photos.filter(p => p.category === filterCategory);

  const handleCreateNew = () => {
    setEditing({
      id: 'gallery-' + Date.now(),
      src: '',
      alt: '',
      category: 'animals'
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.src || !editing?.alt) return;

    await apiService.saveGalleryPhoto(editing);
    setEditing(null);
    loadPhotos();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery photo?')) {
      await apiService.deleteGalleryPhoto(id);
      loadPhotos();
    }
  };

  const getCategoryLabel = (cat: string) => {
    return categoryOptions.find(c => c.value === cat)?.label || cat;
  };

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'forest': return 'bg-green-100 text-green-900';
      case 'animals': return 'bg-amber-100 text-amber-900';
      case 'safaris': return 'bg-blue-100 text-blue-900';
      default: return 'bg-stone-100 text-stone-900';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase text-slate-900 tracking-tight">Gallery Management</h1>
          <p className="text-xs text-slate-600 mt-0.5">Add, edit, and organize photos for the public Gallery page.</p>
        </div>
        <button onClick={handleCreateNew} className="btn btn-primary text-xs py-2 px-4">
          <Plus className="w-4 h-4" />
          Add Photo
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[{ value: 'all', label: 'All Photos' }, ...categoryOptions].map((cat) => {
          const count = cat.value === 'all'
            ? photos.length
            : photos.filter(p => p.category === cat.value).length;
          const isActive = filterCategory === cat.value;

          return (
            <button
              key={cat.value}
              onClick={() => setFilterCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#15803d] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label} <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Edit / Create Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <h2 className="text-lg font-bold text-emerald-950">
                {photos.find(p => p.id === editing.id) ? 'Edit Photo' : 'Add New Photo'}
              </h2>
              <button onClick={() => setEditing(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Image URL / Path *</label>
                <input
                  type="text"
                  required
                  value={editing.src}
                  onChange={(e) => setEditing({ ...editing, src: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-mono"
                  placeholder="/images/gallery/photo.jpg"
                />
              </div>

              {/* Preview */}
              {editing.src && (
                <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
                  <img
                    src={editing.src}
                    alt={editing.alt || 'Preview'}
                    className="w-full h-40 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Alt Text / Caption *</label>
                <input
                  type="text"
                  required
                  value={editing.alt}
                  onChange={(e) => setEditing({ ...editing, alt: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                  placeholder="e.g. Indian One-Horned Rhinoceros at Jaldapara"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Category *</label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value as GalleryPhoto['category'] })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                >
                  {categoryOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-200">
                <button type="button" onClick={() => setEditing(null)} className="btn btn-outline py-2 px-4 text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary py-2 px-6 text-xs font-bold uppercase">
                  <Save className="w-4 h-4" />
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden group">
            <div className="h-36 overflow-hidden relative bg-stone-100">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${getCategoryBadgeClass(photo.category)}`}>
                  {getCategoryLabel(photo.category)}
                </span>
              </div>
            </div>
            <div className="p-2.5">
              <p className="text-xs font-bold text-stone-900 truncate mb-2">{photo.alt}</p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditing(photo)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-bold text-stone-600 bg-stone-100 hover:bg-emerald-100 hover:text-emerald-900 rounded-lg transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
          <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-sm text-stone-500 font-medium">No photos in this category.</p>
          <button onClick={handleCreateNew} className="mt-3 text-xs text-[#15803d] font-bold hover:underline">
            + Add a photo
          </button>
        </div>
      )}
    </div>
  );
};
