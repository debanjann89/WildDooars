import React, { useEffect, useState } from 'react';
import { Inbox, Phone, MessageCircle, Trash2, Calendar, Users, MapPin, Tag, Plus, Check } from 'lucide-react';
import { apiService } from '../../services/api';
import type { Enquiry } from '../../types';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    loadEnquiries();
  }, []);

  async function loadEnquiries() {
    const list = await apiService.getEnquiries();
    setEnquiries(list);
    if (list.length > 0 && !selectedEnquiry) {
      setSelectedEnquiry(list[0]);
    }
  }

  const handleStatusChange = async (id: string, status: Enquiry['status']) => {
    await apiService.updateEnquiryStatus(id, status);
    loadEnquiries();
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !newNote.trim()) return;

    await apiService.updateEnquiryStatus(selectedEnquiry.id, selectedEnquiry.status, newNote);
    setNewNote('');
    loadEnquiries();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this enquiry?')) {
      await apiService.deleteEnquiry(id);
      setSelectedEnquiry(null);
      loadEnquiries();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-emerald-950">Enquiry Inbox</h1>
        <p className="text-xs text-stone-600">Track and respond to customer trip inquiries via WhatsApp & Phone.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Inbox List */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[75vh]">
          <div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-xs text-stone-700 uppercase tracking-wider">
            All Enquiries ({enquiries.length})
          </div>

          <div className="divide-y divide-stone-100 overflow-y-auto flex-1">
            {enquiries.map((enq) => {
              const isSelected = selectedEnquiry?.id === enq.id;
              return (
                <div
                  key={enq.id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-emerald-50/80 border-l-4 border-emerald-900' : 'hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-emerald-950 truncate">{enq.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        enq.status === 'New'
                          ? 'bg-amber-100 text-amber-800'
                          : enq.status === 'Contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>

                  <div className="text-xs text-stone-600 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-emerald-700" />
                      <span className="font-mono">{enq.phone}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                      <span>{enq.tripType}</span>
                      <span>{enq.createdAt}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Enquiry Detail & Actions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between h-[75vh] overflow-y-auto">
          {selectedEnquiry ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-emerald-950">{selectedEnquiry.name}</h2>
                  <span className="text-xs text-stone-500">Submitted on {selectedEnquiry.createdAt}</span>
                </div>

                {/* Quick Direct Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                      `Hello ${selectedEnquiry.name}, thank you for contacting Wild Dooars Tours & Travels. Regarding your ${selectedEnquiry.tripType} enquiry...`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp text-xs py-2 px-3"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${selectedEnquiry.phone.replace(/\D/g, '')}`}
                    className="btn btn-primary text-xs py-2 px-3"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                  <button
                    onClick={() => handleDelete(selectedEnquiry.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status Updater */}
              <div className="flex items-center gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="text-xs font-bold uppercase text-stone-600">Update Status:</span>
                {(['New', 'Contacted', 'Follow-up', 'Confirmed', 'Closed'] as Enquiry['status'][]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedEnquiry.status === st
                        ? 'bg-emerald-900 text-amber-400 shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Enquiry Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                  <span className="text-stone-400 block mb-0.5">Phone / WhatsApp</span>
                  <span className="font-bold text-stone-900 font-mono text-sm">{selectedEnquiry.phone}</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                  <span className="text-stone-400 block mb-0.5">Email</span>
                  <span className="font-bold text-stone-900">{selectedEnquiry.email || 'Not provided'}</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                  <span className="text-stone-400 block mb-0.5">Travel Date</span>
                  <span className="font-bold text-stone-900">{selectedEnquiry.travelDate || 'Flexible'}</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                  <span className="text-stone-400 block mb-0.5">Travellers</span>
                  <span className="font-bold text-stone-900">{selectedEnquiry.travellersCount || '-'}</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                  <span className="text-stone-400 block mb-0.5">Trip Type</span>
                  <span className="font-bold text-stone-900">{selectedEnquiry.tripType}</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                  <span className="text-stone-400 block mb-0.5">Destination</span>
                  <span className="font-bold text-stone-900">{selectedEnquiry.destination || 'All Dooars'}</span>
                </div>
              </div>

              {/* Message */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                <span className="text-xs font-bold uppercase text-stone-500 block mb-2">Customer Message</span>
                <p className="text-xs text-stone-800 leading-relaxed whitespace-pre-line">
                  {selectedEnquiry.message || 'No additional message provided.'}
                </p>
              </div>

              {/* Internal Notes */}
              <div className="pt-4 border-t border-stone-200">
                <span className="text-xs font-bold uppercase text-stone-700 block mb-2">
                  Internal Staff Notes (Private)
                </span>

                {selectedEnquiry.internalNotes && selectedEnquiry.internalNotes.length > 0 ? (
                  <div className="space-y-1.5 mb-3 text-xs text-stone-600 bg-amber-50/60 p-3 rounded-lg border border-amber-200/60">
                    {selectedEnquiry.internalNotes.map((note, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-700 font-bold">•</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-400 italic mb-3">No internal notes added yet.</p>
                )}

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add internal note (e.g. Shared customized package quote via WhatsApp)..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 p-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                  <button type="submit" className="btn btn-outline py-2 px-4 text-xs font-bold">
                    Add Note
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-stone-400">
              <Inbox className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Select an enquiry from the left list to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
