import React, { useEffect, useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { apiService } from '../../services/api';
import type { Destination } from '../../types';

export const AdminDestinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [editingDest, setEditingDest] = useState<Partial<Destination> | null>(null);

  useEffect(() => {
    loadDestinations();
  }, []);

  async function loadDestinations() {
    const list = await apiService.getDestinations();
    setDestinations(list);
  }

  const handleCreateNew = () => {
    setEditingDest({
      id: 'dest-' + Date.now(),
      name: '',
      slug: '',
      intro: '',
      description: '',
      mainImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      gallery: [],
      attractions: ['Sightseeing Point 1', 'Sightseeing Point 2'],
      activities: ['Jungle Walk', 'Photography'],
      isFeatured: true,
      isPublished: true
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest?.name || !editingDest?.slug) return;

    await apiService.saveDestination(editingDest as Destination);
    setEditingDest(null);
    loadDestinations();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this destination?')) {
      await apiService.deleteDestination(id);
      loadDestinations();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-emerald-950">Destination Management</h1>
          <p className="text-xs text-stone-600">Manage tourist places (Jaldapara, Buxa, Gorumara, Cooch Behar, Phuentsholing).</p>
        </div>
        <button onClick={handleCreateNew} className="btn btn-primary text-xs py-2 px-4">
          <Plus className="w-4 h-4" />
          Add Destination
        </button>
      </div>

      {editingDest && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <h2 className="text-xl font-bold text-emerald-950">
                {editingDest.id ? 'Edit Destination' : 'Add Destination'}
              </h2>
              <button onClick={() => setEditingDest(null)} className="text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">Destination Name *</label>
                  <input
                    type="text"
                    required
                    value={editingDest.name || ''}
                    onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingDest.slug || ''}
                    onChange={(e) => setEditingDest({ ...editingDest, slug: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Main Image URL</label>
                <input
                  type="text"
                  value={editingDest.mainImage || ''}
                  onChange={(e) => setEditingDest({ ...editingDest, mainImage: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Intro Heading</label>
                <input
                  type="text"
                  value={editingDest.intro || ''}
                  onChange={(e) => setEditingDest({ ...editingDest, intro: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Full Description</label>
                <textarea
                  rows={4}
                  value={editingDest.description || ''}
                  onChange={(e) => setEditingDest({ ...editingDest, description: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-200">
                <button type="button" onClick={() => setEditingDest(null)} className="btn btn-outline py-2 px-4 text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary py-2 px-6 text-xs font-bold uppercase">
                  <Save className="w-4 h-4" />
                  Save Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {destinations.map((d) => (
          <div key={d.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={d.mainImage} alt={d.name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-emerald-950 text-base">{d.name}</h3>
                <p className="text-xs text-stone-500 line-clamp-1">{d.intro}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditingDest(d)} className="p-2 text-stone-600 hover:text-emerald-900">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(d.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
