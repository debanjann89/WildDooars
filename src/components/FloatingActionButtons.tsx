import React from 'react';
import { MessageCircle, Phone, Send, Calendar } from 'lucide-react';
import type { BusinessSettings } from '../types';

interface FloatingActionButtonsProps {
  settings: BusinessSettings;
  onOpenEnquiry: () => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ settings, onOpenEnquiry }) => {
  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    'Hello Wild Dooars Tours & Travels, I would like to plan a trip to Dooars. Please share details and available options.'
  )}`;

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3 items-end font-sans pointer-events-auto">
      {/* 1. Top Circle: Call */}
      <a
        href={`tel:${settings.phone.replace(/\s+/g, '')}`}
        className="w-12 h-12 rounded-full bg-[#15803d] hover:bg-[#166534] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white/30 group relative"
        aria-label="Call Us Directly"
      >
        <Phone className="w-5 h-5" />
        <span className="hidden md:block absolute right-14 bg-slate-900 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          Call: {settings.phone}
        </span>
      </a>

      {/* 2. Middle Circle: WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-white/30 group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden md:block absolute right-14 bg-slate-900 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          WhatsApp Us
        </span>
      </a>

      {/* 3. Bottom Circle: Bookings / Quick Enquiry */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpenEnquiry();
        }}
        className="w-13 h-13 rounded-full bg-[#166534] hover:bg-[#15803d] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 border-emerald-300 group relative cursor-pointer"
        aria-label="Quick Booking Enquiry"
      >
        <Send className="w-6 h-6 text-white" />
        <span className="hidden md:block absolute right-15 bg-slate-900 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
          Bookings / Enquiry
        </span>
      </button>
    </div>
  );
};
