import React, { useEffect, useState } from 'react';
import { Trees, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { apiService } from '../../services/api';
import type { SafariInfo } from '../../types';

export const AdminSafaris: React.FC = () => {
  const [safaris, setSafaris] = useState<SafariInfo[]>([]);
  const [editingSafari, setEditingSafari] = useState<Partial<SafariInfo>> | null>(null);

  useEffect(() => {
    loadSafaris();
  }, []);

  async function loadSafaris() {
    const list = await apiService.getSafaris();
    setSafaris(list);
  }

  const handleCreateNew = () => {
    setEditingSafari({
      id: 'safari-' + Date.now(),
      name: '',
      safariType: 'Jeep Safari',
      location: 'Jaldapara National Park',
      description: '',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      availabilityNote: 'Subject to Forest Department counter permits.'
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSafari?.name) return;

    await apiService.saveSafari(editingSafari as SafariInfo);
    setEditingSafari(null);
    loadSafaris();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete safari info?')) {
      await apiService.deleteSafari(id);
      loadSafaris();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-emerald-950">Safari Information Management</h1>
          <p className="text-xs text-stone-600">Update safari descriptions, locations, and permit guidelines.</p>
        </div>
        <button onClick={handleCreateNew} className="btn btn-primary text-xs py-2 px-4">
          <Plus className="w-4 h-4" />
          Add Safari
        </button>
      </div>

      {editingSafari && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <h2 className="text-xl font-bold text-emerald-950">Edit Safari Details</h2>
              <button onClick={() => setEditingSafari(null)} className="text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Safari Name *</label>
                <input
                  type="text"
                  required
                  value={editingSafari.name || ''}
                  onChange={(e) => setEditingSafari({ ...editingSafari, name: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">Safari Type</label>
                  <select
                    value={editingSafari.safariType || 'Jeep Safari'}
                    onChange={(e) => setEditingSafari({ ...editingSafari, safariType: e.target.value as any })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                  >
                    <option value="Jeep Safari">Jeep Safari</option>
                    <option value="Elephant Safari">Elephant Safari</option>
                    <option value="Wildlife Trail">Wildlife Trail</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={editingSafari.location || ''}
                    onChange={(e) => setEditingSafari({ ...editingSafari, location: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingSafari.image || ''}
                  onChange={(e) => setEditingSafari({ ...editingSafari, image: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingSafari.description || ''}
                  onChange={(e) => setEditingSafari({ ...editingSafari, description: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Availability Note</label>
                <input
                  type="text"
                  value={editingSafari.availabilityNote || ''}
                  onChange={(e) => setEditingSafari({ ...editingSafari, availabilityNote: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-200">
                <button type="button" onClick={() => setEditingSafari(null)} className="btn btn-outline py-2 px-4 text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary py-2 px-6 text-xs font-bold uppercase">
                  <Save className="w-4 h-4" />
                  Save Safari
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safaris.map((s) => (
          <div key={s.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={s.image} alt={s.name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-emerald-950 text-base">{s.name}</h3>
                <span className="text-xs text-amber-700 font-semibold">{s.safariType} · {s.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditingSafari(s)} className="p-2 text-stone-600 hover:text-emerald-900">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(s.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
