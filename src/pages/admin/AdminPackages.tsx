import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { apiService } from '../../services/api';
import type { Package, ItineraryDay } from '../../types';

export const AdminPackages: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [editingPkg, setEditingPkg] = useState<Partial<Package> | null>(null);

  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    const list = await apiService.getPackages();
    setPackages(list);
  }

  const handleCreateNew = () => {
    setEditingPkg({
      id: 'pkg-' + Date.now(),
      name: '',
      slug: '',
      destination: 'Jaldapara National Park',
      category: 'Package Tours',
      duration: '4 Days / 3 Nights',
      shortDescription: '',
      fullDescription: '',
      mainImage: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1000&q=80',
      highlights: [],
      inclusions: ['Accommodation', 'Dedicated AC Car', 'Driver allowances & fuel'],
      exclusions: ['Forest entry fees & safaris'],
      itinerary: [
        { dayNumber: 1, title: 'Arrival & Welcome', description: 'Pickup and transfer to resort.' }
      ],
      isFeatured: true,
      isPublished: true
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg?.name || !editingPkg?.slug) return;

    await apiService.savePackage(editingPkg as Package);
    setEditingPkg(null);
    loadPackages();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tour package?')) {
      await apiService.deletePackage(id);
      loadPackages();
    }
  };

  const addItineraryDay = () => {
    if (!editingPkg) return;
    const current = editingPkg.itinerary || [];
    const nextDay: ItineraryDay = {
      dayNumber: current.length + 1,
      title: `Day ${current.length + 1} Activity`,
      description: 'Activity details...'
    };
    setEditingPkg({ ...editingPkg, itinerary: [...current, nextDay] });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-emerald-950">Package Management</h1>
          <p className="text-xs text-stone-600">Create & edit Dooars tour itineraries. (No pricing displayed on public UI)</p>
        </div>
        <button onClick={handleCreateNew} className="btn btn-primary text-xs py-2 px-4">
          <Plus className="w-4 h-4" />
          Add New Package
        </button>
      </div>

      {/* Edit Form Modal */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl my-8 border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <h2 className="text-xl font-bold text-emerald-950">
                {editingPkg.id ? 'Edit Package' : 'Create New Package'}
              </h2>
              <button onClick={() => setEditingPkg(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">Package Name *</label>
                  <input
                    type="text"
                    required
                    value={editingPkg.name || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingPkg.slug || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, slug: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">Category</label>
                  <select
                    value={editingPkg.category || 'Package Tours'}
                    onChange={(e) => setEditingPkg({ ...editingPkg, category: e.target.value as any })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                  >
                    <option value="Family">Family</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Package Tours">Package Tours</option>
                    <option value="Customized">Customized</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingPkg.duration || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, duration: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                    placeholder="e.g. 4 Days / 3 Nights"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">Main Destination</label>
                  <input
                    type="text"
                    value={editingPkg.destination || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, destination: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Main Image URL</label>
                <input
                  type="text"
                  value={editingPkg.mainImage || ''}
                  onChange={(e) => setEditingPkg({ ...editingPkg, mainImage: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingPkg.shortDescription || ''}
                  onChange={(e) => setEditingPkg({ ...editingPkg, shortDescription: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Full Description</label>
                <textarea
                  rows={4}
                  value={editingPkg.fullDescription || ''}
                  onChange={(e) => setEditingPkg({ ...editingPkg, fullDescription: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                />
              </div>

              {/* Itinerary Builder */}
              <div className="border-t border-stone-200 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold uppercase text-stone-700">Day by Day Itinerary</span>
                  <button type="button" onClick={addItineraryDay} className="btn btn-outline py-1 px-3 text-xs">
                    + Add Day
                  </button>
                </div>

                <div className="space-y-3">
                  {editingPkg.itinerary?.map((day, idx) => (
                    <div key={idx} className="p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-2">
                      <div className="flex items-center justify-between font-bold text-emerald-950">
                        <span>Day {day.dayNumber}</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Day Title"
                        value={day.title}
                        onChange={(e) => {
                          const updated = [...(editingPkg.itinerary || [])];
                          updated[idx].title = e.target.value;
                          setEditingPkg({ ...editingPkg, itinerary: updated });
                        }}
                        className="w-full p-2 bg-white border border-stone-300 rounded text-xs font-bold"
                      />
                      <textarea
                        rows={2}
                        placeholder="Day Description"
                        value={day.description}
                        onChange={(e) => {
                          const updated = [...(editingPkg.itinerary || [])];
                          updated[idx].description = e.target.value;
                          setEditingPkg({ ...editingPkg, itinerary: updated });
                        }}
                        className="w-full p-2 bg-white border border-stone-300 rounded text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-200">
                <button type="button" onClick={() => setEditingPkg(null)} className="btn btn-outline py-2 px-4 text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary py-2 px-6 text-xs font-bold uppercase">
                  <Save className="w-4 h-4" />
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Package List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {pkg.category}
                </span>
                <span className="text-xs text-stone-500 font-medium">{pkg.duration}</span>
              </div>
              <h3 className="text-base font-bold text-emerald-950 mb-1">{pkg.name}</h3>
              <p className="text-xs text-stone-500 mb-3">{pkg.destination}</p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
              <button
                onClick={() => setEditingPkg(pkg)}
                className="btn btn-outline flex-1 py-1.5 text-xs"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(pkg.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
