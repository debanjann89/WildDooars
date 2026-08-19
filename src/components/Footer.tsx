import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Lock } from 'lucide-react';
import type { BusinessSettings } from '../types';

interface FooterProps {
  settings: BusinessSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a1f14] text-slate-300 pt-16 pb-16 sm:pb-12 border-t-4 border-[#15803d] font-sans relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Contact Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/logo.png"
                alt="Wild Dooars Tours & Travels Logo"
                className="h-12 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-black text-lg text-white tracking-tight leading-none">
                  WILD DOOARS
                </span>
                <span className="text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase leading-tight mt-1">
                  TOURS & TRAVELS
                </span>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Wild Dooars Tours & Travels</strong>
                  <br />
                  {settings.address} ({settings.plusCode})
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="font-extrabold text-white hover:text-emerald-400 transition-colors">
                  {settings.phone}
                </a>
              </li>
              {settings.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-emerald-400 transition-colors">
                    {settings.email}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Hours: 08:00 AM - 09:00 PM (Daily)</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-extrabold uppercase text-white tracking-wider mb-5 pb-2 border-b border-emerald-900/60 font-sans">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-emerald-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/car-rental" className="hover:text-emerald-400 transition-colors">Our Cars</Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-emerald-400 transition-colors">Packages</Link>
              </li>
              <li>
                <Link to="/safari" className="hover:text-emerald-400 transition-colors">Jungle Safaris</Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-emerald-400 transition-colors">Hotels</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Top Destinations */}
          <div>
            <h3 className="text-base font-extrabold uppercase text-white tracking-wider mb-5 pb-2 border-b border-emerald-900/60 font-sans">
              Top Destinations
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/destinations/jaldapara-national-park" className="hover:text-emerald-400 transition-colors">Jaldapara National Park</Link>
              </li>
              <li>
                <Link to="/destinations/buxa-tiger-reserve" className="hover:text-emerald-400 transition-colors">Buxa Tiger Reserve & Jayanti</Link>
              </li>
              <li>
                <Link to="/destinations/gorumara-national-park" className="hover:text-emerald-400 transition-colors">Gorumara National Park & Lataguri</Link>
              </li>
              <li>
                <Link to="/destinations/cooch-behar" className="hover:text-emerald-400 transition-colors">Cooch Behar Royal Palace</Link>
              </li>
              <li>
                <Link to="/destinations/phuentsholing-bhutan" className="hover:text-emerald-400 transition-colors">Phuentsholing, Bhutan Border</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: About Company & Admin Link */}
          <div>
            <h3 className="text-base font-extrabold uppercase text-white tracking-wider mb-5 pb-2 border-b border-emerald-900/60 font-sans">
              About Wild Dooars
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {settings.footerText}
            </p>

            <div className="flex items-center gap-3">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#143622] hover:bg-[#15803d] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-emerald-800"
                  aria-label="Facebook Page"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 font-bold transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin CMS</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Strip */}
        <div className="pt-6 border-t border-emerald-900/60 text-center text-xs text-slate-400">
          <p>© {currentYear} <strong>Wild Dooars Tours & Travels</strong>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
