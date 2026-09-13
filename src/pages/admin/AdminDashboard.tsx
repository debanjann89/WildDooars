import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, MapPin, Car, Hotel as HotelIcon, Inbox, Phone, MessageCircle, Trees, Image as ImageIcon, Star, Plus } from 'lucide-react';
import { apiService } from '../../services/api';
import type { Package, Destination, Vehicle, Hotel, SafariInfo, Enquiry } from '../../types';
import type { GalleryPhoto } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [safaris, setSafaris] = useState<SafariInfo[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const [pkgs, dests, vehs, htls, sfrs, glry, enqs, revs] = await Promise.all([
        apiService.getPackages(),
        apiService.getDestinations(),
        apiService.getVehicles(),
        apiService.getHotels(),
        apiService.getSafaris(),
        apiService.getGallery(),
        apiService.getEnquiries(),
        apiService.getReviews()
      ]);

      setPackages(pkgs);
      setDestinations(dests);
      setVehicles(vehs);
      setHotels(htls);
      setSafaris(sfrs);
      setGallery(glry);
      setEnquiries(enqs);
      setReviews(revs);
    }
    loadData();
  }, []);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  const kpiCards = [
    { label: 'Packages', count: packages.length, icon: Compass, link: '/admin/packages' },
    { label: 'Reviews', count: reviews.length, icon: Star, link: '/admin/reviews' },
    { label: 'Destinations', count: destinations.length, icon: MapPin, link: '/admin/destinations' },
    { label: 'Safaris', count: safaris.length, icon: Trees, link: '/admin/safaris' },
    { label: 'Vehicles', count: vehicles.length, icon: Car, link: '/admin/vehicles' },
    { label: 'Hotels', count: hotels.length, icon: HotelIcon, link: '/admin/hotels' },
    { label: 'Gallery Photos', count: gallery.length, icon: ImageIcon, link: '/admin/gallery' },
  ];

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-black uppercase text-slate-900 tracking-tight">CMS Dashboard</h1>
        <p className="text-xs text-slate-600 mt-1">Overview of Wild Dooars website content & customer enquiries.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.label}
              to={kpi.link}
              className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">{kpi.label}</span>
                <Icon className="w-5 h-5 text-[#15803d] group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-3xl font-black text-slate-900">{kpi.count}</span>
            </Link>
          );
        })}

        {/* New Enquiries - Highlighted */}
        <Link
          to="/admin/enquiries"
          className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm hover:shadow-md transition-all col-span-2 md:col-span-1 group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#15803d] uppercase">New Enquiries</span>
            <Inbox className="w-5 h-5 text-[#15803d] group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-3xl font-black text-[#15803d]">{newEnquiriesCount}</span>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <Link to="/admin/packages?new=true" className="p-4 bg-emerald-700 text-white rounded-2xl hover:bg-emerald-800 text-center transition-all group shadow-sm">
          <Plus className="w-6 h-6 text-white mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-black block">+ Add Package</span>
        </Link>
        <Link to="/admin/packages" className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-200 text-center transition-all group">
          <Compass className="w-6 h-6 text-[#15803d] mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-700 block">Manage Packages</span>
        </Link>
        <Link to="/admin/gallery" className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-200 text-center transition-all group">
          <ImageIcon className="w-6 h-6 text-[#15803d] mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-700 block">Manage Gallery</span>
        </Link>
        <Link to="/admin/hotels" className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-200 text-center transition-all group">
          <HotelIcon className="w-6 h-6 text-[#15803d] mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-700 block">Manage Hotels</span>
        </Link>
        <Link to="/admin/enquiries" className="p-4 bg-white rounded-2xl border border-stone-200 hover:border-emerald-200 text-center transition-all group">
          <Inbox className="w-6 h-6 text-[#15803d] mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-700 block">View Enquiries</span>
        </Link>
      </div>

      {/* Recent Enquiries Inbox */}
      <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-extrabold uppercase text-slate-900">Recent Customer Enquiries</h2>
            <p className="text-xs text-slate-500 mt-0.5">Respond directly via WhatsApp or Call.</p>
          </div>
          <Link to="/admin/enquiries" className="btn-style-four text-xs py-1.5 px-4">
            View All Enquiries
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-emerald-100 text-slate-500 font-extrabold uppercase">
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Phone</th>
                <th className="py-3 px-3">Trip Type</th>
                <th className="py-3 px-3">Destination</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {enquiries.slice(0, 5).map((enq) => (
                <tr key={enq.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="py-3 px-3 text-slate-500">{enq.createdAt}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">{enq.name}</td>
                  <td className="py-3 px-3 font-mono text-slate-700">{enq.phone}</td>
                  <td className="py-3 px-3 font-semibold text-slate-700">{enq.tripType}</td>
                  <td className="py-3 px-3 text-slate-700">{enq.destination || '-'}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        enq.status === 'New'
                          ? 'bg-emerald-100 text-[#15803d]'
                          : enq.status === 'Contacted'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${enq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                          `Hello ${enq.name}, thank you for contacting Wild Dooars Tours & Travels regarding your ${enq.tripType} enquiry.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-[#15803d] hover:bg-emerald-50 rounded-lg transition-colors"
                        title="WhatsApp Customer"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${enq.phone.replace(/\D/g, '')}`}
                        className="p-1.5 text-[#15803d] hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
