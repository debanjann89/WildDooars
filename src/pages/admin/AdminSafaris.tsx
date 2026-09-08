import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Trees } from 'lucide-react';
import { apiService } from '../../services/api';
import type { SafariInfo } from '../../types';

export const AdminSafaris: React.FC = () => {
  const [safaris, setSafaris] = useState<SafariInfo[]>([]);
  const [editingSafari, setEditingSafari] = useState<Partial<SafariInfo> | null>(null);

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
      location: '',
      description: '',
      image: '',
      availabilityNote: '',
      isPublished: true
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSafari || !editingSafari.name?.trim()) return;

    const safariToSave: SafariInfo = {
      id: editingSafari.id || 'safari-' + Date.now(),
      name: editingSafari.name.trim(),
      safariType: (editingSafari.safariType as SafariInfo['safariType']) || 'Jeep Safari',
      location: editingSafari.location || '',
      description: editingSafari.description || '',
      image: editingSafari.image || '',
      availabilityNote: editingSafari.availabilityNote || '',
      isPublished: editingSafari.isPublished ?? true
    };

    await apiService.saveSafari(safariToSave);
    setEditingSafari(null);
    await loadSafaris();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this safari listing?')) {
      await apiService.deleteSafari(id);
      await loadSafaris();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-emerald-950">Safari Management</h1>
          <p className="text-xs text-stone-600">
            Manage Jeep safaris, Elephant safaris, and nature trails across Dooars forest ranges.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15803d] hover:bg-[#166534] text-white text-xs font-extrabold uppercase tracking-wider transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Safari
        </button>
      </div>

      {/* Edit Form Modal */}
      {editingSafari && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 w-full max-w-2xl border border-stone-200 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#15803d] flex items-center justify-center">
                  <Trees className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-emerald-950">
                  {editingSafari.name ? 'Edit Safari' : 'Add New Safari'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingSafari(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* 1. Name */}
              <div>
                <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5">
                  Safari Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingSafari.name || ''}
                  onChange={(e) => setEditingSafari({ ...editingSafari, name: e.target.value })}
                  placeholder="e.g. Jaldapara Core Jeep Safari"
                  className="w-full text-sm rounded-xl border border-stone-300 p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              {/* 2 & 3: Safari Type and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5">
                    Safari Type
                  </label>
                  <select
                    value={editingSafari.safariType || 'Jeep Safari'}
                    onChange={(e) =>
                      setEditingSafari({
                        ...editingSafari,
                        safariType: e.target.value as SafariInfo['safariType']
                      })
                    }
                    className="w-full text-sm rounded-xl border border-stone-300 p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                  >
                    <option value="Jeep Safari">Jeep Safari</option>
                    <option value="Elephant Safari">Elephant Safari</option>
                    <option value="Wildlife Trail">Wildlife Trail</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingSafari.location || ''}
                    onChange={(e) => setEditingSafari({ ...editingSafari, location: e.target.value })}
                    placeholder="e.g. Jaldapara National Park (Madarihat Gate)"
                    className="w-full text-sm rounded-xl border border-stone-300 p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              {/* 4. Description */}
              <div>
                <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingSafari.description || ''}
                  onChange={(e) => setEditingSafari({ ...editingSafari, description: e.target.value })}
                  placeholder="Describe safari highlights, zones, and wildlife sightings..."
                  className="w-full text-sm rounded-xl border border-stone-300 p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803d] resize-none"
                />
              </div>

              {/* 5. Image URL with preview */}
              <div>
                <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5">
                  Image URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingSafari.image || ''}
                    onChange={(e) => setEditingSafari({ ...editingSafari, image: e.target.value })}
                    placeholder="https://... or /images/..."
                    className="flex-1 text-sm rounded-xl border border-stone-300 p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803d] font-mono"
                  />
                  {editingSafari.image ? (
                    <img
                      src={editingSafari.image}
                      alt="Preview"
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0 shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl border border-dashed border-stone-300 bg-stone-50 flex items-center justify-center shrink-0 text-stone-400">
                      <Trees className="w-5 h-5 text-stone-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* 6. Availability Note */}
              <div>
                <label className="block text-xs font-extrabold text-stone-700 uppercase tracking-wider mb-1.5">
                  Availability Note
                </label>
                <textarea
                  rows={2}
                  value={editingSafari.availabilityNote || ''}
                  onChange={(e) => setEditingSafari({ ...editingSafari, availabilityNote: e.target.value })}
                  placeholder="e.g. Operates in morning and afternoon shifts. Subject to counter permits."
                  className="w-full text-sm rounded-xl border border-stone-300 p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803d] resize-none"
                />
              </div>

              {/* 7. Published toggle */}
              <div className="pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editingSafari.isPublished ?? true}
                    onChange={(e) => setEditingSafari({ ...editingSafari, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-[#15803d] focus:ring-[#15803d] border-stone-300 accent-[#15803d] cursor-pointer"
                  />
                  <span className="text-xs font-extrabold text-stone-700 uppercase tracking-wider">
                    Published (Visible on public website)
                  </span>
                </label>
              </div>

              {/* 8. Save / Cancel buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-200 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingSafari(null)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#15803d] hover:bg-[#166534] text-white text-xs font-extrabold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Safari
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List view: Cards in 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safaris.map((s) => (
          <div
            key={s.id}
            className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <img
                src={s.image || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'}
                alt={s.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 border border-stone-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      s.safariType === 'Elephant Safari'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : s.safariType === 'Wildlife Trail'
                        ? 'bg-teal-50 text-teal-800 border-teal-200'
                        : 'bg-emerald-50 text-[#15803d] border-emerald-200'
                    }`}
                  >
                    <Trees className="w-3 h-3" />
                    {s.safariType}
                  </span>
                  {s.isPublished === false && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 border border-stone-200">
                      Draft
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-emerald-950 text-base leading-snug truncate">
                  {s.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                  {s.location || 'Location not specified'}
                </p>
                {s.description && (
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {s.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100">
              <span className="text-[11px] text-stone-400 font-medium truncate max-w-[220px]" title={s.availabilityNote}>
                {s.availabilityNote || 'No special booking note'}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setEditingSafari(s)}
                  className="p-2 text-stone-600 hover:text-[#15803d] hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
                  title="Edit Safari"
                  aria-label="Edit Safari"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  title="Delete Safari"
                  aria-label="Delete Safari"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {safaris.length === 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#15803d] flex items-center justify-center mx-auto mb-3">
            <Trees className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No safaris configured</h3>
          <p className="text-xs text-stone-500 mt-1 mb-4">
            Add jungle safaris and wildlife trails to display on the website.
          </p>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#15803d] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#166534] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Safari
          </button>
        </div>
      )}
    </div>
  );
};
