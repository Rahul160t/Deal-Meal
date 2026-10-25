import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  LayoutDashboard,
  ShoppingBag,
  Store,
  PlusCircle,
  HeartHandshake,
  Gift,
  Compass,
  LogOut,
  RotateCcw,
  Sparkles,
  UserCheck,
} from 'lucide-react';

export const DashboardSidebar = ({ mobileOpen, setMobileOpen }) => {
  const { currentUser, logout, loginAsRole, resetDemoData } = useApp();
  const location = useLocation();

  const role = currentUser?.role || 'consumer';

  const isActive = (path) => location.pathname === path;

  const consumerNav = [
    { label: 'Overview', path: '/consumer/dashboard', icon: LayoutDashboard },
    { label: 'My Bookings & Pickups', path: '/consumer/bookings', icon: ShoppingBag },
    { label: 'Explore Surplus Food', path: '/explore', icon: Compass },
  ];

  const businessNav = [
    { label: 'Overview', path: '/business/dashboard', icon: LayoutDashboard },
    { label: 'Manage Food Listings', path: '/business/listings', icon: Store },
    { label: 'Explore Marketplace', path: '/explore', icon: Compass },
  ];

  const charityNav = [
    { label: 'Overview', path: '/charity/dashboard', icon: LayoutDashboard },
    { label: 'Available Free Food', path: '/charity/available-food', icon: Gift },
    { label: 'Food Claims & Pickup', path: '/charity/claims', icon: HeartHandshake },
    { label: 'Explore Marketplace', path: '/explore', icon: Compass },
  ];

  const currentNav =
    role === 'business' ? businessNav : role === 'charity' ? charityNav : consumerNav;

  const roleBadges = {
    consumer: { text: 'Consumer', color: 'bg-emerald-100 text-emerald-800' },
    business: { text: 'Business Partner', color: 'bg-amber-100 text-amber-800' },
    charity: { text: 'Charity / NGO', color: 'bg-purple-100 text-purple-800' },
  };

  const badge = roleBadges[role] || roleBadges.consumer;

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Brand */}
        <div>
          <div className="p-5 border-b border-slate-100">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-forest-700 text-white flex items-center justify-center shadow-md">
                <UtensilsCrossed className="w-5 h-5 text-limebrand-300" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-forest-950">
                  Deal <span className="text-forest-600">Meal</span>
                </span>
                <span className="block text-[10px] uppercase font-bold text-slate-400">
                  Dashboard
                </span>
              </div>
            </Link>

            {/* User Profile Card */}
            <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-150 flex items-center gap-3">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {currentUser?.name || 'Demo User'}
                </p>
                <span
                  className={`inline-block text-[10px] font-bold px-2 py-0.2 rounded-full mt-0.5 ${badge.color}`}
                >
                  {badge.text}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <p className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Menu
            </p>
            {currentNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? 'bg-forest-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-500'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Role Switcher & Controls */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          {/* Account status info */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block">
              Active Portal
            </span>
            <p className="font-bold text-slate-800 capitalize mt-0.5">
              {currentUser?.name}
            </p>
            <p className="text-[11px] text-slate-500">
              Role: <strong className="text-slate-700 capitalize">{role}</strong>
            </p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={resetDemoData}
              title="Reset sample data"
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Data
            </button>

            <button
              onClick={logout}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
