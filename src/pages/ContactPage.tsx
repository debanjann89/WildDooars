import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Send, CheckCircle2, ExternalLink, Navigation, Mail } from 'lucide-react';
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
  const googleMapsUrl = settings?.googleMapsUrl || 'https://maps.app.goo.gl/BKCtmveG53u8TuVn6';
  const emailAddress = settings?.email || 'wilddooarstoursandtravels@gmail.com';

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
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-4 hover:shadow-md hover:border-emerald-300 transition-all group block"
            >
              <div className="w-12 h-12 rounded-xl bg-[#15803d] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider block">
                    Office Location
                  </span>
                  <span className="text-[11px] font-bold text-[#15803d] flex items-center gap-1 group-hover:underline">
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-1 group-hover:text-[#15803d] transition-colors">{businessName}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">{address}</p>
                <span className="inline-block bg-emerald-50 text-[#15803d] text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                  Plus Code: {plusCode}
                </span>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${emailAddress}`}
              className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-start gap-4 hover:shadow-md hover:border-emerald-300 transition-all group block"
            >
              <div className="w-12 h-12 rounded-xl bg-[#15803d] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider block mb-1">
                  Email Support
                </span>
                <span className="text-sm font-extrabold text-slate-900 group-hover:text-[#15803d] transition-colors block mb-1 break-all">
                  {emailAddress}
                </span>
                <span className="text-xs text-slate-500">Fast response for tour queries & bookings</span>
              </div>
            </a>

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

            {/* Instagram Card */}
            {settings?.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-amber-600 via-pink-600 to-purple-700 text-white p-6 rounded-2xl shadow-sm flex items-center justify-between group hover:opacity-95 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <div>
                    <span className="text-sm font-extrabold block">Follow Us on Instagram</span>
                    <span className="text-xs text-white/90">@wilddooarstoursandtravels</span>
                  </div>
                </div>
                <Send className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
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

        {/* Google Maps Location Section */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#0a1f14] to-[#143622] rounded-3xl p-8 md:p-10 border border-emerald-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/60 rounded-full text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google Maps Location</span>
              </div>
              <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                Visit Wild Dooars Tours & Travels
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Located near Jaldapara National Park (Badaitari, Khauchandpara, West Bengal). Tap below to open live navigation or driving directions directly in Google Maps.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs text-emerald-300 font-mono">
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">Plus Code: {plusCode}</span>
                <span className="bg-white/10 px-2.5 py-1 rounded-lg">PIN: 735220</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-[#15803d] hover:bg-[#166534] text-white rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg hover:shadow-emerald-900/50 transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-emerald-200" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  'Wild Dooars Tours & Travels, near Jaldapara National Park, Badaitari, Khauchandpara, West Bengal 735220'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
