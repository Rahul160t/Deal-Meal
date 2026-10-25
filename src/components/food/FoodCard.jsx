import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Sparkles, HeartHandshake, Eye } from 'lucide-react';
import { PriceDisplay } from '../common/PriceDisplay';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { StatusBadge } from '../common/StatusBadge';
import { useApp } from '../../context/AppContext';

export const FoodCard = ({
  listing,
  viewMode = 'grid', // 'grid' | 'list'
  isCharity = false,
  onQuickReserve,
}) => {
  const { currentUser } = useApp();
  const isBusiness = currentUser?.role === 'business';
  const isSoldOut = listing.quantity <= 0 || listing.status === 'sold_out';

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition duration-200 overflow-hidden flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative sm:w-56 h-48 sm:h-auto flex-shrink-0 bg-slate-100 overflow-hidden">
          <img
            src={listing.image}
            alt={listing.item}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" /> {listing.distanceKm} km
            </span>
          </div>
          {isSoldOut && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-rose-600 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-2 py-0.5 rounded-md">
                    {listing.category}
                  </span>
                  {listing.verified && <VerifiedBadge size="sm" />}
                </div>
                <h3 className="text-lg font-bold text-slate-900 hover:text-forest-700 transition">
                  <Link to={`/food/${listing.listingId}`}>{listing.item}</Link>
                </h3>
                <p className="text-xs text-slate-500 font-medium">{listing.businessName} • {listing.location}</p>
              </div>

              <div className="text-right">
                <PriceDisplay
                  originalPrice={listing.originalPrice}
                  surplusPrice={listing.surplusPrice}
                  isCharity={isCharity}
                  size="md"
                />
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
              {listing.description}
            </p>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
              <span className="flex items-center gap-1 font-medium text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {listing.rating} ({listing.reviewCount})
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {listing.pickupWindow}
              </span>
              <span className="font-semibold text-forest-700 bg-emerald-50 px-2 py-0.5 rounded">
                {listing.quantity} {listing.quantity === 1 ? 'portion' : 'portions'} left
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/food/${listing.listingId}`}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Details
              </Link>
              {!isSoldOut && !isBusiness && onQuickReserve && (
                <button
                  onClick={() => onQuickReserve(listing)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold text-white shadow-sm transition flex items-center gap-1.5 ${
                    isCharity
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-forest-700 hover:bg-forest-800'
                  }`}
                >
                  {isCharity ? (
                    <>
                      <HeartHandshake className="w-3.5 h-3.5" /> Claim Free
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" /> Reserve
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Card View (Default)
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-200 overflow-hidden flex flex-col justify-between">
      {/* Top Image Box */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.item}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        {/* Badges on image */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-white/95 backdrop-blur-sm text-forest-900 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {listing.category}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 text-emerald-400" /> {listing.distanceKm} km
          </span>
        </div>

        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md font-medium">
            <Clock className="w-3 h-3 text-amber-300" /> {listing.pickupWindow}
          </span>
          <span className="bg-emerald-600 font-bold px-2 py-0.5 rounded-md shadow text-[11px]">
            {listing.quantity} left
          </span>
        </div>

        {isSoldOut && (
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-rose-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Details Box */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <p className="text-xs text-slate-500 font-medium truncate">{listing.location}</p>
            {listing.verified && <VerifiedBadge size="sm" showText={false} />}
          </div>

          <h3 className="font-bold text-slate-900 text-base group-hover:text-forest-700 transition line-clamp-1">
            <Link to={`/food/${listing.listingId}`}>{listing.item}</Link>
          </h3>

          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-slate-600 truncate font-medium">{listing.businessName}</p>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{listing.rating}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3.5 mt-3 border-t border-slate-100 flex items-center justify-between">
          <PriceDisplay
            originalPrice={listing.originalPrice}
            surplusPrice={listing.surplusPrice}
            isCharity={isCharity}
            size="sm"
          />

          <div className="flex items-center gap-1.5">
            <Link
              to={`/food/${listing.listingId}`}
              className="p-2 rounded-xl text-slate-600 hover:text-forest-700 hover:bg-slate-100 transition"
              title="View full details"
            >
              <Eye className="w-4 h-4" />
            </Link>

            {!isSoldOut && !isBusiness && onQuickReserve && (
              <button
                onClick={() => onQuickReserve(listing)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-sm transition flex items-center gap-1 ${
                  isCharity
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-forest-700 hover:bg-forest-800'
                }`}
              >
                {isCharity ? 'Claim' : 'Reserve'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
