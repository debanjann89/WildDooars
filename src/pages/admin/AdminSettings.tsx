import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import { apiService } from '../../services/api';
import type { BusinessSettings } from '../../types';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const s = await apiService.getSettings();
    setSettings(s);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    await apiService.updateSettings(settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!settings) return <div>Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      <div>
        <h1 className="text-2xl font-black uppercase text-slate-900 tracking-tight">Website Settings</h1>
        <p className="text-xs text-slate-600">Update business information, contact details, hero headers, and social links.</p>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#15803d] rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Website settings updated successfully! Changes are live across the website.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-emerald-100 shadow-sm space-y-6 text-xs">
        {/* Business Identity */}
        <div>
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-tight mb-4 pb-2 border-b border-emerald-100">
            Business Details
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Business Name *</label>
              <input
                type="text"
                required
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & Location */}
        <div>
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-tight mb-4 pb-2 border-b border-emerald-100">
            Contact & Location
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Business Phone *</label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">WhatsApp Number (digits) *</label>
              <input
                type="text"
                required
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm font-mono text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Address *</label>
              <input
                type="text"
                required
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Google Maps Plus Code *</label>
              <input
                type="text"
                required
                value={settings.plusCode}
                onChange={(e) => setSettings({ ...settings, plusCode: e.target.value })}
                className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm font-mono text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Google Rating Info */}
        <div>
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-tight mb-4 pb-2 border-b border-emerald-100">
            Google Maps Rating
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Google Rating Display</label>
              <input
                type="text"
                value={settings.googleRating}
                onChange={(e) => setSettings({ ...settings, googleRating: e.target.value })}
                className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Reviews Count</label>
              <input
                type="text"
                value={settings.reviewsCount}
                onChange={(e) => setSettings({ ...settings, reviewsCount: e.target.value })}
                className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Homepage Hero Section */}
        <div>
          <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-tight mb-4 pb-2 border-b border-emerald-100">
            Homepage Hero Content
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Hero Headline</label>
              <input
                type="text"
                value={settings.heroHeadline}
                onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Hero Subheadline</label>
              <textarea
                rows={2}
                value={settings.heroSubheadline}
                onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Hero Image URL</label>
              <input
                type="text"
                value={settings.heroImage}
                onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
                className="w-full p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm font-mono text-slate-900"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-emerald-100 flex justify-end">
          <button type="submit" className="btn-style-one py-3.5 px-8 text-xs uppercase shadow-md">
            <Save className="w-4 h-4 text-white" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
