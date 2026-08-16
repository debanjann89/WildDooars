import React from 'react';
import { MessageCircle, Phone, Send } from 'lucide-react';
import type { BusinessSettings } from '../types';

interface FloatingActionButtonsProps {
  settings?: BusinessSettings | null;
  onOpenEnquiry?: () => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ settings, onOpenEnquiry }) => {
  const phone = settings?.phone || '081164 42729';
  const whatsapp = settings?.whatsapp || '918116442729';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* 1. Green Circle Phone Call Button */}
      <a
        href={`tel:${phone.replace(/\s+/g, '')}`}
        title="Call Wild Dooars"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#15803d] hover:bg-[#166534] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 border-2 border-white/20"
      >
        <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>

      {/* 2. Green Circle WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello Wild Dooars Tours & Travels, I need travel assistance.')}`}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp Direct Chat"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#15803d] hover:bg-[#166534] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 border-2 border-white/20"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>

      {/* 3. Green Circle Quick Booking Button */}
      {onOpenEnquiry && (
        <button
          onClick={onOpenEnquiry}
          title="Quick Booking Enquiry"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#15803d] hover:bg-[#166534] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 border-2 border-white/20"
        >
          <Send className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
    </div>
  );
};
