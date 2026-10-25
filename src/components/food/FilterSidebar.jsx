import React from 'react';
import {
  Search,
  MapPin,
  Filter,
  X,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';
import { PUNE_LOCATIONS, CATEGORIES } from '../../data/initialData';
import { formatCurrency } from '../../utils/formatters';

export const FilterSidebar = ({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  expiryFilter,
  setExpiryFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  matchCount,
  onResetFilters,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-forest-700" />
          <h3 className="font-bold text-slate-900 text-sm">Filter & Search</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-forest-700 hover:text-forest-800 font-semibold flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Search Food / Bakery
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. Croissant, Sambar, Idli..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Location Select (Pune Localities) */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-forest-600" /> City Location (Pune)
        </label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-forest-600"
        >
          {PUNE_LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                  isSelected
                    ? 'bg-forest-700 text-white shadow-sm font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Max Surplus Price
          </label>
          <span className="text-xs font-extrabold text-forest-800">
            {formatCurrency(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="500"
          step="25"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-forest-700"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>₹50</span>
          <span>₹250</span>
          <span>₹500</span>
        </div>
      </div>

      {/* Expiry Window */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Pickup / Expiry Window
        </label>
        <select
          value={expiryFilter}
          onChange={(e) => setExpiryFilter(e.target.value)}
          className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-forest-600"
        >
          <option value="all">Any Pickup Time</option>
          <option value="today">Expiring Today</option>
          <option value="tomorrow">Tomorrow</option>
        </select>
      </div>

      {/* Sort Option */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Sort Listings By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-forest-600"
        >
          <option value="nearest">Nearest Location First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="discount">Highest Discount %</option>
        </select>
      </div>

      {/* Match count badge */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Available Listings:</span>
        <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full">
          {matchCount} items
        </span>
      </div>

      {isMobileDrawer && (
        <button
          onClick={onCloseMobileDrawer}
          className="w-full py-2.5 rounded-xl font-bold text-xs bg-forest-700 text-white"
        >
          Apply Filters ({matchCount})
        </button>
      )}
    </div>
  );
};
