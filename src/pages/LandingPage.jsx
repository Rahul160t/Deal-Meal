import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FoodCard } from '../components/food/FoodCard';
import { ReserveModal } from '../components/food/ReserveModal';
import {
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Store,
  Users,
  Leaf,
  Clock,
  TrendingDown,
  ShoppingBag,
  CheckCircle2,
  Star,
  MapPin,
  Award,
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const LandingPage = () => {
  const { listings, currentUser, loginAsRole } = useApp();
  const [selectedListingForReserve, setSelectedListingForReserve] = useState(null);
  const navigate = useNavigate();

  // Take top 4 active listings for the featured section
  const featuredListings = listings.filter((l) => l.status === 'active').slice(0, 4);

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* Reserve Modal */}
      {selectedListingForReserve && (
        <ReserveModal
          isOpen={!!selectedListingForReserve}
          listing={selectedListingForReserve}
          isCharity={currentUser?.role === 'charity'}
          onClose={() => setSelectedListingForReserve(null)}
          onSuccess={() => setSelectedListingForReserve(null)}
        />
      )}

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs font-bold tracking-wide">
              <Leaf className="w-3.5 h-3.5 text-forest-600 animate-bounce" />
              <span>Pune's Food Surplus Rescue Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
              Good Food Deserves a <span className="text-forest-700 underline decoration-limebrand-400 decoration-wavy decoration-2">Second Chance.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Every day, premium cafes, bakeries, and restaurants in Pune prepare excess wholesome food. 
              <strong> Deal Meal</strong> bridges the gap—letting conscious consumers buy surprise surplus boxes at up to <strong>70% off</strong>, while empowering charities to claim meals for free.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                to="/explore"
                className="px-7 py-4 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm shadow-xl shadow-forest-900/20 hover:shadow-forest-900/30 flex items-center justify-center gap-2 transition duration-200"
              >
                <Sparkles className="w-4 h-4 text-limebrand-300" />
                Explore Surplus Food
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => {
                  if (currentUser?.role === 'business') {
                    navigate('/business/listings');
                  } else {
                    navigate('/signup');
                  }
                }}
                className="px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
              >
                <Store className="w-4 h-4 text-amber-600" />
                Join as a Partner
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-black text-forest-900">4,200+</p>
                <p className="text-xs text-slate-500 font-medium">Meals Rescued</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-forest-900">₹6.8L+</p>
                <p className="text-xs text-slate-500 font-medium">Consumer Savings</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-forest-900">100%</p>
                <p className="text-xs text-slate-500 font-medium">Wholesome Quality</p>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Background Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-limebrand-400 rounded-3xl blur-2xl opacity-20 transform -rotate-1"></div>

              {/* Main Image Card */}
              <div className="relative rounded-3xl bg-white p-3 shadow-2xl border border-slate-200/80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80"
                  alt="Delicious surplus banquet meal"
                  className="rounded-2xl object-cover w-full h-[360px] sm:h-[420px]"
                />

                {/* Floating pill: Fresh Croissants & Pastries */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center font-bold">
                    🥐
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">The French Window</span>
                    <span className="text-[11px] text-forest-700 font-semibold">60% OFF Surplus Pastries</span>
                  </div>
                </div>

                {/* Floating pill: NGO Claim Notice */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">Charity Partner</span>
                    <p className="text-xs font-bold text-slate-900">Robin Hood Army Pune</p>
                    <span className="text-[10px] text-slate-500">Claimed 4x organic produce</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Statistics Bar */}
      <section className="bg-forest-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-forest-800/80">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-limebrand-400">14,850+</p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Surplus Meals Rescued</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-white">48</p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Pune Partner Outlets</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-limebrand-400">18</p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Charities & Shelters</p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-white">12.4 Tons</p>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">CO₂ Emissions Diverted</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-forest-700 bg-forest-50 px-3 py-1 rounded-full border border-forest-200">
            Effortless 3-Way Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            How Deal Meal Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            A frictionless platform built for conscious food consumers, sustainable culinary businesses, and registered charities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Consumer */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5 font-bold">
              <ShoppingBag className="w-6 h-6 text-emerald-700" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">For Consumers</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">1. Discover & Reserve</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Browse fresh surplus dishes, baked artisan goods, and organic produce near you at steep 50-70% discounts.
            </p>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No mystery—view exact photos & portion sizes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant pickup code (e.g. DM-7891)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Rate & review local bakeries
              </li>
            </ul>
          </div>

          {/* Business */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5 font-bold">
              <Store className="w-6 h-6 text-amber-700" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">For Food Providers</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">2. List in 30 Seconds</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Instead of discarding edible surplus at the end of the shift, publish portions with price, pickup hours, and photos.
            </p>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" /> Recover food production & ingredient costs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" /> Reach eco-conscious new local customers
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600" /> Verify pickups using customer pickup codes
              </li>
            </ul>
          </div>

          {/* Charity */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-5 font-bold">
              <HeartHandshake className="w-6 h-6 text-purple-700" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">For NGOs & Charities</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">3. Claim Free Donations</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Verified NGOs can browse available surplus batches and claim nutritious food free of cost for community kitchens.
            </p>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" /> 100% free claim (₹0 payable)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" /> Coordinated pickup time windows
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600" /> Track meals distributed impact metrics
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Surplus Food Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-forest-700 bg-forest-50 px-2.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Ready for Pickup Today
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
              Featured Surplus Portions in Pune
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs sm:text-sm font-bold text-forest-700 hover:text-forest-800 flex items-center gap-1"
          >
            View all available food <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing) => (
            <FoodCard
              key={listing.listingId}
              listing={listing}
              onQuickReserve={(item) => setSelectedListingForReserve(item)}
            />
          ))}
        </div>
      </section>

      {/* Sustainability Impact Section */}
      <section id="sustainability" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-forest-900 via-forest-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-limebrand-400 bg-forest-800/80 px-3 py-1 rounded-full">
                <Leaf className="w-3.5 h-3.5" /> Circular Economy Impact
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                40% of All Food in India is Lost or Wasted Before It Reaches a Plate.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                When food decomposes in landfills, it emits methane—a greenhouse gas 28 times more potent than carbon dioxide. Deal Meal turns this economic loss into a community benefit by connecting surplus with appetite.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <p className="text-2xl font-black text-limebrand-400">2.5 kg</p>
                  <p className="text-xs text-slate-300 mt-1">CO₂ prevented per rescued meal</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <p className="text-2xl font-black text-white">₹140</p>
                  <p className="text-xs text-slate-300 mt-1">Average savings per order</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                  <p className="text-2xl font-black text-limebrand-400">Zero</p>
                  <p className="text-xs text-slate-300 mt-1">Compromise on freshness</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-limebrand-400" /> Deal Meal Pledge
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All food listed on Deal Meal is prepared during standard commercial service and stored strictly under FSSAI food hygiene parameters.
              </p>
              <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Strict pickup expiration windows</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Portion-controlled hygienic packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Verified NGO distribution partners</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Community Voices
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
            Loved Across Pune
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "As a college student in Kothrud, getting artisan croissants and meals at 60% off is a gamechanger. The pickup code was accepted instantly!"
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                alt="Aarav Sharma"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">Aarav Sharma</p>
                <p className="text-[11px] text-slate-400">Student & Consumer, Kothrud</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Listing surplus evening batches took literally 30 seconds from my phone. Instead of discarding fresh pastries, we recovered ingredient costs and met loyal neighbors."
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80"
                alt="The French Window"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">Chef Henri / Owner</p>
                <p className="text-[11px] text-slate-400">The French Window, Koregaon Park</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "The charity portal lets our volunteers claim available surplus crates for ₹0 and serve 150+ shelter residents every weekend. It eliminates food waste with dignity."
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=150&q=80"
                alt="Robin Hood Army Pune"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">Sneha Patil</p>
                <p className="text-[11px] text-slate-400">Robin Hood Army, Pune Chapter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-800 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to Save Good Food and Money?
            </h2>
            <p className="text-xs sm:text-sm text-forest-100 leading-relaxed">
              Join thousands of conscious food lovers and businesses across Pune. Reserve your first surplus portion in under 60 seconds.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/explore"
                className="px-6 py-3.5 rounded-xl bg-limebrand-400 hover:bg-limebrand-300 text-forest-950 font-bold text-xs shadow-lg transition"
              >
                Start Exploring Food
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
              >
                Create Free Demo Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
