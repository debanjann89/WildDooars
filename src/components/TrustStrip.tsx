import React from 'react';
import { MapPin, Trees, Car, Home, PhoneCall } from 'lucide-react';
import type { BusinessSettings } from '../types';

interface TrustStripProps {
  settings?: BusinessSettings;
}

export const TrustStrip: React.FC<TrustStripProps> = () => {
  const trustPoints = [
    {
      icon: MapPin,
      title: 'Local Destination Expertise',
      desc: 'Based near Jaldapara National Park with deep regional knowledge.'
    },
    {
      icon: Trees,
      title: 'Safari & Sightseeing Assistance',
      desc: 'Guidance for Jaldapara, Gorumara & Buxa forest department permits.'
    },
    {
      icon: Car,
      title: 'Comfortable Car Rentals',
      desc: 'Innova, Bolero, Sumo, Ertiga, Dzire & WagonR with experienced drivers.'
    },
    {
      icon: Home,
      title: 'Resort & Homestay Booking',
      desc: 'Handpicked forest resorts, riverfront stays, and authentic homestays.'
    },
    {
      icon: PhoneCall,
      title: 'Easy Phone & WhatsApp Support',
      desc: 'Direct human assistance anytime before and during your journey.'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-stone-200">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Why Travel With Us</span>
          <h2 className="section-title">Your Trusted Local Dooars Travel Partner</h2>
          <p className="section-desc">
            We handle your itinerary, transportation, resort stays, and safari coordination so you can focus on the wild.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-stone-50 p-6 rounded-xl border border-stone-200/70 hover:border-emerald-700/40 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-900 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-emerald-950 mb-1.5">{point.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{point.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
