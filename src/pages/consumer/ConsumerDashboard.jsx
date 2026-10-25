import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatCard } from '../../components/dashboard/StatCard';
import { FoodCard } from '../../components/food/FoodCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PriceDisplay } from '../../components/common/PriceDisplay';
import { ReserveModal } from '../../components/food/ReserveModal';
import { formatCurrency } from '../../utils/formatters';
import {
  ShoppingBag,
  CheckCircle2,
  TrendingDown,
  Compass,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Utensils,
  Leaf,
} from 'lucide-react';

export const ConsumerDashboard = ({ onOpenMobileSidebar }) => {
  const { currentUser, bookings, listings, notifications } = useApp();
  const [selectedListingForReserve, setSelectedListingForReserve] = useState(null);

  // User's bookings
  const userBookings = bookings.filter(
    (b) => b.consumerId === currentUser?.uid || b.userRole === 'consumer'
  );

  const activeBookings = userBookings.filter((b) => b.status === 'ready_for_pickup');
  const completedBookings = userBookings.filter((b) => b.status === 'completed');

  // Total savings
  const totalSavings = userBookings.reduce((sum, b) => sum + (b.savings || 0), 0) + (currentUser?.savedMoney || 0);
  const totalMealsRescued = completedBookings.reduce((sum, b) => sum + (b.quantity || 1), 0) + (currentUser?.mealsRescued || 0);

  // Recommended & nearby surplus food
  const recommendedFood = listings.filter((l) => l.status === 'active').slice(0, 3);
  const nearbyFood = listings.filter((l) => l.status === 'active').slice(3, 6);

  return (
    <div>
      <DashboardHeader
        title={`Welcome back, ${currentUser?.name?.split(' ')[0] || 'Aarav'}! 🥗`}
        subtitle="Track your surplus food reservations, pickup codes, and community impact."
        onOpenMobileSidebar={onOpenMobileSidebar}
      />

      <div className="p-4 sm:p-8 space-y-8 max-w-7xl">
        {/* Reserve Modal */}
        {selectedListingForReserve && (
          <ReserveModal
            isOpen={!!selectedListingForReserve}
            listing={selectedListingForReserve}
            isCharity={false}
            onClose={() => setSelectedListingForReserve(null)}
            onSuccess={() => setSelectedListingForReserve(null)}
          />
        )}

        {/* Impact & Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Active Reservations"
            value={activeBookings.length}
            subtitle="Ready for counter pickup"
            icon={Clock}
            colorScheme="blue"
          />
          <StatCard
            title="Meals Rescued"
            value={totalMealsRescued}
            subtitle="Diverted from waste"
            icon={ShoppingBag}
            trend="+3 this week"
            colorScheme="forest"
          />
          <StatCard
            title="Total Money Saved"
            value={formatCurrency(totalSavings)}
            subtitle="Compared to menu prices"
            icon={TrendingDown}
            colorScheme="amber"
          />
          <StatCard
            title="Carbon Footprint Saved"
            value={`${(totalMealsRescued * 2.2).toFixed(1)} kg`}
            subtitle="CO₂ emissions prevented"
            icon={Leaf}
            colorScheme="forest"
          />
        </div>

        {/* Active Upcoming Pickups Section */}
        {activeBookings.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-100 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Ready for In-Store Pickup ({activeBookings.length})
                </h2>
              </div>
              <Link
                to="/consumer/bookings"
                className="text-xs font-bold text-forest-700 hover:text-forest-800 flex items-center gap-1"
              >
                View all orders <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeBookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.image}
                      alt={booking.item}
                      className="w-16 h-16 rounded-xl object-cover border border-emerald-200 flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-2 py-0.5 rounded">
                        {booking.quantity} portion(s)
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                        {booking.item}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">{booking.businessName}</p>
                      <p className="text-[11px] text-slate-600 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-emerald-600" /> {booking.pickupWindow}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-emerald-200">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Pickup Code
                    </span>
                    <span className="text-xl font-black text-forest-900 font-mono tracking-wider">
                      {booking.pickupCode}
                    </span>
                    <Link
                      to="/consumer/bookings"
                      className="mt-1 block text-xs font-bold text-forest-700 hover:underline"
                    >
                      Show at Counter →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Surplus Food */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recommended Surplus Near You</h2>
              <p className="text-xs text-slate-500">Curated from high-rated Pune bakeries & restaurants</p>
            </div>
            <Link
              to="/explore"
              className="text-xs font-bold text-forest-700 hover:text-forest-800 flex items-center gap-1"
            >
              Explore all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedFood.map((listing) => (
              <FoodCard
                key={listing.listingId}
                listing={listing}
                onQuickReserve={(item) => setSelectedListingForReserve(item)}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity & Recent Bookings Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Booking History</h3>
              <p className="text-xs text-slate-500">Your recent surplus food reservations</p>
            </div>
            <Link
              to="/consumer/bookings"
              className="text-xs font-bold text-forest-700 hover:underline"
            >
              View Full History
            </Link>
          </div>

          {userBookings.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">
              No bookings yet. Browse the explore page to rescue your first surplus meal!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Item & Business</th>
                    <th className="pb-3">Pickup Window</th>
                    <th className="pb-3">Portions</th>
                    <th className="pb-3">Total Paid</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Pickup Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {userBookings.slice(0, 5).map((b) => (
                    <tr key={b.bookingId} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 pr-3">
                        <p className="font-bold text-slate-900">{b.item}</p>
                        <p className="text-[11px] text-slate-500">{b.businessName}</p>
                      </td>
                      <td className="py-3 text-slate-600">{b.pickupWindow}</td>
                      <td className="py-3 font-semibold text-slate-800">{b.quantity}</td>
                      <td className="py-3 font-bold text-forest-800">
                        {formatCurrency(b.totalAmount)}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={b.status} size="sm" />
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-slate-900">
                        {b.pickupCode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
