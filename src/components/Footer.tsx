import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Lock } from 'lucide-react';
import type { BusinessSettings } from '../types';

interface FooterProps {
  settings: BusinessSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();
  const email = settings.email || 'wilddooarstoursandtravels@gmail.com';
  const facebookUrl = settings.facebookUrl || 'https://www.facebook.com/profile.php?id=100086449080365&mibextid=ZbWKwL';
  const instagramUrl = settings.instagramUrl || 'https://www.instagram.com/wilddooarstoursandtravels?stkn=MXEyeG1taXJpOXc1eg==';

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t-4 border-[#15803d] font-sans">
      <div className="container">
        {/* Main 4-Column Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Wild Dooars" className="w-12 h-12 object-contain" />
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
                <a
                  href={settings.googleMapsUrl || 'https://maps.app.goo.gl/BKCtmveG53u8TuVn6'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors block group"
                >
                  <strong className="text-white group-hover:text-emerald-400">Wild Dooars Tours & Travels</strong>
                  <br />
                  <span>{settings.address} ({settings.plusCode})</span>
                  <span className="block text-[10px] text-emerald-400 font-bold mt-0.5">View on Google Maps ↗</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div className="flex flex-wrap items-center gap-1.5 font-extrabold text-white">
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-emerald-400 transition-colors">
                    {settings.phone}
                  </a>
                  {settings.alternatePhone && (
                    <>
                      <span className="text-emerald-500">/</span>
                      <a href={`tel:${settings.alternatePhone.replace(/\s+/g, '')}`} className="hover:text-emerald-400 transition-colors">
                        {settings.alternatePhone}
                      </a>
                    </>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-emerald-400 transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Open 24/7 for Bookings & Enquiries</span>
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
                <Link to="/gallery" className="hover:text-emerald-400 transition-colors">Photo Gallery</Link>
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
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#143622] hover:bg-[#15803d] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-emerald-800"
                aria-label="Facebook Page"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#143622] hover:bg-gradient-to-tr hover:from-amber-600 hover:via-pink-600 hover:to-purple-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-emerald-800"
                aria-label="Instagram Profile"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
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
