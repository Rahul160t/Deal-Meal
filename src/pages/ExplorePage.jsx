import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FoodCard } from '../components/food/FoodCard';
import { FilterSidebar } from '../components/food/FilterSidebar';
import { ReserveModal } from '../components/food/ReserveModal';
import { EmptyState } from '../components/common/EmptyState';
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  Compass,
  Sparkles,
  ArrowUpDown,
  Search,
} from 'lucide-react';
import { calculateDiscount } from '../utils/formatters';

export const ExplorePage = () => {
  const { listings, currentUser } = useApp();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [maxPrice, setMaxPrice] = useState(500);
  const [expiryFilter, setExpiryFilter] = useState('all'); // 'all', 'today', 'tomorrow'
  const [sortBy, setSortBy] = useState('nearest'); // 'nearest', 'price_asc', 'price_desc', 'newest', 'discount'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Quick reserve modal state
  const [selectedListingForReserve, setSelectedListingForReserve] = useState(null);

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      // Search query (item name or business name)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesItem = listing.item.toLowerCase().includes(query);
        const matchesBusiness = listing.businessName.toLowerCase().includes(query);
        const matchesDesc = listing.description?.toLowerCase().includes(query);
        if (!matchesItem && !matchesBusiness && !matchesDesc) return false;
      }

      // Location
      if (selectedLocation !== 'All Locations') {
        if (!listing.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All Categories') {
        if (listing.category !== selectedCategory) {
          return false;
        }
      }

      // Price filter (only applies to consumer surplus price; charity sees all)
      if (currentUser?.role !== 'charity' && listing.surplusPrice > maxPrice) {
        return false;
      }

      // Expiry filter
      if (expiryFilter === 'today') {
        if (!listing.expiry?.toLowerCase().includes('today')) return false;
      } else if (expiryFilter === 'tomorrow') {
        if (!listing.expiry?.toLowerCase().includes('tomorrow')) return false;
      }

      return true;
    });
  }, [listings, searchQuery, selectedLocation, selectedCategory, maxPrice, expiryFilter, currentUser]);

  // Sort filtered listings
  const sortedListings = useMemo(() => {
    const list = [...filteredListings];
    switch (sortBy) {
      case 'price_asc':
        return list.sort((a, b) => a.surplusPrice - b.surplusPrice);
      case 'price_desc':
        return list.sort((a, b) => b.surplusPrice - a.surplusPrice);
      case 'nearest':
        return list.sort((a, b) => (Number(a.distanceKm) || 0) - (Number(b.distanceKm) || 0));
      case 'newest':
        return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'discount':
        return list.sort((a, b) => {
          const discA = calculateDiscount(a.originalPrice, a.surplusPrice);
          const discB = calculateDiscount(b.originalPrice, b.surplusPrice);
          return discB - discA;
        });
      default:
        return list;
    }
  }, [filteredListings, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSelectedCategory('All Categories');
    setMaxPrice(500);
    setExpiryFilter('all');
    setSortBy('nearest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
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

      {/* Header Banner */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest-800 text-xs font-bold mb-2">
          <Compass className="w-3.5 h-3.5 text-forest-600" />
          <span>Real-time Pune Surplus Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore Wholesome Surplus Food
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Reserve surplus portions from verified local cafes, bakeries, and organic farms. Pick up during the designated time window and save food from going to waste.
        </p>
      </div>

      {/* Top Bar for Mobile & View Toggle */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-1.5 rounded-xl bg-forest-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </button>

          <span className="text-xs font-semibold text-slate-600">
            Showing <strong className="text-slate-900">{sortedListings.length}</strong> available portions
          </span>
        </div>

        {/* View Mode & Sort Dropdown */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition ${
                viewMode === 'grid'
                  ? 'bg-white text-forest-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs transition ${
                viewMode === 'list'
                  ? 'bg-white text-forest-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs py-1.5 px-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-forest-600"
            >
              <option value="nearest">Nearest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="discount">Highest Discount %</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Sidebar + Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <FilterSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            expiryFilter={expiryFilter}
            setExpiryFilter={setExpiryFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            matchCount={sortedListings.length}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Listings Display Area */}
        <div className="lg:col-span-3">
          {sortedListings.length === 0 ? (
            <EmptyState
              title="No surplus food matches your filters"
              description="Try adjusting your maximum price, changing the Pune locality, or resetting your category filters."
              actionLabel="Reset All Filters"
              onAction={handleResetFilters}
            />
          ) : viewMode === 'list' ? (
            <div className="space-y-4">
              {sortedListings.map((listing) => (
                <FoodCard
                  key={listing.listingId}
                  listing={listing}
                  viewMode="list"
                  isCharity={currentUser?.role === 'charity'}
                  onQuickReserve={(item) => setSelectedListingForReserve(item)}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedListings.map((listing) => (
                <FoodCard
                  key={listing.listingId}
                  listing={listing}
                  viewMode="grid"
                  isCharity={currentUser?.role === 'charity'}
                  onQuickReserve={(item) => setSelectedListingForReserve(item)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="ml-auto w-full max-w-sm bg-white h-full overflow-y-auto p-4 shadow-2xl">
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              expiryFilter={expiryFilter}
              setExpiryFilter={setExpiryFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              matchCount={sortedListings.length}
              onResetFilters={handleResetFilters}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
