import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { MobileActionBar } from './components/MobileActionBar';
import { FloatingActionButtons } from './components/FloatingActionButtons';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';

import { HomePage } from './pages/HomePage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { SafariPage } from './pages/SafariPage';
import { CarRentalPage } from './pages/CarRentalPage';
import { HotelsPage } from './pages/HotelsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminPackages } from './pages/admin/AdminPackages';
import { AdminDestinations } from './pages/admin/AdminDestinations';
import { AdminSafaris } from './pages/admin/AdminSafaris';
import { AdminVehicles } from './pages/admin/AdminVehicles';
import { AdminHotels } from './pages/admin/AdminHotels';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminSettings } from './pages/admin/AdminSettings';

import { apiService } from './services/api';
import type { Package, Destination, Vehicle, Hotel, SafariInfo, BusinessSettings } from './types';

// Scroll to top component on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected route component for admin panel
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!apiService.isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [safaris, setSafaris] = useState<SafariInfo[]>([]);

  // Global Enquiry Modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryContext, setEnquiryContext] = useState<{
    title?: string;
    destination?: string;
    tripType?: string;
    vehiclePreference?: string;
    hotelPreference?: string;
  } | undefined>(undefined);

  useEffect(() => {
    async function loadSiteData() {
      const s = await apiService.getSettings();
      const p = await apiService.getPackages();
      const d = await apiService.getDestinations();
      const v = await apiService.getVehicles();
      const h = await apiService.getHotels();
      const sf = await apiService.getSafaris();

      setSettings(s);
      setPackages(p);
      setDestinations(d);
      setVehicles(v);
      setHotels(h);
      setSafaris(sf);
    }
    loadSiteData();
  }, [location.pathname]);

  const handleOpenEnquiry = (contextData?: {
    title?: string;
    destination?: string;
    tripType?: string;
    vehiclePreference?: string;
    hotelPreference?: string;
  }) => {
    setEnquiryContext(contextData);
    setIsEnquiryOpen(true);
  };

  if (!settings) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold tracking-wider uppercase text-amber-300">Loading Wild Dooars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0a1f14] text-slate-900 font-sans">
      <ScrollToTop />

      {/* Public Header (Hidden in Admin) */}
      {!isAdminRoute && <Header settings={settings} onOpenEnquiry={handleOpenEnquiry} />}

      {/* Page Routing */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <HomePage
                settings={settings}
                packages={packages}
                destinations={destinations}
                vehicles={vehicles}
                hotels={hotels}
                safaris={safaris}
                onOpenEnquiry={handleOpenEnquiry}
              />
            }
          />
          <Route
            path="/packages"
            element={<PackagesPage packages={packages} onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/packages/:slug"
            element={<PackageDetailPage settings={settings} onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/destinations"
            element={<DestinationsPage destinations={destinations} onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/destinations/:slug"
            element={<DestinationDetailPage settings={settings} onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/safari"
            element={<SafariPage safaris={safaris} onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/car-rental"
            element={<CarRentalPage vehicles={vehicles} onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/hotels"
            element={<HotelsPage hotels={hotels} onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/about"
            element={<AboutPage settings={settings} onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/contact"
            element={<ContactPage settings={settings} />}
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="destinations" element={<AdminDestinations />} />
            <Route path="safaris" element={<AdminSafaris />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="hotels" element={<AdminHotels />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </main>

      {/* Public Footer & Floating Widgets */}
      {!isAdminRoute && (
        <>
          <Footer settings={settings} />
          <MobileActionBar settings={settings} onOpenEnquiry={() => handleOpenEnquiry()} />
          <FloatingActionButtons settings={settings} onOpenEnquiry={() => handleOpenEnquiry()} />
        </>
      )}

      {/* Global Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        contextData={enquiryContext}
        settings={settings}
      />
    </div>
  );
};

export function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
