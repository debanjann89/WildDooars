import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Building as HotelIcon, Image as ImageIcon } from 'lucide-react';
import type { Hotel } from '../../types';
import { apiService } from '../../services/api';
import { SinglePhotoUploader } from '../../components/admin/SinglePhotoUploader';
import { MultiPhotoUploader } from '../../components/admin/MultiPhotoUploader';

const propertyTypes = [
  'Hotel', 'Resort', 'Homestay', 'Cottage', 'Suite', 
  'Deluxe Room', 'Executive Room', 'Resort Grounds'
];

export const AdminHotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Hotel | null>(null);
  
  const [newAmenity, setNewAmenity] = useState('');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const data = await apiService.getHotels();
      setHotels(data);
    } catch (err) {
      setError('Failed to fetch hotels');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditing({
      id: 'stay-' + Date.now(),
      name: '',
      propertyType: 'Hotel',
      location: '',
      description: '',
      amenities: [],
      image: '',
      gallery: [],
      capacity: '',
      bedType: '',
      badge: '',
      isPublished: true
    });
    setNewAmenity('');
  };

  const handleEdit = (hotel: Hotel) => {
    setEditing({ ...hotel });
    setNewAmenity('');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await apiService.deleteHotel(id);
        setHotels(hotels.filter(h => h.id !== id));
      } catch (err) {
        alert('Failed to delete property');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    
    try {
      const hotelToSave: Hotel = {
        ...editing,
        id: editing.id || 'stay-' + Date.now()
      };
      await apiService.saveHotel(hotelToSave);
      setEditing(null);
      await fetchHotels();
    } catch (err) {
      alert('Failed to save property');
    }
  };

  const addAmenity = () => {
    if (!newAmenity.trim() || !editing) return;
    setEditing({
      ...editing,
      amenities: [...(editing.amenities || []), newAmenity.trim()]
    });
    setNewAmenity('');
  };

  const removeAmenity = (index: number) => {
    if (!editing) return;
    const updated = [...(editing.amenities || [])];
    updated.splice(index, 1);
    setEditing({ ...editing, amenities: updated });
  };

  if (loading) return <div className="p-6 text-slate-500 font-bold">Loading properties...</div>;
  if (error) return <div className="p-6 text-red-500 font-bold">{error}</div>;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <HotelIcon className="w-6 h-6 text-[#15803d]" />
            Hotel Management
          </h1>
          <p className="text-sm font-bold text-gray-500 mt-1">Manage all stays, resorts, and properties</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#15803d] text-white rounded-xl hover:bg-green-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="font-bold">Add Property</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotels.map(hotel => (
          <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
            <div className="relative h-48 bg-slate-100">
              {hotel.image ? (
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
              {hotel.badge && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur text-[#15803d] text-xs font-extrabold tracking-wider rounded-lg uppercase shadow-sm">
                  {hotel.badge}
                </div>
              )}
              <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur text-white text-xs font-extrabold tracking-wider rounded-lg uppercase">
                {hotel.propertyType}
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900">{hotel.name}</h3>
                <div className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${hotel.isPublished ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {hotel.isPublished ? 'Published' : 'Draft'}
                </div>
              </div>
              
              <div className="space-y-2 mb-4 text-sm text-slate-600">
                <p><span className="font-bold">Location:</span> {hotel.location}</p>
                {(hotel.capacity || hotel.bedType) && (
                  <p><span className="font-bold">Rooms:</span> {hotel.capacity} {hotel.bedType ? `(${hotel.bedType})` : ''}</p>
                )}
                <p><span className="font-bold">Amenities:</span> {hotel.amenities?.length || 0} items</p>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleEdit(hotel)}
                  className="flex items-center gap-1 px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-bold transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(hotel.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-bold transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {hotels.length === 0 && !loading && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed font-bold">
            No properties found. Add your first property to get started.
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">
                {editing.id.startsWith('stay-') ? 'Add Property' : 'Edit Property'}
              </h2>
              <button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-extrabold tracking-wider text-gray-700 uppercase mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={editing.name}
                    onChange={e => setEditing({ ...editing, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold tracking-wider text-gray-700 uppercase mb-2">Property Type</label>
                  <select
                    value={editing.propertyType}
                    onChange={e => setEditing({ ...editing, propertyType: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d]"
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-extrabold tracking-wider text-gray-700 uppercase mb-2">Location *</label>
                  <input
                    type="text"
                    required
                    value={editing.location}
                    onChange={e => setEditing({ ...editing, location: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d]"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-extrabold tracking-wider text-gray-700 uppercase mb-2">Badge (e.g. Signature Eco Stay)</label>
                  <input
                    type="text"
                    value={editing.badge || ''}
                    onChange={e => setEditing({ ...editing, badge: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold tracking-wider text-gray-700 uppercase mb-2">Capacity (e.g. 2 - 4 Guests)</label>
                  <input
                    type="text"
                    value={editing.capacity || ''}
                    onChange={e => setEditing({ ...editing, capacity: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold tracking-wider text-gray-700 uppercase mb-2">Bed Type (e.g. Double Bed + Daybed)</label>
                  <input
                    type="text"
                    value={editing.bedType || ''}
                    onChange={e => setEditing({ ...editing, bedType: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold tracking-wider text-gray-700 uppercase mb-2">Description *</label>
                <textarea
                  rows={4}
                  required
                  value={editing.description}
                  onChange={e => setEditing({ ...editing, description: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d]"
                />
              </div>

              <div>
                <SinglePhotoUploader
                  label="Hotel / Room Main Image"
                  currentImage={editing.image}
                  aspectHint="Landscape (16:9 or 3:2 recommended)"
                  onImageSelected={(url) => setEditing({ ...editing, image: url })}
                  onRemove={() => setEditing({ ...editing, image: '' })}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold tracking-wider text-gray-700 uppercase mb-2">Amenities</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={e => setNewAmenity(e.target.value)}
                    placeholder="e.g. Free Wi-Fi"
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#15803d]/20 focus:border-[#15803d]"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addAmenity();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addAmenity}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {editing.amenities?.map((amenity, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-sm font-bold text-gray-700">{amenity}</span>
                      <button type="button" onClick={() => removeAmenity(i)} className="text-red-500 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <MultiPhotoUploader
                  label="Hotel / Room Photo Gallery"
                  photos={editing.gallery || []}
                  onPhotosChange={(updated) => setEditing({ ...editing, gallery: updated })}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={editing.isPublished ?? true}
                  onChange={e => setEditing({ ...editing, isPublished: e.target.checked })}
                  className="w-5 h-5 text-[#15803d] rounded border-slate-300 focus:ring-[#15803d]"
                />
                <label htmlFor="isPublished" className="text-sm font-extrabold text-gray-700 uppercase tracking-wider">
                  Published
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-6 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-[#15803d] text-white rounded-xl font-bold hover:bg-green-800 transition-colors"
                >
                  <Save className="w-4 h-4" /> Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


