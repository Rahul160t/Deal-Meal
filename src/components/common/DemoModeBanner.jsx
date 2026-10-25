import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  RotateCcw,
  UserCheck,
  HeartHandshake,
  Store,
  LogOut,
  ArrowRightLeft,
} from 'lucide-react';

export const DemoModeBanner = () => {
  const { currentUser, loginAsRole, resetDemoData, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleSwitch = (targetRole) => {
    loginAsRole(targetRole);
    // Explicitly navigate to target role dashboard so user never sees wrong page!
    if (targetRole === 'business') {
      navigate('/business/dashboard');
    } else if (targetRole === 'charity') {
      navigate('/charity/dashboard');
    } else {
      navigate('/consumer/dashboard');
    }
  };

  const handleLogoutToLogin = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 px-4 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Prototype Status & Current Account */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Evaluator Prototype:
          </span>
          <span className="text-slate-300">
            Active User: <strong className="text-white capitalize">{currentUser?.name || 'Guest'}</strong>{' '}
            <span className="text-slate-400">({currentUser?.role ? `${currentUser.role} account` : 'Not signed in'})</span>
          </span>
        </div>

        {/* Right: Evaluator Account Switcher & Reset */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Evaluator Switch:
          </span>

          <button
            onClick={() => handleRoleSwitch('consumer')}
            title="Switch to Consumer account (Aarav Sharma) and open Consumer Dashboard"
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
              currentUser?.role === 'consumer'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <UserCheck className="w-3 h-3" /> Customer
          </button>

          <button
            onClick={() => handleRoleSwitch('business')}
            title="Switch to Business account (The French Window) and open Business Dashboard"
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
              currentUser?.role === 'business'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Store className="w-3 h-3" /> Business
          </button>

          <button
            onClick={() => handleRoleSwitch('charity')}
            title="Switch to Charity account (Robin Hood Army) and open Charity Dashboard"
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition ${
              currentUser?.role === 'charity'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <HeartHandshake className="w-3 h-3" /> Charity
          </button>

          <button
            onClick={resetDemoData}
            title="Restore initial Pune sample listings and bookings"
            className="ml-1 sm:ml-2 text-[11px] bg-slate-800 hover:bg-rose-950 hover:text-rose-200 text-slate-300 px-2.5 py-1 rounded border border-slate-700 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3 h-3" /> Reset Data
          </button>
        </div>
      </div>
    </div>
  );
};
