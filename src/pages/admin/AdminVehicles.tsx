import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Car } from 'lucide-react';
import { apiService } from '../../services/api';
import type { Vehicle } from '../../types';

export const AdminVehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editingVehicle, setEditingVehicle] = useState<Partial<Vehicle> | null>(null);
  const [newFeature, setNewFeature] = useState<string>('');

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const list = await apiService.getVehicles();
    setVehicles(list);
  };

  const handleCreateNew = () => {
    setEditingVehicle({
      id: 'veh-' + Date.now(),
      name: '',
      seatingCapacity: '7 - 8 Passengers',
      fuelType: 'Diesel',
      acType: 'AC',
      features: [],
      image: '',
      isPublished: true,
    });
    setNewFeature('');
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle({
      ...vehicle,
      features: vehicle.features ? [...vehicle.features] : [],
    });
    setNewFeature('');
  };

  const handleAddFeature = () => {
    if (!newFeature.trim() || !editingVehicle) return;
    const updatedFeatures = [...(editingVehicle.features || []), newFeature.trim()];
    setEditingVehicle({
      ...editingVehicle,
      features: updatedFeatures,
    });
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingVehicle) return;
    const updated = [...(editingVehicle.features || [])];
    updated.splice(index, 1);
    setEditingVehicle({
      ...editingVehicle,
      features: updated,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle || !editingVehicle.name?.trim()) return;

    const payload: Vehicle = {
      id: editingVehicle.id || 'veh-' + Date.now(),
      name: editingVehicle.name.trim(),
      seatingCapacity: editingVehicle.seatingCapacity?.trim() || '',
      fuelType: editingVehicle.fuelType?.trim() || '',
      acType: editingVehicle.acType || 'AC',
      features: editingVehicle.features || [],
      image: editingVehicle.image?.trim() || '',
      isPublished: editingVehicle.isPublished ?? true,
    };

    await apiService.saveVehicle(payload);
    setEditingVehicle(null);
    setNewFeature('');
    await loadVehicles();
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the fleet?`)) {
      await apiService.deleteVehicle(id);
      await loadVehicles();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#15803d] flex items-center justify-center shrink-0">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase text-slate-900 tracking-tight">Fleet & Car Management</h1>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Manage safari vehicles, SUVs & tourist cabs across Dooars
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCreateNew}
          className="inline-flex items-center justify-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle
        </button>
      </div>

      {/* Vehicle Cards Grid (2-column layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              {/* Thumbnail */}
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                {vehicle.image ? (
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Car className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Vehicle Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-emerald-50 text-[#15803d] border border-emerald-200">
                    {vehicle.acType}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${
                      vehicle.isPublished !== false
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {vehicle.isPublished !== false ? 'Published' : 'Draft'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 truncate">{vehicle.name}</h3>

                <div className="text-xs text-slate-600 mt-1 space-y-0.5">
                  <p>
                    <span className="font-extrabold uppercase tracking-wider text-slate-500">Capacity: </span>
                    <span className="font-bold text-slate-800">{vehicle.seatingCapacity || 'N/A'}</span>
                  </p>
                  <p>
                    <span className="font-extrabold uppercase tracking-wider text-slate-500">Fuel: </span>
                    <span className="font-bold text-slate-800">{vehicle.fuelType || 'N/A'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Features preview & count */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  {vehicle.features?.length || 0} {(vehicle.features?.length || 0) === 1 ? 'Feature' : 'Features'}
                </span>
                {vehicle.features && vehicle.features.length > 0 && (
                  <span className="text-slate-300">•</span>
                )}
                {vehicle.features?.slice(0, 2).map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md truncate max-w-[120px]"
                  >
                    {feat}
                  </span>
                ))}
                {(vehicle.features?.length || 0) > 2 && (
                  <span className="text-[11px] font-bold text-slate-400">
                    +{(vehicle.features?.length || 0) - 2} more
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleEdit(vehicle)}
                  title="Edit Vehicle"
                  className="p-2 text-slate-600 hover:text-[#15803d] hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(vehicle.id, vehicle.name)}
                  title="Delete Vehicle"
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {vehicles.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#15803d] mx-auto flex items-center justify-center mb-3">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold uppercase tracking-wider text-slate-800">No Vehicles in Fleet</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Add your first vehicle listing with seating, AC options, and features.
            </p>
            <button
              type="button"
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Vehicle
            </button>
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      {editingVehicle && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 w-full max-w-2xl border border-slate-200 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#15803d] flex items-center justify-center">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase text-slate-900 tracking-tight">
                    {editingVehicle.id && vehicles.some((v) => v.id === editingVehicle.id)
                      ? 'Edit Vehicle'
                      : 'Add New Vehicle'}
                  </h2>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Configure fleet specs & amenities (No pricing fields)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingVehicle(null);
                  setNewFeature('');
                }}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="space-y-4">
              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Vehicle Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Toyota Innova Crysta / Mahindra Bolero"
                  value={editingVehicle.name || ''}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent transition-all"
                />
              </div>

              {/* Grid 2 cols: Seating Capacity & Fuel Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Field 2: Seating Capacity */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    Seating Capacity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 7 - 8 Passengers"
                    value={editingVehicle.seatingCapacity || ''}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, seatingCapacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent transition-all"
                  />
                </div>

                {/* Field 3: Fuel Type */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                    Fuel Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Diesel, Petrol / CNG"
                    value={editingVehicle.fuelType || ''}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, fuelType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Field 4: AC Type */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  AC Type
                </label>
                <select
                  value={editingVehicle.acType || 'AC'}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      acType: e.target.value as Vehicle['acType'],
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent transition-all"
                >
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                  <option value="Both Available">Both Available</option>
                  <option value="Non-AC / AC">Non-AC / AC</option>
                </select>
              </div>

              {/* Field 5: Features List */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Features & Amenities
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    placeholder="e.g. Pushback Seats, Dual AC, Ample Luggage Boot"
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2.5 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                  >
                    Add Feature
                  </button>
                </div>

                {/* Features Tag List */}
                <div className="flex flex-wrap gap-2 mt-2.5 min-h-[32px]">
                  {editingVehicle.features && editingVehicle.features.length > 0 ? (
                    editingVehicle.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-full text-xs font-bold"
                      >
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="p-0.5 rounded-full text-emerald-700 hover:text-emerald-950 hover:bg-emerald-200/60 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No features added yet.</span>
                  )}
                </div>
              </div>

              {/* Field 6: Image URL with Preview Thumbnail */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5">
                  Image URL
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={editingVehicle.image || ''}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, image: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#15803d] focus:border-transparent transition-all"
                  />
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0 flex items-center justify-center">
                    {editingVehicle.image ? (
                      <img
                        src={editingVehicle.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    ) : (
                      <Car className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Field 7: Published Toggle */}
              <div className="pt-2">
                <label className="inline-flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingVehicle.isPublished ?? true}
                    onChange={(e) =>
                      setEditingVehicle({
                        ...editingVehicle,
                        isPublished: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-[#15803d] border-slate-300 rounded focus:ring-[#15803d] cursor-pointer"
                  />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Publish vehicle listing on live website
                  </span>
                </label>
              </div>

              {/* Field 8: Save / Cancel Buttons */}
              <div className="pt-5 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setEditingVehicle(null);
                    setNewFeature('');
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-slate-600 hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#166534] text-white px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
