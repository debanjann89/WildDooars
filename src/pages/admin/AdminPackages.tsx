import React, { useState, useEffect } from 'react';
import type { Package, ItineraryDay, FAQItem } from '../../types';
import { apiService } from '../../services/api';
import { Edit, Trash2, Plus, X, Image as ImageIcon, Save } from 'lucide-react';

export const AdminPackages: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Package> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New item states
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newActivityInputs, setNewActivityInputs] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const data = await apiService.getPackages();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (editing) {
      setEditing({
        ...editing,
        name,
        slug: editing.slug || generateSlug(name)
      });
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      const packageToSave: Package = {
        id: editing.id || 'pkg-' + Date.now(),
        name: editing.name || 'Untitled Tour Package',
        slug: editing.slug || generateSlug(editing.name || 'untitled-tour'),
        destination: editing.destination || '',
        category: editing.category || 'Package Tours',
        duration: editing.duration || '',
        shortDescription: editing.shortDescription || '',
        fullDescription: editing.fullDescription || '',
        mainImage: editing.mainImage || '',
        gallery: editing.gallery || [],
        highlights: editing.highlights || [],
        inclusions: editing.inclusions || [],
        exclusions: editing.exclusions || [],
        itinerary: editing.itinerary || [],
        importantNotes: editing.importantNotes || [],
        faqs: editing.faqs || [],
        isFeatured: editing.isFeatured ?? false,
        isPublished: editing.isPublished ?? true
      };
      await apiService.savePackage(packageToSave);
      setIsModalOpen(false);
      setEditing(null);
      fetchPackages();
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await apiService.deletePackage(id);
        fetchPackages();
      } catch (error) {
        console.error('Error deleting package:', error);
      }
    }
  };

  const openNewModal = () => {
    setEditing({
      id: 'pkg-' + Date.now(),
      name: '',
      slug: '',
      destination: '',
      duration: '',
      shortDescription: '',
      fullDescription: '',
      mainImage: '',
      category: 'Package Tours',
      gallery: [],
      highlights: [],
      inclusions: [],
      exclusions: [],
      itinerary: [],
      importantNotes: [],
      faqs: [],
      isFeatured: false,
      isPublished: true
    });
    setNewActivityInputs({});
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: Package) => {
    setEditing({ ...pkg });
    setNewActivityInputs({});
    setIsModalOpen(true);
  };

  // Generic array item handlers
  const addItem = (field: keyof Package, value: string, setter: (val: string) => void) => {
    if (!value.trim() || !editing) return;
    const currentList = (editing[field] as string[]) || [];
    setEditing({ ...editing, [field]: [...currentList, value.trim()] });
    setter('');
  };

  const removeItem = (field: keyof Package, index: number) => {
    if (!editing) return;
    const currentList = [...((editing[field] as string[]) || [])];
    currentList.splice(index, 1);
    setEditing({ ...editing, [field]: currentList });
  };

  // Itinerary handlers
  const addDay = () => {
    if (!editing) return;
    const currentItinerary = editing.itinerary || [];
    setEditing({
      ...editing,
      itinerary: [
        ...currentItinerary,
        {
          dayNumber: currentItinerary.length + 1,
          title: '',
          description: '',
          activities: []
        }
      ]
    });
  };

  const removeDay = (index: number) => {
    if (!editing) return;
    const currentItinerary = [...(editing.itinerary || [])];
    currentItinerary.splice(index, 1);
    // Recalculate day numbers
    const updatedItinerary = currentItinerary.map((day, i) => ({ ...day, dayNumber: i + 1 }));
    setEditing({ ...editing, itinerary: updatedItinerary });
  };

  const updateDay = (index: number, field: keyof ItineraryDay, value: any) => {
    if (!editing) return;
    const currentItinerary = [...(editing.itinerary || [])];
    currentItinerary[index] = { ...currentItinerary[index], [field]: value };
    setEditing({ ...editing, itinerary: currentItinerary });
  };

  const addActivity = (dayIndex: number) => {
    const act = newActivityInputs[dayIndex];
    if (!act?.trim() || !editing) return;
    const currentItinerary = [...(editing.itinerary || [])];
    const day = currentItinerary[dayIndex];
    const currentActivities = day.activities || [];
    currentItinerary[dayIndex] = { ...day, activities: [...currentActivities, act.trim()] };
    setEditing({ ...editing, itinerary: currentItinerary });
    setNewActivityInputs({ ...newActivityInputs, [dayIndex]: '' });
  };

  const removeActivity = (dayIndex: number, actIndex: number) => {
    if (!editing) return;
    const currentItinerary = [...(editing.itinerary || [])];
    const day = currentItinerary[dayIndex];
    const currentActivities = [...(day.activities || [])];
    currentActivities.splice(actIndex, 1);
    currentItinerary[dayIndex] = { ...day, activities: currentActivities };
    setEditing({ ...editing, itinerary: currentItinerary });
  };

  // FAQ handlers
  const addFaq = () => {
    if (!editing) return;
    const currentFaqs = editing.faqs || [];
    setEditing({
      ...editing,
      faqs: [...currentFaqs, { question: '', answer: '' }]
    });
  };

  const removeFaq = (index: number) => {
    if (!editing) return;
    const currentFaqs = [...(editing.faqs || [])];
    currentFaqs.splice(index, 1);
    setEditing({ ...editing, faqs: currentFaqs });
  };

  const updateFaq = (index: number, field: keyof FAQItem, value: string) => {
    if (!editing) return;
    const currentFaqs = [...(editing.faqs || [])];
    currentFaqs[index] = { ...currentFaqs[index], [field]: value };
    setEditing({ ...editing, faqs: currentFaqs });
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading packages...</div>;
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Packages</h1>
        <button
          onClick={openNewModal}
          className="bg-primary hover:bg-green-700 text-white px-4 py-2 rounded-xl flex items-center font-bold"
        >
          <Plus size={20} className="mr-2" /> Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-2xl shadow-sm border p-4 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-primary uppercase tracking-wider mb-1">
                  {pkg.category} • {pkg.duration}
                </span>
                <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{pkg.destination}</p>
              </div>
              {pkg.mainImage ? (
                <img src={pkg.mainImage} alt={pkg.name} className="w-20 h-20 object-cover rounded-xl" />
              ) : (
                <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                  <ImageIcon size={24} />
                </div>
              )}
            </div>
            
            <div className="mt-auto flex justify-end gap-2 pt-4 border-t">
              <button
                onClick={() => openEditModal(pkg)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                title="Edit"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => pkg.id && handleDelete(pkg.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-6 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {editing.id ? 'Edit Package' : 'Add New Package'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8 flex-1">
              {/* Basic Info */}
              <section>
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Basic Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Name</label>
                    <input
                      type="text"
                      value={editing.name || ''}
                      onChange={handleNameChange}
                      className="w-full border rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Slug</label>
                    <input
                      type="text"
                      value={editing.slug || ''}
                      onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                      className="w-full border rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Category</label>
                    <select
                      value={editing.category || 'Package Tours'}
                      onChange={(e) => setEditing({ ...editing, category: e.target.value as any })}
                      className="w-full border rounded-xl px-3 py-2 text-sm"
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
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Duration</label>
                    <input
                      type="text"
                      value={editing.duration || ''}
                      onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
                      placeholder="e.g. 3 Days 2 Nights"
                      className="w-full border rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Destination</label>
                    <input
                      type="text"
                      value={editing.destination || ''}
                      onChange={(e) => setEditing({ ...editing, destination: e.target.value })}
                      className="w-full border rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Main Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editing.mainImage || ''}
                        onChange={(e) => setEditing({ ...editing, mainImage: e.target.value })}
                        className="flex-1 border rounded-xl px-3 py-2 text-sm"
                      />
                      {editing.mainImage && (
                        <img src={editing.mainImage} alt="Preview" className="w-10 h-10 object-cover rounded" />
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Descriptions */}
              <section>
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Descriptions</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={editing.shortDescription || ''}
                      onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
                      className="w-full border rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Full Description</label>
                    <textarea
                      rows={4}
                      value={editing.fullDescription || ''}
                      onChange={(e) => setEditing({ ...editing, fullDescription: e.target.value })}
                      className="w-full border rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </section>

              {/* Lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Gallery */}
                <section>
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-2">Gallery</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      placeholder="Image URL"
                      className="flex-1 border rounded-xl px-3 py-2 text-sm"
                    />
                    <button onClick={() => addItem('gallery', newGalleryUrl, setNewGalleryUrl)} className="bg-primary text-white px-3 py-2 rounded-xl text-sm font-bold">Add</button>
                  </div>
                  <ul className="space-y-2">
                    {(editing.gallery || []).map((url, idx) => (
                      <li key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <img src={url} alt="Gallery thumb" className="w-8 h-8 object-cover rounded" />
                          <span className="text-xs truncate">{url}</span>
                        </div>
                        <button onClick={() => removeItem('gallery', idx)} className="text-red-500 hover:bg-red-50 p-1 rounded"><X size={14} /></button>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Highlights */}
                <section>
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-2">Highlights</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      placeholder="Highlight"
                      className="flex-1 border rounded-xl px-3 py-2 text-sm"
                    />
                    <button onClick={() => addItem('highlights', newHighlight, setNewHighlight)} className="bg-primary text-white px-3 py-2 rounded-xl text-sm font-bold">Add</button>
                  </div>
                  <ul className="space-y-2">
                    {(editing.highlights || []).map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border">
                        <span className="text-sm">{item}</span>
                        <button onClick={() => removeItem('highlights', idx)} className="text-red-500 hover:bg-red-50 p-1 rounded"><X size={14} /></button>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Inclusions */}
                <section>
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-2">Inclusions</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newInclusion}
                      onChange={(e) => setNewInclusion(e.target.value)}
                      placeholder="Inclusion"
                      className="flex-1 border rounded-xl px-3 py-2 text-sm"
                    />
                    <button onClick={() => addItem('inclusions', newInclusion, setNewInclusion)} className="bg-primary text-white px-3 py-2 rounded-xl text-sm font-bold">Add</button>
                  </div>
                  <ul className="space-y-2">
                    {(editing.inclusions || []).map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border">
                        <span className="text-sm">{item}</span>
                        <button onClick={() => removeItem('inclusions', idx)} className="text-red-500 hover:bg-red-50 p-1 rounded"><X size={14} /></button>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Exclusions */}
                <section>
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-2">Exclusions</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newExclusion}
                      onChange={(e) => setNewExclusion(e.target.value)}
                      placeholder="Exclusion"
                      className="flex-1 border rounded-xl px-3 py-2 text-sm"
                    />
                    <button onClick={() => addItem('exclusions', newExclusion, setNewExclusion)} className="bg-primary text-white px-3 py-2 rounded-xl text-sm font-bold">Add</button>
                  </div>
                  <ul className="space-y-2">
                    {(editing.exclusions || []).map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border">
                        <span className="text-sm">{item}</span>
                        <button onClick={() => removeItem('exclusions', idx)} className="text-red-500 hover:bg-red-50 p-1 rounded"><X size={14} /></button>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Important Notes */}
                <section>
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-2">Important Notes</h3>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Important Note"
                      className="flex-1 border rounded-xl px-3 py-2 text-sm"
                    />
                    <button onClick={() => addItem('importantNotes', newNote, setNewNote)} className="bg-primary text-white px-3 py-2 rounded-xl text-sm font-bold">Add</button>
                  </div>
                  <ul className="space-y-2">
                    {(editing.importantNotes || []).map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border">
                        <span className="text-sm">{item}</span>
                        <button onClick={() => removeItem('importantNotes', idx)} className="text-red-500 hover:bg-red-50 p-1 rounded"><X size={14} /></button>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Itinerary */}
              <section>
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">Itinerary</h3>
                  <button onClick={addDay} className="text-primary hover:text-green-700 text-sm font-bold flex items-center">
                    <Plus size={16} className="mr-1" /> Add Day
                  </button>
                </div>
                <div className="space-y-4">
                  {(editing.itinerary || []).map((day, dIdx) => (
                    <div key={dIdx} className="bg-stone-50 border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">Day {day.dayNumber}</span>
                        <button onClick={() => removeDay(dIdx)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Title</label>
                          <input
                            type="text"
                            value={day.title}
                            onChange={(e) => updateDay(dIdx, 'title', e.target.value)}
                            className="w-full border rounded-xl px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={day.description}
                            onChange={(e) => updateDay(dIdx, 'description', e.target.value)}
                            className="w-full border rounded-xl px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Activities</label>
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={newActivityInputs[dIdx] || ''}
                              onChange={(e) => setNewActivityInputs({ ...newActivityInputs, [dIdx]: e.target.value })}
                              placeholder="Add activity"
                              className="flex-1 border rounded-xl px-3 py-1 text-sm"
                            />
                            <button onClick={() => addActivity(dIdx)} className="bg-primary text-white px-2 py-1 rounded-xl text-xs font-bold">Add</button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(day.activities || []).map((act, aIdx) => (
                              <span key={aIdx} className="bg-white border rounded-full px-3 py-1 text-xs flex items-center gap-1">
                                {act}
                                <button onClick={() => removeActivity(dIdx, aIdx)} className="text-gray-400 hover:text-red-500 ml-1">
                                  <X size={12} />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section>
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">FAQs</h3>
                  <button onClick={addFaq} className="text-primary hover:text-green-700 text-sm font-bold flex items-center">
                    <Plus size={16} className="mr-1" /> Add FAQ
                  </button>
                </div>
                <div className="space-y-4">
                  {(editing.faqs || []).map((faq, fIdx) => (
                    <div key={fIdx} className="bg-white border rounded-lg p-3 relative">
                      <button onClick={() => removeFaq(fIdx)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                      <div className="space-y-2 pr-8">
                        <div>
                          <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Question</label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFaq(fIdx, 'question', e.target.value)}
                            className="w-full border rounded-xl px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">Answer</label>
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => updateFaq(fIdx, 'answer', e.target.value)}
                            className="w-full border rounded-xl px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Toggles */}
              <section className="flex gap-8 border-t pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!editing.isFeatured}
                    onChange={(e) => setEditing({ ...editing, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <span className="text-sm font-bold text-gray-700">Featured Package</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!editing.isPublished}
                    onChange={(e) => setEditing({ ...editing, isPublished: e.target.checked })}
                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <span className="text-sm font-bold text-gray-700">Published</span>
                </label>
              </section>
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end gap-4 rounded-b-2xl sticky bottom-0 z-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 font-bold hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-green-700 flex items-center"
              >
                <Save size={18} className="mr-2" />
                Save Package
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


