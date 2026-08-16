import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronDown, Menu, X, Compass, Trees } from 'lucide-react';
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
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 font-bold hover:text-emerald-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-200 flex-shrink-0" />
              <span>{settings.phone}</span>
            </a>
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-1.5 hover:text-emerald-200 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-200 flex-shrink-0" />
                <span>{settings.email}</span>
              </a>
            )}
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
            <div className="w-10 h-10 rounded-xl bg-[#15803d] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
                WILD DOOARS
              </span>
              <span className="text-[10px] sm:text-[11px] font-extrabold text-[#15803d] tracking-wider uppercase leading-tight mt-0.5">
                TOURS & TRAVELS
              </span>
            </div>
          </Link>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase font-extrabold tracking-wider text-slate-800">
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
              to="/contact"
              className={`hover:text-[#15803d] transition-colors py-2 ${
                isActive('/contact') ? 'text-[#15803d] font-black border-b-2 border-[#15803d]' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Bookings Button (Desktop Only) */}
          <div className="hidden lg:block flex-shrink-0">
            <button
              onClick={() => onOpenEnquiry()}
              className="btn-style-one text-xs uppercase py-2.5 px-6 shadow-md"
            >
              Bookings
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-1 flex-shrink-0">
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
              className="lg:hidden bg-[#15803d] text-white border-t border-emerald-700 py-4 px-6 shadow-2xl overflow-hidden"
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
                <Link to="/hotels" className="py-2 border-b border-emerald-700 hover:text-emerald-200">Hotels</Link>
                <Link to="/contact" className="py-2 border-b border-emerald-700 hover:text-emerald-200">Contact</Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="mt-2 btn-style-one text-xs py-3 w-full justify-center shadow-lg"
                >
                  Bookings / Enquiry
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
