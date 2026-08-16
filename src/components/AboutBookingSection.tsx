import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Car, Compass, Send, ShieldCheck, Trees, Award, Users, HeartHandshake } from 'lucide-react';
import type { BusinessSettings } from '../types';

interface AboutBookingSectionProps {
  settings?: BusinessSettings | null;
  onOpenEnquiry: (contextData?: { vehiclePreference?: string; tripType?: string }) => void;
}

export const AboutBookingSection: React.FC<AboutBookingSectionProps> = ({ onOpenEnquiry }) => {
  const [activeTab, setActiveTab] = useState<'car' | 'holidays'>('car');

  const [pickupLoc, setPickupLoc] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropDate, setDropDate] = useState('');
  const [dropTime, setDropTime] = useState('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenEnquiry({
      tripType: activeTab === 'car' ? 'Car Rental' : 'Package Tour',
      vehiclePreference: pickupLoc ? `Pickup: ${pickupLoc}` : undefined
    });
  };

  const featureCards = [
    {
      icon: Award,
      title: 'No.1 Local Experts',
      desc: 'Based right near Jaldapara National Park with deep knowledge of Dooars & Bhutan routes.'
    },
    {
      icon: Trees,
      title: 'Safari Permit Guidance',
      desc: 'Complete assistance for Jaldapara & Gorumara Jeep Safari permits & watchtowers.'
    },
    {
      icon: Users,
      title: 'Mountain Chauffeurs',
      desc: 'Courteous, experienced local drivers fluent in hill terrain and wildlife safety.'
    },
    {
      icon: HeartHandshake,
      title: 'Transparent Pricing',
      desc: 'No hidden charges, zero prepayment requirement for enquiries, and 24/7 support.'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-emerald-100 font-sans">
      <div className="container">
        {/* Section Header */}
        <div className="sec-title centered">
          <span className="section-tag">
            Why Travel With Us
          </span>
          <h2>
            About <span>Wild Dooars Tours & Travels</span>
          </h2>
          <div className="desc-text">
            Your premier local travel partner operating near Jaldapara National Park, serving tourists with reliable AC car rentals, jungle safaris, and customized holiday packages.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Feature Cards & Brand Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              We hold years of expertise in managing memorable vacations across the lush forests of Wild Dooars, tea garden valleys, and neighboring Bhutan. Our primary goal is to ensure every traveler enjoys a safe, comfortable, and authentic mountain holiday.
            </p>

            {/* 4 Feature Cards Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div key={i} className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#15803d] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 mb-0.5">{card.title}</h4>
                      <p className="text-xs text-slate-600 leading-normal">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center sm:text-left">
              <Link to="/about" className="btn-style-three text-xs uppercase shadow-sm">
                <span>Learn More About Us</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Clean Tabbed Quick Booking Form Box (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-emerald-200/80">
                <h3 className="text-lg font-extrabold text-slate-900 uppercase">
                  Quick Booking Enquiry
                </h3>
                <span className="text-xs font-bold text-[#15803d] flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Instant Response
                </span>
              </div>

              {/* Tab Header Buttons */}
              <div className="grid grid-cols-2 gap-2 bg-white p-1.5 rounded-xl border border-emerald-200 mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('car')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'car'
                      ? 'bg-[#15803d] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  Car Rental
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('holidays')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'holidays'
                      ? 'bg-[#15803d] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  Holidays Booking
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                {/* Pickup Field */}
                <div>
                  <label className="block font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#15803d] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Airport Code, City, Station, Hotel, Zip..."
                      value={pickupLoc}
                      onChange={(e) => setPickupLoc(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-white border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d]"
                    />
                  </div>
                </div>

                {/* Pickup Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Pickup Date</label>
                    <div className="relative">
                      <Calendar className="w-3.5 h-3.5 text-[#15803d] absolute left-3 top-3" />
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full pl-8 pr-2 py-2.5 bg-white border border-emerald-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Pickup Time</label>
                    <div className="relative">
                      <Clock className="w-3.5 h-3.5 text-[#15803d] absolute left-3 top-3" />
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full pl-8 pr-2 py-2.5 bg-white border border-emerald-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Drop Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Drop Date</label>
                    <div className="relative">
                      <Calendar className="w-3.5 h-3.5 text-[#15803d] absolute left-3 top-3" />
                      <input
                        type="date"
                        value={dropDate}
                        onChange={(e) => setDropDate(e.target.value)}
                        className="w-full pl-8 pr-2 py-2.5 bg-white border border-emerald-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">Drop Time</label>
                    <div className="relative">
                      <Clock className="w-3.5 h-3.5 text-[#15803d] absolute left-3 top-3" />
                      <input
                        type="time"
                        value={dropTime}
                        onChange={(e) => setDropTime(e.target.value)}
                        className="w-full pl-8 pr-2 py-2.5 bg-white border border-emerald-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-style-one w-full py-3.5 text-xs uppercase tracking-wider shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
