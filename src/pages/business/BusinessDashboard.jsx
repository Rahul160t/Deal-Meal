import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatCard } from '../../components/dashboard/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { formatCurrency } from '../../utils/formatters';
import {
  Store,
  PlusCircle,
  TrendingUp,
  ShoppingBag,
  CheckCircle2,
  Leaf,
  Clock,
  ArrowRight,
  Sparkles,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const BusinessDashboard = ({ onOpenMobileSidebar }) => {
  const { listings, bookings, currentUser } = useApp();

  // Filter listings by current business
  const businessListings = listings.filter(
    (l) => l.businessId === currentUser?.uid || l.businessId === 'user_business_1'
  );

  const activeListings = businessListings.filter((l) => l.status === 'active');

  // Bookings for this business
  const businessBookings = bookings.filter(
    (b) => b.businessId === currentUser?.uid || b.businessId === 'user_business_1'
  );

  const completedPickups = businessBookings.filter((b) => b.status === 'completed');
  const activeReservations = businessBookings.filter((b) => b.status === 'ready_for_pickup');

  // Estimated Revenue
  const totalRevenue = completedPickups.reduce((sum, b) => sum + (b.totalAmount || 0), 0) + 4850;
  const totalItemsRescued = completedPickups.reduce((sum, b) => sum + (b.quantity || 1), 0) + 38;

  // Recharts demo weekly surplus rescue data
  const chartData = [
    { day: 'Mon', rescued: 6, revenue: 980 },
    { day: 'Tue', rescued: 8, revenue: 1250 },
    { day: 'Wed', rescued: 5, revenue: 840 },
    { day: 'Thu', rescued: 9, revenue: 1420 },
    { day: 'Fri', rescued: 12, revenue: 1960 },
    { day: 'Sat', rescued: 15, revenue: 2450 },
    { day: 'Sun (Today)', rescued: 11, revenue: 1720 },
  ];

  return (
    <div>
      <DashboardHeader
        title={`${currentUser?.businessName || 'The French Window Patisserie'} 🥐`}
        subtitle="Business Management Portal — Monitor surplus listings, customer pickups, and recovered revenue."
        onOpenMobileSidebar={onOpenMobileSidebar}
        actions={
          <Link
            to="/business/listings"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-forest-700 hover:bg-forest-800 shadow-sm transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" /> Add New Surplus Listing
          </Link>
        }
      />

      <div className="p-4 sm:p-8 space-y-8 max-w-7xl">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Surplus Portions Rescued"
            value={totalItemsRescued}
            subtitle="Diverted from waste bin"
            icon={Leaf}
            trend="+18% vs last week"
            colorScheme="forest"
          />
          <StatCard
            title="Estimated Revenue Recovered"
            value={formatCurrency(totalRevenue)}
            subtitle="From completed paid pickups"
            icon={TrendingUp}
            colorScheme="amber"
          />
          <StatCard
            title="Active Published Listings"
            value={activeListings.length}
            subtitle="Live on explore marketplace"
            icon={Store}
            colorScheme="blue"
          />
          <StatCard
            title="Pending Counter Pickups"
            value={activeReservations.length}
            subtitle="Awaiting customer code arrival"
            icon={Clock}
            colorScheme="purple"
          />
        </div>

        {/* Chart & Quick Action Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Performance Chart */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-forest-700" /> Weekly Surplus Rescue & Revenue Trend
                </h3>
                <p className="text-xs text-slate-500">
                  Number of surplus portions rescued daily by consumers & charities
                </p>
              </div>
              <span className="text-xs font-bold text-forest-800 bg-forest-50 px-2.5 py-1 rounded-full">
                Past 7 Days
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(val, name) => [
                      name === 'revenue' ? `₹${val}` : `${val} portions`,
                      name === 'revenue' ? 'Revenue Recovered' : 'Portions Rescued',
                    ]}
                  />
                  <Bar dataKey="rescued" fill="#15803d" radius={[6, 6, 0, 0]} name="rescued" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Listing Control Box */}
          <div className="lg:col-span-4 bg-gradient-to-br from-forest-900 to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-800 text-limebrand-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Shift End Action
            </div>
            <h3 className="text-lg font-bold">Have Unsold Surplus Tonight?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Don't throw away edible croissants, packaged bread, or cooked meals. Turn waste into recovered revenue and community goodwill.
            </p>
            <div className="pt-2">
              <Link
                to="/business/listings"
                className="w-full py-3 rounded-xl bg-limebrand-400 hover:bg-limebrand-300 text-forest-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
              >
                <PlusCircle className="w-4 h-4" /> Create Surplus Listing
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Reservations Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Customer Reservations & Claims</h3>
              <p className="text-xs text-slate-500">Verify customer pickup codes at the counter</p>
            </div>
            <Link
              to="/business/listings"
              className="text-xs font-bold text-forest-700 hover:underline"
            >
              Manage Listings
            </Link>
          </div>

          {businessBookings.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">
              No reservations yet. Your listings will appear on the explore page.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase font-semibold">
                    <th className="pb-3">Customer / Organization</th>
                    <th className="pb-3">Surplus Item</th>
                    <th className="pb-3">Portions</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Pickup Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {businessBookings.map((b) => (
                    <tr key={b.bookingId} className="hover:bg-slate-50/60 transition">
                      <td className="py-3 pr-3">
                        <p className="font-bold text-slate-900">
                          {b.consumerName || b.charityName || 'Customer'}
                        </p>
                        <span className="text-[10px] text-slate-400 capitalize">
                          {b.userRole}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-slate-700">{b.item}</td>
                      <td className="py-3 font-semibold text-slate-900">{b.quantity}</td>
                      <td className="py-3 font-bold text-forest-800">
                        {b.totalAmount === 0 ? '₹0 (Charity)' : formatCurrency(b.totalAmount)}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={b.status} size="sm" />
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-emerald-700 text-sm">
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
