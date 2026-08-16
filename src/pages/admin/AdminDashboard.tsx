import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, MapPin, Car, Hotel as HotelIcon, Inbox, Phone, MessageCircle } from 'lucide-react';
import { apiService } from '../../services/api';
import type { Package, Destination, Vehicle, Hotel, Enquiry } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    async function loadData() {
      const pkgs = await apiService.getPackages();
      const dests = await apiService.getDestinations();
      const vehs = await apiService.getVehicles();
      const htls = await apiService.getHotels();
      const enqs = await apiService.getEnquiries();

      setPackages(pkgs);
      setDestinations(dests);
      setVehicles(vehs);
      setHotels(htls);
      setEnquiries(enqs);
    }
    loadData();
  }, []);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-black uppercase text-slate-900 tracking-tight">CMS Dashboard</h1>
        <p className="text-xs text-slate-600 mt-1">Overview of Wild Dooars website content & customer enquiries.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Packages</span>
            <Compass className="w-5 h-5 text-[#15803d]" />
          </div>
          <span className="text-3xl font-black text-slate-900">{packages.length}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Destinations</span>
            <MapPin className="w-5 h-5 text-[#15803d]" />
          </div>
          <span className="text-3xl font-black text-slate-900">{destinations.length}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Vehicles</span>
            <Car className="w-5 h-5 text-[#15803d]" />
          </div>
          <span className="text-3xl font-black text-slate-900">{vehicles.length}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Hotels</span>
            <HotelIcon className="w-5 h-5 text-[#15803d]" />
          </div>
          <span className="text-3xl font-black text-slate-900">{hotels.length}</span>
        </div>

        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm col-span-2 md:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#15803d] uppercase">New Enquiries</span>
            <Inbox className="w-5 h-5 text-[#15803d]" />
          </div>
          <span className="text-3xl font-black text-[#15803d]">{newEnquiriesCount}</span>
        </div>
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
