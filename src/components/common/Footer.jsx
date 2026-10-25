import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Heart, Shield, Leaf, MapPin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-forest-700 text-white flex items-center justify-center shadow-lg">
                <UtensilsCrossed className="w-5 h-5 text-limebrand-300" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Deal <span className="text-emerald-400">Meal</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Rescuing wholesome surplus food from restaurants, bakeries, and stores before it goes to waste. Good food deserves a second chance.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Leaf className="w-4 h-4 text-emerald-400" /> Proudly piloted in Pune, Maharashtra
            </div>
          </div>

          {/* For Consumers */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              For Consumers
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/explore" className="hover:text-emerald-400 transition">
                  Browse Surplus Food
                </Link>
              </li>
              <li>
                <Link to="/consumer/dashboard" className="hover:text-emerald-400 transition">
                  Consumer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/consumer/bookings" className="hover:text-emerald-400 transition">
                  Track Orders & Pickups
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-emerald-400 transition">
                  How Pickup Works
                </a>
              </li>
            </ul>
          </div>

          {/* For Partners & NGOs */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Partners & NGOs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/business/dashboard" className="hover:text-emerald-400 transition">
                  Business Dashboard
                </Link>
              </li>
              <li>
                <Link to="/business/listings" className="hover:text-emerald-400 transition">
                  List Surplus Food
                </Link>
              </li>
              <li>
                <Link to="/charity/dashboard" className="hover:text-emerald-400 transition">
                  Charity & NGO Portal
                </Link>
              </li>
              <li>
                <Link to="/charity/available-food" className="hover:text-emerald-400 transition">
                  Claim Free Donations
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Prototype Notice */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Project Information
            </h4>
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> College Academic Project
              </p>
              <p className="text-slate-400 leading-relaxed">
                Deal Meal is a frontend-only interactive software engineering prototype demonstrated with React, Vite, and mock local storage.
              </p>
              <div className="pt-2 border-t border-slate-700 text-slate-400">
                <p>Location Demo: Pune, MH</p>
                <p>Currency: Indian Rupee (₹)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Deal Meal Initiative. Built for sustainable food ecosystems.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Zero Food Waste</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
