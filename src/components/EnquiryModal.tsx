import React, { useState, useEffect } from 'react';
import { X, Send, Calendar, Users, MapPin, Phone, User, Mail, CheckCircle2, ShieldCheck, MessageCircle } from 'lucide-react';
import { apiService } from '../services/api';
import type { BusinessSettings } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextData?: {
    title?: string;
    destination?: string;
    tripType?: string;
    vehiclePreference?: string;
    hotelPreference?: string;
  };
  settings: BusinessSettings;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  contextData,
  settings,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    travelDate: '',
    travellersCount: '2 Adults',
    destination: '',
    tripType: 'Family Trip',
    vehiclePreference: '',
    hotelPreference: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (contextData) {
      setFormData((prev) => ({
        ...prev,
        destination: contextData.destination || prev.destination,
        tripType: contextData.tripType || prev.tripType,
        vehiclePreference: contextData.vehiclePreference || prev.vehiclePreference,
        hotelPreference: contextData.hotelPreference || prev.hotelPreference,
        message: contextData.title ? `Inquiring about: ${contextData.title}` : prev.message,
      }));
    }
  }, [contextData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMessage('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await apiService.submitEnquiry(formData);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage('Failed to submit enquiry. Please try again or contact us directly on WhatsApp.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try calling or WhatsApping us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  const whatsappDirectUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Hello Wild Dooars Tours & Travels, I am ${formData.name || 'a visitor'}. ${
      formData.message || 'I would like to inquire about a Dooars trip.'
    }`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm font-sans">
      <div className="relative w-[94vw] max-w-lg bg-white rounded-2xl shadow-2xl border border-emerald-100 max-h-[88vh] flex flex-col my-auto overflow-hidden">
        {/* Compact Header */}
        <div className="bg-[#15803d] text-white px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <span className="text-emerald-100 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider block">
              Wild Dooars Tours & Travels
            </span>
            <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-tight line-clamp-1">
              {contextData?.title ? `Enquire: ${contextData.title}` : 'Plan Your Dooars Journey'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors flex-shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-6 text-center">
              <div className="w-14 h-14 bg-emerald-50 text-[#15803d] rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Enquiry Received!</h4>
              <p className="text-slate-600 text-xs mb-5 max-w-xs mx-auto">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>! Your trip enquiry has been submitted. Our local travel experts near Jaldapara will review your details and contact you shortly.
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-style-one w-full py-3 text-xs uppercase justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Instant Message</span>
                </a>
                <button onClick={handleReset} className="btn-style-three w-full py-3 text-xs uppercase justify-center">
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {errorMessage && (
                <div className="p-2.5 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200 font-semibold">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#15803d] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Subhashish Roy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-8 pr-2.5 py-2 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#15803d]"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#15803d] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 098312 45678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-8 pr-2.5 py-2 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#15803d]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Travel Date */}
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                    Travel Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-[#15803d] absolute left-3 top-3" />
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full pl-8 pr-2.5 py-2 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#15803d]"
                    />
                  </div>
                </div>

                {/* Trip Type */}
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                    Trip Type
                  </label>
                  <select
                    value={formData.tripType}
                    onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                    className="w-full px-2.5 py-2 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#15803d]"
                  >
                    <option value="Family Trip">Family Trip</option>
                    <option value="Honeymoon Trip">Honeymoon Trip</option>
                    <option value="Adventure Trip">Adventure Trip</option>
                    <option value="Wildlife Tour">Wildlife Tour</option>
                    <option value="Package Tour">Package Tour</option>
                    <option value="Customized Trip">Customized Trip</option>
                    <option value="Hotel Booking">Hotel Booking</option>
                    <option value="Car Rental">Car Rental</option>
                  </select>
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                  Preferred Destination / Places
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-[#15803d] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Jaldapara, Buxa Tiger Reserve"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full pl-8 pr-2.5 py-2 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#15803d]"
                  />
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                  Additional Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Car preference, hotel type, safari questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2.5 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#15803d]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-style-one w-full py-3 text-xs uppercase tracking-wider shadow-md justify-center"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry Now</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 pt-0.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803d]" />
                <span>Private. No booking commitment required.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
