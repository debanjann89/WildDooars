import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Compass, ShieldCheck } from 'lucide-react';
import { apiService } from '../../services/api';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('admin@wilddooars.com');
  const [password, setPassword] = useState('WildDooars@2026');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = apiService.login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Please check your username and password.');
    }
  };

  return (
    <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl border border-emerald-100 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#15803d] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <Compass className="w-8 h-8" />
          </div>
          <span className="text-[#15803d] text-xs font-extrabold uppercase tracking-wider block mb-1">
            CMS Portal
          </span>
          <h1 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
            Wild Dooars Admin
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Sign in to manage tour packages, safaris, vehicles, hotels, and enquiries.
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl mb-4 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
              Admin Username / Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#15803d] absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#15803d] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-style-one w-full py-3.5 text-xs uppercase tracking-wider mt-2 shadow-lg"
          >
            Sign In to Dashboard
          </button>

          <div className="text-center pt-2 text-[11px] text-slate-500 font-bold flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#15803d]" />
            <span>Secure Admin Portal</span>
          </div>
        </form>
      </div>
    </div>
  );
};
