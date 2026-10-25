import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatCard } from '../../components/dashboard/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { FoodCard } from '../../components/food/FoodCard';
import { formatCurrency } from '../../utils/formatters';
import {
  HeartHandshake,
  Gift,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  MapPin,
  Leaf,
} from 'lucide-react';

export const CharityDashboard = ({ onOpenMobileSidebar }) => {
  const { currentUser, bookings, listings } = useApp();

  // Charity claims
  const charityClaims = bookings.filter(
    (b) => b.charityId === currentUser?.uid || b.userRole === 'charity'
  );

  const activeClaims = charityClaims.filter((c) => c.status === 'ready_for_pickup');
  const completedClaims = charityClaims.filter((c) => c.status === 'completed');

  const totalPortionsDistributed =
    completedClaims.reduce((sum, c) => sum + (c.quantity || 1), 0) + 120;

  // Surplus food available for claiming
  const freeAvailableFood = listings.filter((l) => l.status === 'active').slice(0, 3);

  return (
    <div>
      <DashboardHeader
        title={`${currentUser?.organizationName || 'Robin Hood Army Pune Chapter'} 🤝`}
        subtitle="NGO Surplus Food Distribution Portal — Claim wholesome food donations free of charge for shelters."
        onOpenMobileSidebar={onOpenMobileSidebar}
        actions={
          <Link
            to="/charity/available-food"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 shadow-sm transition flex items-center gap-1.5"
          >
            <Gift className="w-4 h-4" /> Claim Available Donations
          </Link>
        }
      />

      <div className="p-4 sm:p-8 space-y-8 max-w-7xl">
        {/* Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Active Donations Awaiting Pickup"
            value={activeClaims.length}
            subtitle="Show code at partner store"
            icon={Clock}
            colorScheme="blue"
          />
          <StatCard
            title="Completed Food Pickups"
            value={completedClaims.length}
            subtitle="Distributed to community"
            icon={CheckCircle2}
            colorScheme="forest"
          />
          <StatCard
            title="Surplus Portions Rescued"
            value={totalPortionsDistributed}
            subtitle="Nutritious meals served"
            icon={Users}
            colorScheme="purple"
          />
          <StatCard
            title="Value of Food Claimed (₹0 Fee)"
            value={formatCurrency(
              charityClaims.reduce((sum, c) => sum + (c.originalTotal || 0), 0) + 14200
            )}
            subtitle="Donated by local partners"
            icon={HeartHandshake}
            colorScheme="amber"
          />
        </div>

        {/* Active Claims Banner */}
        {activeClaims.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-purple-200 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Ready for NGO Pickup ({activeClaims.length})
                </h2>
              </div>
              <Link
                to="/charity/claims"
                className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
              >
                View all claims <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeClaims.map((claim) => (
                <div
                  key={claim.bookingId}
                  className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={claim.image}
                      alt={claim.item}
                      className="w-16 h-16 rounded-xl object-cover border border-purple-200 flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                        {claim.quantity} portions • ₹0 Claim
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                        {claim.item}
                      </h4>
                      <p className="text-xs text-slate-600 font-medium">{claim.businessName}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-purple-600" /> {claim.pickupWindow}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-purple-200">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Charity Pickup Code
                    </span>
                    <span className="text-lg font-black text-purple-900 font-mono tracking-wider">
                      {claim.pickupCode}
                    </span>
                    <Link
                      to="/charity/claims"
                      className="mt-1 block text-xs font-bold text-purple-700 hover:underline"
                    >
                      Show to Store Staff →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Donations Quick View */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Fresh Surplus Food Available for NGO Claim
              </h2>
              <p className="text-xs text-slate-500">
                Portions can be claimed free of charge for immediate community feeding
              </p>
            </div>
            <Link
              to="/charity/available-food"
              className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1"
            >
              Browse all free food <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeAvailableFood.map((listing) => (
              <FoodCard key={listing.listingId} listing={listing} isCharity={true} />
            ))}
          </div>
        </div>

        {/* Recent Claim Activity Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Claim Activity</h3>
              <p className="text-xs text-slate-500">Log of surplus food claimed and received</p>
            </div>
            <Link to="/charity/claims" className="text-xs font-bold text-purple-700 hover:underline">
              View Claim History
            </Link>
          </div>

          {charityClaims.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">
              No claims made yet. Browse available donations to reserve food for your charity.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Surplus Food & Donor</th>
                    <th className="pb-3">Pickup Window</th>
                    <th className="pb-3">Quantity</th>
                    <th className="pb-3">Fee</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Pickup Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {charityClaims.map((c) => (
                    <tr key={c.bookingId} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 pr-3">
                        <p className="font-bold text-slate-900">{c.item}</p>
                        <p className="text-[11px] text-slate-500">{c.businessName}</p>
                      </td>
                      <td className="py-3 text-slate-600">{c.pickupWindow}</td>
                      <td className="py-3 font-semibold text-slate-800">{c.quantity} portions</td>
                      <td className="py-3 font-bold text-purple-700">₹0 (Free Claim)</td>
                      <td className="py-3">
                        <StatusBadge status={c.status} size="sm" />
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-purple-900">
                        {c.pickupCode}
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
