import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronDown, Menu, X, Trees } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BusinessSettings } from '../types';

interface HeaderProps {
  settings: BusinessSettings;
  onOpenEnquiry: (contextData?: { title?: string; category?: string }) => void;
}

export const Header: React.FC<HeaderProps> = ({ settings, onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [packagesDropdown, setPackagesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setPackagesDropdown(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full relative z-50 font-sans">
      {/* Top Header Bar (Desktop Only) */}
      <div className="bg-[#15803d] text-white py-2 text-xs hidden md:block w-full">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold truncate">
            <Trees className="w-4 h-4 text-emerald-200 flex-shrink-0" />
            <span className="truncate">No.1 Car Rental / Hire Company & Tour Operator in Dooars</span>
          </div>

          <div className="flex items-center gap-6 text-xs flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-200 flex-shrink-0" />
              <span>Lataguri, Jaldapara, West Bengal</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <Phone className="w-3.5 h-3.5 text-emerald-200 flex-shrink-0" />
              <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-emerald-200 transition-colors">
                {settings.phone}
              </a>
              {settings.alternatePhone && (
                <>
                  <span className="text-emerald-300">/</span>
                  <a href={`tel:${settings.alternatePhone.replace(/\s+/g, '')}`} className="hover:text-emerald-200 transition-colors">
                    {settings.alternatePhone}
                  </a>
                </>
              )}
            </div>
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-200 flex-shrink-0" />
                <span>{settings.email}</span>
              </a>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-2 pl-2 border-l border-emerald-600/50">
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-200 transition-colors p-1"
                  title="Facebook Page"
                  aria-label="Facebook Page"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-200 transition-colors p-1"
                  title="Instagram Profile"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <div
        className={`bg-white transition-all duration-300 border-b border-slate-200 shadow-sm w-full z-50 ${
          isScrolled ? 'fixed top-0 left-0 right-0 py-2.5 shadow-md' : 'relative py-3.5'
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Wild Dooars Tours & Travels Logo"
              className="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg text-slate-900 tracking-tight leading-none">
                WILD DOOARS
              </span>
              <span className="text-[9px] sm:text-[10px] font-black text-[#15803d] tracking-wider uppercase leading-tight mt-0.5">
                TOURS & TRAVELS
              </span>
            </div>
          </Link>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-5 text-[11px] 2xl:text-xs uppercase font-extrabold tracking-tight 2xl:tracking-wide text-slate-800 whitespace-nowrap flex-shrink-0">
            <Link
              to="/"
              className={`hover:text-[#15803d] transition-colors py-2 ${
                isActive('/') ? 'text-[#15803d] font-black border-b-2 border-[#15803d]' : ''
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`hover:text-[#15803d] transition-colors py-2 ${
                isActive('/about') ? 'text-[#15803d] font-black border-b-2 border-[#15803d]' : ''
              }`}
            >
              About Us
            </Link>

            <Link
              to="/destinations"
              className={`hover:text-[#15803d] transition-colors py-2 ${
                isActive('/destinations') ? 'text-[#15803d] font-black border-b-2 border-[#15803d]' : ''
              }`}
            >
              Services
            </Link>

            <Link
              to="/car-rental"
              className={`hover:text-[#15803d] transition-colors py-2 ${
                isActive('/car-rental') ? 'text-[#15803d] font-black border-b-2 border-[#15803d]' : ''
              }`}
            >
              Our Cars
            </Link>

            {/* Packages Dropdown - Works on Click and Hover */}
            <div className="relative z-50" onMouseLeave={() => setPackagesDropdown(false)}>
              <button
                type="button"
                onClick={() => setPackagesDropdown(!packagesDropdown)}
                onMouseEnter={() => setPackagesDropdown(true)}
                className={`flex items-center gap-1 py-2 uppercase hover:text-[#15803d] transition-colors cursor-pointer ${
                  isActive('/packages') ? 'text-[#15803d] font-black border-b-2 border-[#15803d]' : ''
                }`}
              >
                <span>Packages</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <AnimatePresence>
                {packagesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute top-full left-0 w-56 bg-white text-slate-800 py-2 shadow-2xl rounded-xl border border-slate-200 border-t-4 border-t-[#15803d] z-50 mt-1"
                  >
                    <Link
                      to="/packages?category=Bhutan"
                      onClick={() => setPackagesDropdown(false)}
                      className="block px-4 py-2.5 hover:bg-emerald-50 hover:text-[#15803d] normal-case font-bold text-xs"
                    >
                      Bhutan Tour Packages
                    </Link>
                    <Link
                      to="/packages?category=Dooars"
                      onClick={() => setPackagesDropdown(false)}
                      className="block px-4 py-2.5 hover:bg-emerald-50 hover:text-[#15803d] normal-case font-bold text-xs"
                    >
                      Dooars Wildlife Packages
                    </Link>
                    <Link
                      to="/packages"
                      onClick={() => setPackagesDropdown(false)}
                      className="block px-4 py-2.5 hover:bg-emerald-50 hover:text-[#15803d] normal-case font-bold text-xs border-t border-slate-100 mt-1"
                    >
                      All Tour Packages
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/safari"
              className={`hover:text-[#15803d] transition-colors py-2 ${
                isActive('/safari') ? 'text-[#15803d] font-black border-b-2 border-[#15803d]' : ''
              }`}
            >
              Jungle Safaris
            </Link>

            <Link
              to="/hotels"
              className={`hover:text-[#15803d] transition-colors py-2 ${
                isActive('/hotels') ? 'text-[#15803d] font-black border-b-2 border-[#15803d]' : ''
              }`}
            >
              Hotels
            </Link>

            <Link
              to="/gallery"
              className={`hover:text-[#15803d] transition-colors py-2 ${
                isActive('/gallery') ? 'text-[#15803d] font-black border-b-2 border-[#15803d]' : ''
              }`}
            >
              Gallery
            </Link>

            <Link
              to="/contact"
              className={`hover:text-[#15803d] transition-colors py-2 ${
                isActive('/contact') ? 'text-[#15803d] font-black border-b-2 border-[#15803d]' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Bookings Button (Desktop Only) */}
          <div className="hidden xl:block flex-shrink-0">
            <button
              onClick={() => onOpenEnquiry()}
              className="btn-style-one text-xs uppercase py-2.5 px-5 shadow-md whitespace-nowrap"
            >
              Bookings
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-800 hover:text-[#15803d] active:scale-95 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer - Positioned INSIDE Header container so it works when scrolled! */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-[#15803d] text-white border-t border-emerald-700 py-4 px-6 shadow-2xl overflow-hidden"
            >
              <nav className="flex flex-col gap-3 font-bold uppercase text-xs tracking-wider">
                <Link to="/" className="py-2 border-b border-emerald-700 hover:text-emerald-200">Home</Link>
                <Link to="/about" className="py-2 border-b border-emerald-700 hover:text-emerald-200">About Us</Link>
                <Link to="/destinations" className="py-2 border-b border-emerald-700 hover:text-emerald-200">Services</Link>
                <Link to="/car-rental" className="py-2 border-b border-emerald-700 hover:text-emerald-200">Our Cars</Link>
                <Link to="/packages?category=Bhutan" className="py-2 border-b border-emerald-700 hover:text-emerald-200">Bhutan Tour Packages</Link>
                <Link to="/packages?category=Dooars" className="py-2 border-b border-emerald-700 hover:text-emerald-200">Dooars Wildlife Packages</Link>
                <Link to="/packages" className="py-2 border-b border-emerald-700 hover:text-emerald-200">All Packages</Link>
                <Link to="/safari" className="py-2 border-b border-emerald-700 hover:text-emerald-200">Jungle Safaris</Link>
                <Link to="/hotels" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-emerald-700 hover:text-emerald-200">Hotels</Link>
                <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-emerald-700 hover:text-emerald-200">Gallery</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-emerald-700 hover:text-emerald-200">Contact</Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="mt-2 btn-style-one text-xs py-3 w-full justify-center shadow-lg"
                >
                  Bookings / Enquiry
                </button>

                {/* Mobile Social Strip */}
                {(settings.facebookUrl || settings.instagramUrl) && (
                  <div className="flex items-center justify-center gap-4 pt-3 mt-1 border-t border-emerald-700/70">
                    <span className="text-[10px] text-emerald-200 tracking-wider font-bold">CONNECT WITH US:</span>
                    {settings.facebookUrl && (
                      <a
                        href={settings.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-white"
                        aria-label="Facebook"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                    {settings.instagramUrl && (
                      <a
                        href={settings.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-white"
                        aria-label="Instagram"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
