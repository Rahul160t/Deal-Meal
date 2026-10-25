import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

export const ReviewModal = ({ isOpen, booking, onSubmit, onClose }) => {
  const [score, setScore] = useState(5);
  const [hoverScore, setHoverScore] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !booking) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      setError('Please provide a short comment on your experience.');
      return;
    }

    onSubmit({
      bookingId: booking.bookingId,
      businessId: booking.businessId,
      score,
      reviewText: reviewText.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Rate & Review Your Experience</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {booking.item} • {booking.businessName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Overall Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setScore(star)}
                  onMouseEnter={() => setHoverScore(star)}
                  onMouseLeave={() => setHoverScore(0)}
                  className="p-1 text-amber-400 transition hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverScore || score) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm font-semibold text-slate-700">
                {hoverScore || score} out of 5
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Review / Feedback
            </label>
            <textarea
              rows={4}
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
                if (error) setError('');
              }}
              placeholder="How was the food freshness, packaging, and pickup experience?"
              className="w-full text-sm rounded-xl border border-slate-300 px-3.5 py-2.5 focus:border-forest-600 focus:ring-1 focus:ring-forest-600 outline-none transition"
            />
            {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-forest-700 hover:bg-forest-800 shadow transition"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
