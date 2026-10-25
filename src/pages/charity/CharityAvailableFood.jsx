import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { FoodCard } from '../../components/food/FoodCard';
import { ReserveModal } from '../../components/food/ReserveModal';
import { EmptyState } from '../../components/common/EmptyState';
import { PUNE_LOCATIONS, CATEGORIES } from '../../data/initialData';
import {
  Gift,
  Search,
  MapPin,
  Clock,
  HeartHandshake,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';

export const CharityAvailableFood = ({ onOpenMobileSidebar }) => {
  const { listings } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedExpiry, setSelectedExpiry] = useState('all');
  const [selectedListingForClaim, setSelectedListingForClaim] = useState(null);

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter((l) => {
      if (l.quantity <= 0) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        if (
          !l.item.toLowerCase().includes(query) &&
          !l.businessName.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      if (selectedLocation !== 'All Locations') {
        if (!l.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      if (selectedCategory !== 'All Categories') {
        if (l.category !== selectedCategory) {
          return false;
        }
      }

      if (selectedExpiry === 'today' && !l.expiry?.toLowerCase().includes('today')) {
        return false;
      }

      return true;
    });
  }, [listings, searchQuery, selectedLocation, selectedCategory, selectedExpiry]);

  return (
    <div>
      <DashboardHeader
        title="Browse Free Surplus Donations"
        subtitle="Claim nutritious surplus portions for verified community distribution (100% Free - ₹0 Fee)."
        onOpenMobileSidebar={onOpenMobileSidebar}
      />

      {/* Claim Modal */}
      {selectedListingForClaim && (
        <ReserveModal
          isOpen={!!selectedListingForClaim}
          listing={selectedListingForClaim}
          isCharity={true}
          onClose={() => setSelectedListingForClaim(null)}
          onSuccess={() => setSelectedListingForClaim(null)}
        />
      )}

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
        {/* NGO Notice Banner */}
        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200/80 flex items-start gap-3 text-xs text-purple-900">
          <HeartHandshake className="w-5 h-5 text-purple-700 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="block font-bold">Charity Partner Entitlement:</strong>
            All surplus food in this directory is sponsored by partner kitchens for free distribution. After confirming your claim, show your <strong>CHARITY-XXXX</strong> pickup code at the counter.
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Search */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Search Food or Outlet
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-600"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Pune Locality
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full text-xs py-1.5 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-purple-600"
            >
              {PUNE_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Food Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs py-1.5 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-purple-600"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Expiry */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Expiry Window
            </label>
            <select
              value={selectedExpiry}
              onChange={(e) => setSelectedExpiry(e.target.value)}
              className="w-full text-xs py-1.5 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-purple-600"
            >
              <option value="all">All Pickup Windows</option>
              <option value="today">Expiring Today</option>
            </select>
          </div>
        </div>

        {/* Available Donations Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-600">
              Found <strong className="text-purple-900">{filteredListings.length}</strong> available donation batches
            </span>
          </div>

          {filteredListings.length === 0 ? (
            <EmptyState
              icon={Gift}
              title="No food donations found"
              description="Try adjusting your filters or check back later as partner restaurants end their shifts."
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchQuery('');
                setSelectedLocation('All Locations');
                setSelectedCategory('All Categories');
                setSelectedExpiry('all');
              }}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <FoodCard
                  key={listing.listingId}
                  listing={listing}
                  isCharity={true}
                  onQuickReserve={(item) => setSelectedListingForClaim(item)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
