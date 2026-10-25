import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  UtensilsCrossed,
  Menu,
  X,
  Compass,
  LayoutDashboard,
  LogOut,
  User,
  HeartHandshake,
  Store,
  ChevronDown,
  ShoppingBag,
} from 'lucide-react';
import { NotificationPanel } from './NotificationPanel';

export const Navbar = () => {
  const { currentUser, logout, loginAsRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getDashboardRoute = () => {
    if (!currentUser) return '/login';
    switch (currentUser.role) {
      case 'business':
        return '/business/dashboard';
      case 'charity':
        return '/charity/dashboard';
      case 'consumer':
      default:
        return '/consumer/dashboard';
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-forest-700 group-hover:bg-forest-800 text-white flex items-center justify-center shadow-md shadow-forest-900/10 transition">
              <UtensilsCrossed className="w-5 h-5 text-limebrand-300" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-forest-950 flex items-center gap-1">
                Deal <span className="text-forest-600">Meal</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                Surplus Food Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
                isActive('/')
                  ? 'text-forest-700 bg-forest-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 transition ${
                isActive('/explore')
                  ? 'text-forest-700 bg-forest-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4 text-forest-600" />
              Explore Surplus Food
            </Link>
            <a
              href="/#how-it-works"
              className="px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              How It Works
            </a>
            <a
              href="/#sustainability"
              className="px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              Impact
            </a>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <NotificationPanel />

            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  to={getDashboardRoute()}
                  className="px-3.5 py-2 rounded-xl text-sm font-semibold text-forest-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 transition flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-forest-700" />
                  Dashboard
                </Link>

                {/* Profile menu */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition focus:outline-none border border-slate-200"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 mr-1" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-forest-100 text-forest-800">
                            {currentUser.role}
                          </span>
                          <span className="text-xs text-slate-400">• {currentUser.location}</span>
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          to={getDashboardRoute()}
                          onClick={() => setProfileDropdownOpen(false)}
                          className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <LayoutDashboard className="w-4 h-4 text-slate-400" /> My Dashboard
                        </Link>
                        {currentUser.role === 'consumer' && (
                          <Link
                            to="/consumer/bookings"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <ShoppingBag className="w-4 h-4 text-slate-400" /> My Orders & Pickups
                          </Link>
                        )}
                        {currentUser.role === 'business' && (
                          <Link
                            to="/business/listings"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Store className="w-4 h-4 text-slate-400" /> Manage Food Listings
                          </Link>
                        )}
                        {currentUser.role === 'charity' && (
                          <Link
                            to="/charity/claims"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <HeartHandshake className="w-4 h-4 text-slate-400" /> Claimed Food
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                            navigate('/');
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-forest-700 hover:bg-forest-800 shadow-sm transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <NotificationPanel />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            to="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-forest-700 bg-forest-50"
          >
            Explore Surplus Food
          </Link>
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50"
          >
            How It Works
          </a>
          <a
            href="/#sustainability"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50"
          >
            Impact
          </a>

          <div className="border-t border-slate-100 pt-3 mt-3">
            {currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{currentUser.role} Account</p>
                  </div>
                </div>
                <Link
                  to={getDashboardRoute()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-xl font-semibold text-white bg-forest-700"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="block w-full text-center px-4 py-2 text-sm text-rose-600 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-4 py-2 text-sm font-semibold text-white bg-forest-700 rounded-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
