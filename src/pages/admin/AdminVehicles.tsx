import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { apiService } from '../../services/api';
import type { Vehicle } from '../../types';

export const AdminVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editingVehicle, setEditingVehicle] = useState<Partial<Vehicle> | null>(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles() {
    const list = await apiService.getVehicles();
    setVehicles(list);
  }

  const handleCreateNew = () => {
    setEditingVehicle({
      id: 'veh-' + Date.now(),
      name: '',
      seatingCapacity: '7 Passengers',
      fuelType: 'Diesel',
      acType: 'AC',
      features: ['Spacious Boot', 'Pushback Seats'],
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      isPublished: true
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle?.name) return;

    await apiService.saveVehicle(editingVehicle as Vehicle);
    setEditingVehicle(null);
    loadVehicles();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete vehicle from fleet?')) {
      await apiService.deleteVehicle(id);
      loadVehicles();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-emerald-950">Car Rental Fleet Management</h1>
          <p className="text-xs text-stone-600">Manage Innova, Bolero, Sumo, Ertiga, Dzire & WagonR options. (NO public or admin pricing)</p>
        </div>
        <button onClick={handleCreateNew} className="btn btn-primary text-xs py-2 px-4">
          <Plus className="w-4 h-4" />
          Add Vehicle
        </button>
      </div>

      {editingVehicle && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl border border-stone-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <h2 className="text-xl font-bold text-emerald-950">Edit Vehicle Options</h2>
              <button onClick={() => setEditingVehicle(null)} className="text-stone-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Vehicle Name *</label>
                <input
                  type="text"
                  required
                  value={editingVehicle.name || ''}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">Seating Capacity</label>
                  <input
                    type="text"
                    value={editingVehicle.seatingCapacity || ''}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, seatingCapacity: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">AC Type</label>
                  <select
                    value={editingVehicle.acType || 'AC'}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, acType: e.target.value as any })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm"
                  >
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                    <option value="Both Available">Both Available</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingVehicle.image || ''}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, image: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm font-mono"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-200">
                <button type="button" onClick={() => setEditingVehicle(null)} className="btn btn-outline py-2 px-4 text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary py-2 px-6 text-xs font-bold uppercase">
                  <Save className="w-4 h-4" />
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={v.image} alt={v.name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h3 className="font-bold text-emerald-950 text-base">{v.name}</h3>
                <span className="text-xs text-stone-500">{v.seatingCapacity} · {v.acType}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditingVehicle(v)} className="p-2 text-stone-600 hover:text-emerald-900">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(v.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
