import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { VerifiedBadge } from '../components/common/VerifiedBadge';
import { FoodCard } from '../components/food/FoodCard';
import { ReserveModal } from '../components/food/ReserveModal';
import { formatCurrency, calculateDiscount } from '../utils/formatters';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  ShoppingBag,
  Info,
  CheckCircle2,
  Share2,
  Store,
} from 'lucide-react';

export const FoodDetailsPage = () => {
  const { id } = useParams();
  const { listings, reviews, currentUser, showToast } = useApp();
  const navigate = useNavigate();

  const [reserveModalOpen, setReserveModalOpen] = useState(false);

  // Find target listing
  const listing = listings.find((l) => l.listingId === id);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Food Listing Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">
          The requested surplus portion may have expired or already been rescued.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-700 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Explore Food
        </Link>
      </div>
    );
  }

  const isCharity = currentUser?.role === 'charity';
  const isBusiness = currentUser?.role === 'business';
  const isSoldOut = listing.quantity <= 0 || listing.status === 'sold_out';
  const discount = calculateDiscount(listing.originalPrice, listing.surplusPrice);

  // Filter reviews for this business
  const businessReviews = reviews.filter((r) => r.businessId === listing.businessId);

  // Find similar items (same category or nearby)
  const similarItems = listings
    .filter((l) => l.listingId !== listing.listingId && l.category === listing.category)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${listing.item} on Deal Meal`,
        text: `Save food waste! ${listing.item} available at ${listing.businessName} Pune.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Listing link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Reserve Modal */}
      <ReserveModal
        isOpen={reserveModalOpen}
        listing={listing}
        isCharity={isCharity}
        onClose={() => setReserveModalOpen(false)}
      />

      {/* Back button & Category Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Listings
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition bg-white px-3 py-1.5 rounded-xl border border-slate-200"
        >
          <Share2 className="w-3.5 h-3.5" /> Share
        </button>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image and Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl overflow-hidden bg-slate-100 shadow-md border border-slate-200/80 aspect-[4/3] max-h-[480px] w-full">
            <img
              src={listing.image}
              alt={listing.item}
              className="w-full h-full object-cover"
            />
            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-forest-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {listing.category}
              </span>
              <span className="bg-white/95 backdrop-blur-md text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                <MapPin className="w-3 h-3 text-emerald-600" /> {listing.distanceKm} km away
              </span>
            </div>

            {isSoldOut && (
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-rose-600 text-white font-extrabold text-sm px-5 py-2 rounded-full uppercase tracking-wider shadow-lg">
                  Sold Out • Portions Finished
                </span>
              </div>
            )}
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">About This Surplus Portion</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {listing.description}
            </p>

            {/* Dietary tags */}
            {listing.dietary && listing.dietary.length > 0 && (
              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Dietary & Culinary Tags
                </span>
                <div className="flex flex-wrap gap-2">
                  {listing.dietary.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-forest-800 border border-emerald-100"
                    >
                      🌱 {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Business Profile & Verified Info */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={listing.businessAvatar}
                  alt={listing.businessName}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{listing.businessName}</h3>
                    {listing.verified && <VerifiedBadge size="sm" />}
                  </div>
                  <p className="text-xs text-slate-500">{listing.address || listing.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-xs font-bold text-amber-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>{listing.rating} ({listing.reviewCount} reviews)</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Partner verified under Deal Meal Pune culinary food surplus charter. Portions are packed fresh in hygienic food-grade containers for seamless counter pickup.
            </p>
          </div>

          {/* Customer Reviews for this Restaurant */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Community Reviews ({businessReviews.length})
            </h3>

            {businessReviews.length === 0 ? (
              <p className="text-xs text-slate-400 italic">
                No reviews yet for this outlet. Complete a pickup to share feedback!
              </p>
            ) : (
              <div className="space-y-4 divide-y divide-slate-100">
                {businessReviews.map((rev) => (
                  <div key={rev.ratingId} className="pt-3 first:pt-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.userAvatar}
                          alt={rev.userName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-slate-800">{rev.userName}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(rev.score)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 pl-9 leading-relaxed">
                      "{rev.reviewText}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Reservation & Pricing Card */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-100 shadow-xl space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forest-700 bg-forest-50 px-2.5 py-0.5 rounded-full">
                  {listing.category} Portion
                </span>
                <span className="text-xs font-semibold text-forest-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {listing.quantity} {listing.quantity === 1 ? 'portion' : 'portions'} available
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 leading-snug">
                {listing.item}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                From <strong className="text-slate-800">{listing.businessName}</strong> ({listing.location})
              </p>
            </div>

            {/* Price section */}
            <div className="p-4 rounded-2xl bg-warmbg border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Surplus Deal Price
              </span>
              <PriceDisplay
                originalPrice={listing.originalPrice}
                surplusPrice={listing.surplusPrice}
                isCharity={isCharity}
                size="lg"
              />
              {!isCharity && discount > 0 && (
                <p className="text-xs text-forest-700 font-medium mt-1">
                  You save {formatCurrency(listing.originalPrice - listing.surplusPrice)} compared to regular dining prices!
                </p>
              )}
            </div>

            {/* Pickup Details Box */}
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-forest-700 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-800 block">Designated Pickup Window:</strong>
                  <span>{listing.pickupWindow}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-forest-700 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-800 block">Pickup Address:</strong>
                  <span>{listing.address || listing.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-forest-700 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-800 block">In-store Verification:</strong>
                  <span>Show your generated Deal Meal Pickup Code at the counter.</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div>
              {isBusiness ? (
                <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-center space-y-2.5">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-900">
                    <Store className="w-4 h-4 text-amber-700" /> Food Provider Partner Portal
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Business accounts publish surplus food for consumers and charities. Businesses cannot place reservations.
                  </p>
                  <Link
                    to="/business/listings"
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 transition"
                  >
                    Manage Your Own Listings →
                  </Link>
                </div>
              ) : isSoldOut ? (
                <button
                  disabled
                  className="w-full py-3.5 rounded-2xl font-bold text-sm bg-slate-200 text-slate-400 cursor-not-allowed"
                >
                  Sold Out
                </button>
              ) : (
                <button
                  onClick={() => setReserveModalOpen(true)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm text-white shadow-xl transition flex items-center justify-center gap-2 ${
                    isCharity
                      ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-900/20'
                      : 'bg-forest-700 hover:bg-forest-800 shadow-forest-900/20'
                  }`}
                >
                  {isCharity ? (
                    <>
                      <HeartHandshake className="w-5 h-5" /> Claim Free Donation (₹0)
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-limebrand-300" /> Reserve Surplus Portion
                    </>
                  )}
                </button>
              )}
              {!isBusiness && (
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  No credit card required • In-person verification code generated instantly
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Listings Carousel / Row */}
      {similarItems.length > 0 && (
        <div className="mt-16 pt-12 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              More {listing.category} Surplus Portions
            </h2>
            <Link
              to="/explore"
              className="text-xs font-bold text-forest-700 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarItems.map((item) => (
              <FoodCard key={item.listingId} listing={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
