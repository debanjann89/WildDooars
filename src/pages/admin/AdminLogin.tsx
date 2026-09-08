import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Compass, ShieldCheck, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { apiService } from '../../services/api';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (apiService.isLoggedIn()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  // Lockout countdown timer
  useEffect(() => {
    if (!isLockedOut) return;
    const interval = setInterval(() => {
      const remaining = apiService.getLockoutRemainingSeconds();
      if (remaining <= 0) {
        setIsLockedOut(false);
        setLockoutSeconds(0);
        setError('');
        clearInterval(interval);
      } else {
        setLockoutSeconds(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isLockedOut]);

  // Check lockout on mount
  useEffect(() => {
    if (apiService.isLockedOut()) {
      setIsLockedOut(true);
      setLockoutSeconds(apiService.getLockoutRemainingSeconds());
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (apiService.isLockedOut()) {
      setIsLockedOut(true);
      setLockoutSeconds(apiService.getLockoutRemainingSeconds());
      return;
    }

    setIsLoading(true);
    const success = await apiService.login(username, password);
    setIsLoading(false);

    if (success) {
      navigate('/admin');
    } else {
      if (apiService.isLockedOut()) {
        setIsLockedOut(true);
        setLockoutSeconds(apiService.getLockoutRemainingSeconds());
        setError('Too many failed attempts. Account temporarily locked.');
      } else {
        const attemptsLeft = 5 - apiService.getLoginAttempts();
        setError(`Invalid credentials. ${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} remaining before lockout.`);
      }
    }
  };

  const formatLockoutTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

        {/* Lockout Warning */}
        {isLockedOut && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-red-800">Account Temporarily Locked</p>
              <p className="text-xs text-red-600 mt-1">
                Too many failed login attempts. Try again in{' '}
                <span className="font-mono font-bold">{formatLockoutTime(lockoutSeconds)}</span>
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && !isLockedOut && (
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
                autoComplete="username"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLockedOut}
                className="w-full pl-10 pr-3 py-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d] disabled:opacity-50 disabled:cursor-not-allowed"
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
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLockedOut}
                className="w-full pl-10 pr-12 py-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#15803d] disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLockedOut || isLoading}
            className="btn-style-one w-full py-3.5 text-xs uppercase tracking-wider mt-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Sign In to Dashboard'}
          </button>

          <div className="text-center pt-2 text-[11px] text-slate-500 font-bold flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#15803d]" />
            <span>Secure Admin Portal — SHA-256 Encrypted</span>
          </div>
        </form>
      </div>
    </div>
  );
};
