import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { formatCurrency } from '../../utils/formatters';
import {
  HeartHandshake,
  CheckCircle2,
  Clock,
  MapPin,
  Gift,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const CharityClaims = ({ onOpenMobileSidebar }) => {
  const { bookings, currentUser, completeBookingPickup } = useApp();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'ready_for_pickup', 'completed'

  const charityClaims = bookings.filter(
    (b) => b.charityId === currentUser?.uid || b.userRole === 'charity'
  );

  const filtered = charityClaims.filter((c) => {
    if (activeTab === 'all') return true;
    return c.status === activeTab;
  });

  return (
    <div>
      <DashboardHeader
        title="NGO Food Claims & Pickup Codes"
        subtitle="Track active claims, present pickup codes at partner stores, and mark completed pickups."
        onOpenMobileSidebar={onOpenMobileSidebar}
      />

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
        {/* Tab Filter */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'all', label: 'All NGO Claims' },
            { id: 'ready_for_pickup', label: 'Ready for Pickup' },
            { id: 'completed', label: 'Completed Deliveries' },
          ].map((tab) => {
            const count =
              tab.id === 'all'
                ? charityClaims.length
                : charityClaims.filter((c) => c.status === tab.id).length;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  active
                    ? 'bg-purple-700 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-purple-800 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Claims List */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={HeartHandshake}
            title="No charity claims found"
            description="Explore our available free surplus donations to reserve food for community shelters."
            actionLabel="Browse Free Donations"
            onAction={() => (window.location.href = '/charity/available-food')}
          />
        ) : (
          <div className="space-y-4">
            {filtered.map((claim) => {
              const isReady = claim.status === 'ready_for_pickup';

              return (
                <div
                  key={claim.bookingId}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row justify-between gap-6"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
                    <img
                      src={claim.image}
                      alt={claim.item}
                      className="w-full sm:w-32 h-32 rounded-2xl object-cover border border-slate-200 flex-shrink-0"
                    />

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StatusBadge status={claim.status} size="sm" />
                        <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full">
                          100% Free Donation Claim
                        </span>
                        <span className="text-xs text-slate-400">• Ref #{claim.bookingId}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">{claim.item}</h3>
                      <p className="text-xs font-semibold text-slate-700">
                        Donated by {claim.businessName} • {claim.location}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-purple-600" />
                          <span>Pickup: {claim.pickupWindow}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-purple-600" />
                          <span className="truncate">{claim.address}</span>
                        </span>
                      </div>

                      <p className="text-xs font-bold text-forest-800 pt-1">
                        Claimed Portions: {claim.quantity} (Value: {formatCurrency(claim.originalTotal)} - Donated for ₹0)
                      </p>
                    </div>
                  </div>

                  {/* Pickup Code Ticket & Interactive Action */}
                  <div className="lg:w-72 bg-purple-50/60 rounded-2xl p-4 border border-purple-200 flex flex-col justify-between gap-3 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-800 tracking-wider">
                        Official NGO Pickup Code
                      </span>
                      <div className="text-2xl font-black text-purple-900 font-mono tracking-wider my-1">
                        {claim.pickupCode}
                      </div>
                      <p className="text-[11px] text-purple-700 font-medium">
                        Present to store manager for handover
                      </p>
                    </div>

                    <div className="pt-2 border-t border-purple-200">
                      {isReady ? (
                        <button
                          onClick={() => completeBookingPickup(claim.bookingId)}
                          className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 shadow transition flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Mark as Food Received
                        </button>
                      ) : (
                        <div className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1 bg-emerald-50 py-2 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Handover Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
