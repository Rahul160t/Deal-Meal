import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, calculateDiscount } from '../../utils/formatters';
import {
  X,
  Plus,
  Minus,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReserveModal = ({ isOpen, listing, isCharity = false, onClose, onSuccess }) => {
  const { reserveOrClaimFood, currentUser } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isOpen || !listing || currentUser?.role === 'business') return null;

  const maxAvailable = listing.quantity || 1;
  const unitPrice = isCharity ? 0 : listing.surplusPrice;
  const totalPrice = unitPrice * quantity;
  const originalTotal = listing.originalPrice * quantity;
  const totalSavings = originalTotal - totalPrice;

  const handleIncrement = () => {
    if (quantity < maxAvailable) setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const result = reserveOrClaimFood({
        listingId: listing.listingId,
        quantity,
        isCharityClaim: isCharity,
        notes,
      });

      setIsSubmitting(false);

      if (result.success) {
        setConfirmedBooking(result.booking);
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // ignore if canvas not supported
        }
        if (onSuccess) onSuccess(result.booking);
      }
    }, 400);
  };

  const handleClose = () => {
    setConfirmedBooking(null);
    setQuantity(1);
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedBooking ? (
          /* Confirmation Success View */
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900">
              {isCharity ? 'Donation Claimed!' : 'Surplus Food Reserved!'}
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
              {isCharity
                ? 'Your organization claim has been registered. Please present your pickup code at the counter.'
                : 'Your surplus food has been held. Pay during in-store pickup or show your reference code.'}
            </p>

            {/* Pickup Code Ticket */}
            <div className="my-6 p-4 rounded-2xl bg-forest-50/80 border-2 border-dashed border-forest-300 text-center">
              <span className="text-xs font-semibold text-forest-800 uppercase tracking-widest">
                Official Pickup Code
              </span>
              <div className="text-3xl font-black text-forest-900 tracking-wider my-1 font-mono">
                {confirmedBooking.pickupCode}
              </div>
              <p className="text-xs text-forest-700">
                Show this code at {confirmedBooking.businessName}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-left text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Item:</span>
                <span className="font-semibold text-slate-900">{confirmedBooking.item}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Portions:</span>
                <span className="font-semibold text-slate-900">{confirmedBooking.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Window:</span>
                <span className="font-semibold text-slate-900">{confirmedBooking.pickupWindow}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="font-semibold text-slate-900">{confirmedBooking.address}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm">
                <span className="font-bold text-slate-900">Total Due at Pickup:</span>
                <span className="font-extrabold text-forest-800">
                  {isCharity ? '₹0 (Free Donation)' : formatCurrency(confirmedBooking.totalAmount)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl font-bold text-sm bg-forest-700 hover:bg-forest-800 text-white shadow-md transition"
              >
                Done & View Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Form View */
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isCharity
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {isCharity ? 'Charity Surplus Claim' : 'Consumer Reservation'}
              </span>
              <span className="text-xs text-slate-400">• {listing.category}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 pr-6">{listing.item}</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Offered by <strong className="text-slate-700">{listing.businessName}</strong> ({listing.location})
            </p>

            {/* Quick Details Pill */}
            <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-forest-600" />
                <span>Pickup: {listing.pickupWindow}</span>
              </div>
              <div className="font-semibold text-forest-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                {maxAvailable} available
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="mt-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Quantity to Reserve
              </label>
              <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200">
                <span className="text-sm font-medium text-slate-700">Portions / Packages:</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-base font-extrabold w-6 text-center text-slate-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={quantity >= maxAvailable}
                    className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Optional Pickup Note */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Pickup Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Arriving around 8 PM, please pack in recyclable bag"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-forest-600"
              />
            </div>

            {/* Cost & Savings Summary */}
            <div className="mt-5 p-4 rounded-2xl bg-warmbg border border-slate-200/80 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Original Menu Value:</span>
                <span className="line-through">{formatCurrency(originalTotal)}</span>
              </div>
              {!isCharity && (
                <div className="flex justify-between text-xs text-forest-700 font-semibold">
                  <span>Your Surplus Discount Savings:</span>
                  <span>- {formatCurrency(totalSavings)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-slate-900">Amount Due at Pickup:</span>
                  <p className="text-[11px] text-slate-400">Demo Prototype — No online payment charged</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-forest-900">
                    {isCharity ? '₹0' : formatCurrency(totalPrice)}
                  </span>
                  {isCharity && (
                    <span className="block text-[11px] font-bold text-purple-700">100% Free For NGO</span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isSubmitting || maxAvailable <= 0}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-md transition flex items-center gap-2 ${
                  isCharity
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-forest-700 hover:bg-forest-800'
                }`}
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : isCharity ? (
                  <>
                    <HeartHandshake className="w-4 h-4" /> Confirm Free Claim
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Confirm Reservation
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
