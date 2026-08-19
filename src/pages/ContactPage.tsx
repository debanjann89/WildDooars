import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { apiService } from '../services/api';
import type { BusinessSettings } from '../types';

interface ContactPageProps {
  settings?: BusinessSettings | null;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    travelDate: '',
    travellersCount: '2 Adults',
    destination: '',
    tripType: 'Family Trip',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage('Failed to send message. Please contact us via phone or WhatsApp.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const phoneNum = settings?.phone || '081164 42729';
  const whatsappNum = settings?.whatsapp || '918116442729';
  const businessName = settings?.businessName || 'Wild Dooars Tours & Travels';
  const address = settings?.address || 'Near Jaldapara National Park, Badaitari, Khauchandpara, West Bengal 735220';
  const plusCode = settings?.plusCode || 'J7F5+25 Badaitari, West Bengal';

  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    'Hello Wild Dooars Tours & Travels, I would like to plan a trip to Dooars. Please get in touch.'
  )}`;

  return (
    <div className="pt-4 sm:pt-8 pb-20 font-sans bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="sec-title centered max-w-3xl mx-auto mb-12">
          <span className="section-tag">Get In Touch</span>
          <h2>
            Contact <span>{businessName}</span>
          </h2>
          <div className="desc-text">
            We are located near Jaldapara National Park. Call us, WhatsApp us, or send an enquiry form to plan your Dooars trip.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Left Column: Contact Info Cards */}
          <div className="space-y-6">
            {/* Phone Card */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#15803d] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider block mb-1">
                  Call Us Directly
                </span>
                <div className="space-y-1">
                  <a
                    href={`tel:${phoneNum.replace(/\s+/g, '')}`}
                    className="text-lg font-extrabold text-slate-900 hover:text-[#15803d] block"
                  >
                    {phoneNum}
                  </a>
                  {settings?.alternatePhone && (
                    <a
                      href={`tel:${settings.alternatePhone.replace(/\s+/g, '')}`}
                      className="text-lg font-extrabold text-[#15803d] hover:text-[#166534] block"
                    >
                      {settings.alternatePhone} <span className="text-xs font-bold text-slate-500">(Alt)</span>
                    </a>
                  )}
                </div>
                <span className="text-xs text-slate-500 mt-1 block">Available daily for calls & travel assistance</span>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#15803d] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider block mb-1">
                  WhatsApp Support
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-extrabold text-[#15803d] hover:text-[#166534] block mb-1"
                >
                  +{whatsappNum}
                </a>
                <span className="text-xs text-slate-500">Fast response for package & vehicle quotes</span>
              </div>
            </div>

            {/* Address & Plus Code Card */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#15803d] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider block mb-1">
                  Office Location
                </span>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1">{businessName}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">{address}</p>
                <span className="inline-block bg-emerald-50 text-[#15803d] text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                  Plus Code: {plusCode}
                </span>
              </div>
            </div>

            {/* Facebook Card */}
            {settings?.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0a1f14] text-white p-6 rounded-2xl border border-emerald-900 shadow-sm flex items-center justify-between group hover:bg-[#15803d] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 fill-current text-emerald-400" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <div>
                    <span className="text-sm font-extrabold block">Follow Us on Facebook</span>
                    <span className="text-xs text-slate-300">Wild Dooars Tours & Travels</span>
                  </div>
                </div>
                <Send className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>

          {/* Right Column: Full Contact Enquiry Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-2xl border border-emerald-100 shadow-xl">
            <h2 className="text-2xl font-black uppercase text-slate-900 tracking-tight mb-2">Send Us an Enquiry</h2>
            <p className="text-xs text-slate-600 mb-6">
              Fill out your trip details below. Our travel experts near Jaldapara will contact you shortly with customized trip suggestions.
            </p>

            {isSuccess ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-emerald-50 text-[#15803d] rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tight mb-2">Message Received!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your trip inquiry has been received. Our team will call or message you back shortly.
                </p>
                <button onClick={() => setIsSuccess(false)} className="btn-style-three text-xs py-3 px-6 uppercase">
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200 font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Subhashish Roy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 098312 45678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                      Number of Travellers
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4 Adults, 1 Child"
                      value={formData.travellersCount}
                      onChange={(e) => setFormData({ ...formData, travellersCount: e.target.value })}
                      className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                      Trip Type
                    </label>
                    <select
                      value={formData.tripType}
                      onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                      className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d]"
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

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                    Preferred Places / Destination
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jaldapara, Buxa, Phuentsholing"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                    Message / Travel Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirements, car preferences, hotel type, or safari questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-style-one w-full py-3.5 text-xs uppercase tracking-wider shadow-md"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Travel Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
