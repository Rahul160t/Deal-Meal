import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ReviewModal } from '../../components/common/ReviewModal';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { EmptyState } from '../../components/common/EmptyState';
import { formatCurrency } from '../../utils/formatters';
import {
  ShoppingBag,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Star,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export const ConsumerBookings = ({ onOpenMobileSidebar }) => {
  const { bookings, currentUser, completeBookingPickup, cancelBooking, submitReview } = useApp();

  const [filterTab, setFilterTab] = useState('all'); // 'all', 'ready_for_pickup', 'completed', 'cancelled'
  const [selectedBookingForReview, setSelectedBookingForReview] = useState(null);
  const [cancelModalBooking, setCancelModalBooking] = useState(null);

  // Filter bookings belonging to this consumer
  const userBookings = bookings.filter(
    (b) => b.consumerId === currentUser?.uid || b.userRole === 'consumer'
  );

  const filtered = userBookings.filter((b) => {
    if (filterTab === 'all') return true;
    return b.status === filterTab;
  });

  const handleConfirmCancel = () => {
    if (cancelModalBooking) {
      cancelBooking(cancelModalBooking.bookingId);
      setCancelModalBooking(null);
    }
  };

  return (
    <div>
      <DashboardHeader
        title="My Orders & Counter Pickups"
        subtitle="Manage active pickup codes, complete store pickups, and rate your rescued meals."
        onOpenMobileSidebar={onOpenMobileSidebar}
      />

      {/* Review Modal */}
      {selectedBookingForReview && (
        <ReviewModal
          isOpen={!!selectedBookingForReview}
          booking={selectedBookingForReview}
          onSubmit={submitReview}
          onClose={() => setSelectedBookingForReview(null)}
        />
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalBooking && (
        <ConfirmationModal
          isOpen={!!cancelModalBooking}
          title="Cancel This Surplus Reservation?"
          message={`Are you sure you want to cancel booking ${cancelModalBooking.pickupCode} for ${cancelModalBooking.quantity}x "${cancelModalBooking.item}"? The reserved portions will be restored to the bakery inventory.`}
          confirmText="Yes, Cancel Booking"
          isDestructive={true}
          onConfirm={handleConfirmCancel}
          onCancel={() => setCancelModalBooking(null)}
        />
      )}

      <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'ready_for_pickup', label: 'Ready for Pickup' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((tab) => {
            const count =
              tab.id === 'all'
                ? userBookings.length
                : userBookings.filter((b) => b.status === tab.id).length;
            const active = filterTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  active
                    ? 'bg-forest-700 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-forest-800 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bookings List */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="No orders found in this category"
            description="Explore our marketplace to discover delicious discounted meals in Pune."
            actionLabel="Explore Food"
            onAction={() => (window.location.href = '/explore')}
          />
        ) : (
          <div className="space-y-4">
            {filtered.map((booking) => {
              const isReady = booking.status === 'ready_for_pickup';
              const isCompleted = booking.status === 'completed';

              return (
                <div
                  key={booking.bookingId}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row justify-between gap-6"
                >
                  {/* Left: Image & Details */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
                    <img
                      src={booking.image}
                      alt={booking.item}
                      className="w-full sm:w-32 h-32 rounded-2xl object-cover border border-slate-200 flex-shrink-0"
                    />

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StatusBadge status={booking.status} size="sm" />
                        <span className="text-xs text-slate-400">• Order #{booking.bookingId}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900">
                        {booking.item}
                      </h3>

                      <p className="text-xs font-semibold text-forest-800">
                        {booking.businessName} • {booking.location}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-forest-600" />
                          <span>Pickup: {booking.pickupWindow}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-forest-600" />
                          <span className="truncate">{booking.address}</span>
                        </span>
                      </div>

                      {/* Pricing summary */}
                      <div className="pt-2 flex items-baseline gap-3 text-xs">
                        <span className="font-bold text-slate-900">
                          {booking.quantity} portion(s) = {formatCurrency(booking.totalAmount)}
                        </span>
                        {booking.savings > 0 && (
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                            Saved {formatCurrency(booking.savings)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Pickup Code Ticket & Interactive Actions */}
                  <div className="lg:w-72 bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between gap-3 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Counter Pickup Code
                      </span>
                      <div className="text-2xl font-black text-forest-900 font-mono tracking-wider my-1">
                        {booking.pickupCode}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Show this at counter to verify
                      </p>
                    </div>

                    {/* Action buttons based on status */}
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      {isReady && (
                        <>
                          <button
                            onClick={() => completeBookingPickup(booking.bookingId)}
                            className="w-full py-2 rounded-xl text-xs font-bold text-white bg-forest-700 hover:bg-forest-800 shadow-sm transition flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" /> Mark as Picked Up
                          </button>
                          <button
                            onClick={() => setCancelModalBooking(booking)}
                            className="w-full py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                          >
                            Cancel Reservation
                          </button>
                        </>
                      )}

                      {isCompleted && (
                        <div>
                          {booking.hasReview ? (
                            <div className="text-xs text-amber-700 font-semibold flex items-center justify-center gap-1 bg-amber-50 py-1.5 rounded-xl border border-amber-200">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span>Rated {booking.rating}/5 Stars</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedBookingForReview(booking)}
                              className="w-full py-2 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 shadow-sm transition flex items-center justify-center gap-1.5"
                            >
                              <Star className="w-3.5 h-3.5 text-amber-500" /> Write a Review
                            </button>
                          )}
                        </div>
                      )}

                      {booking.status === 'cancelled' && (
                        <p className="text-xs text-slate-400 italic">
                          Reservation cancelled • Inventory restored
                        </p>
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
