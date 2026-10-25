import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  UserCheck,
  Store,
  HeartHandshake,
  ShieldCheck,
  Lock,
  Mail,
  AlertCircle,
} from 'lucide-react';

export const LoginPage = () => {
  const { loginAsRole, loginCustom } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRoleQuickLogin = (role) => {
    loginAsRole(role);
    if (role === 'business') {
      navigate('/business/dashboard');
    } else if (role === 'charity') {
      navigate('/charity/dashboard');
    } else {
      navigate('/consumer/dashboard');
    }
  };

  const handleCustomLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter a password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = loginCustom(email, password);
      setIsSubmitting(false);
      if (res.success) {
        if (res.user.role === 'business') navigate('/business/dashboard');
        else if (res.user.role === 'charity') navigate('/charity/dashboard');
        else navigate('/consumer/dashboard');
      }
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-11 h-11 rounded-2xl bg-forest-700 text-white flex items-center justify-center shadow-md">
              <UtensilsCrossed className="w-6 h-6 text-limebrand-300" />
            </div>
            <span className="text-2xl font-black text-forest-950">
              Deal <span className="text-forest-600">Meal</span>
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome to Deal Meal
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to access your surplus food dashboard or use 1-click evaluator accounts.
          </p>
        </div>

        {/* 1-Click Evaluator Demo Accounts Box */}
        <div className="bg-gradient-to-br from-forest-50 to-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-forest-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Evaluator 1-Click Access
            </span>
            <span className="text-[10px] font-semibold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full">
              Academic Prototype
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            Instantly switch into any of the 3 role dashboards to examine full workflows:
          </p>

          <div className="space-y-2">
            <button
              onClick={() => handleRoleQuickLogin('consumer')}
              className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50/90 border border-emerald-200 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Aarav Sharma (Consumer)</p>
                  <p className="text-[10px] text-slate-500">Reserves meals, picks up with codes</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => handleRoleQuickLogin('business')}
              className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-amber-50/90 border border-amber-200 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">The French Window (Business)</p>
                  <p className="text-[10px] text-slate-500">Creates, edits & manages food listings</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={() => handleRoleQuickLogin('charity')}
              className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-purple-50/90 border border-purple-200 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Robin Hood Army (Charity NGO)</p>
                  <p className="text-[10px] text-slate-500">Claims free surplus donations (₹0)</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#faf9f5] px-2 text-slate-400 font-medium">Or enter demo credentials</span>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleCustomLogin} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="aarav.sharma@example.com"
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <span className="text-[10px] text-slate-400">Any demo password</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="••••••••"
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-forest-700 hover:bg-forest-800 text-white shadow-md transition flex items-center justify-center gap-1.5"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-forest-700 font-bold hover:underline">
            Register with role selection
          </Link>
        </p>
      </div>
    </div>
  );
};
