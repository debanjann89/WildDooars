import React, { useEffect, useState } from 'react';
import { Hotel as HotelIcon, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { apiService } from '../../services/api';
import type { Hotel } from '../../types';

export const AdminHotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [editingHotel, setEditingHotel] = useState<Partial<Hotel> | null>(null);

  useEffect(() => {
    loadHotels();
  }, []);

  async function loadHotels() {
    const list = await apiService.getHotels();
    setHotels(list);
  }

  const handleCreateNew = () => {
    setEditingHotel({
      id: 'hotel-' + Date.now(),
      name: '',
      propertyType: 'Resort',
      location: 'Madarihat / Jaldapara',
      description: '',
      amenities: ['Wi-Fi', 'Restaurant', 'Hot Water'],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      isPublished: true
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHotel?.name) return;

    await apiService.saveHotel(editingHotel as Hotel);
    setEditingHotel(null);
    loadHotels();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete hotel listing?')) {
      await apiService.deleteHotel(id);
      loadHotels();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-emerald-950">Accommodations Management</h1>
          <p className="text-xs text-stone-600">Manage Hotels, Resorts, and Homestays in Dooars. (NO pricing fields)</p>
        </div>
        <button onClick={handleCreateNew} className="btn btn-primary text-xs py-2 px-4">
          <Plus className="w-4 h-4" />
          Add Hotel
        </button>
      </div>

      {editingHotel && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <h2 className="text-xl font-bold text-emerald-950">Edit Accommodation</h2>
              <button onClick={() => setEditingHotel(null)} className="text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Property Name *</label>
                <input
                  type="text"
                  required
                  value={editingHotel.name || ''}
                  onChange={(e) => setEditingHotel({ ...editingHotel, name: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">Property Type</label>
                  <select
                    value={editingHotel.propertyType || 'Resort'}
                    onChange={(e) => setEditingHotel({ ...editingHotel, propertyType: e.target.value as any })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Resort">Resort</option>
                    <option value="Homestay">Homestay</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={editingHotel.location || ''}
                    onChange={(e) => setEditingHotel({ ...editingHotel, location: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingHotel.image || ''}
                  onChange={(e) => setEditingHotel({ ...editingHotel, image: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingHotel.description || ''}
                  onChange={(e) => setEditingHotel({ ...editingHotel, description: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-200">
                <button type="button" onClick={() => setEditingHotel(null)} className="btn btn-outline py-2 px-4 text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary py-2 px-6 text-xs font-bold uppercase">
                  <Save className="w-4 h-4" />
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map((h) => (
          <div key={h.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={h.image} alt={h.name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-emerald-950 text-base">{h.name}</h3>
                <span className="text-xs text-amber-700 font-semibold">{h.propertyType} · {h.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditingHotel(h)} className="p-2 text-stone-600 hover:text-emerald-900">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(h.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
