import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  MapPin,
  Trees,
  Car,
  Hotel as HotelIcon,
  Inbox,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { apiService } from '../../services/api';

export const AdminLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    apiService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Packages', path: '/admin/packages', icon: Compass },
    { name: 'Destinations', path: '/admin/destinations', icon: MapPin },
    { name: 'Safaris', path: '/admin/safaris', icon: Trees },
    { name: 'Vehicles', path: '/admin/vehicles', icon: Car },
    { name: 'Hotels', path: '/admin/hotels', icon: HotelIcon },
    { name: 'Enquiries Inbox', path: '/admin/enquiries', icon: Inbox },
    { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#15803d] text-white px-4 py-3 flex items-center justify-between border-b border-emerald-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white text-[#15803d] flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white uppercase">Wild Dooars CMS</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-white">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#0a1f14] text-slate-300 flex-shrink-0 min-h-screen border-r border-emerald-950 flex flex-col justify-between p-4 z-30`}
      >
        <div>
          {/* Admin Header */}
          <div className="hidden md:flex items-center gap-3 px-3 py-4 mb-4 border-b border-emerald-900/60">
            <img
              src="/images/logo.png"
              alt="Wild Dooars Logo"
              className="h-10 w-auto object-contain"
            />
            <div>
              <span className="block font-black text-sm text-white leading-tight">WILD DOOARS</span>
              <span className="block text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">CMS Dashboard</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-colors ${
                    active
                      ? 'bg-[#15803d] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-emerald-950/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-4 border-t border-emerald-900/60 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-300 hover:text-white rounded-lg hover:bg-emerald-950/60 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-emerald-400" />
            <span>View Public Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
