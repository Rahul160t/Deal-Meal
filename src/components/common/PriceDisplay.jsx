import React from 'react';
import { formatCurrency, calculateDiscount } from '../../utils/formatters';

export const PriceDisplay = ({
  originalPrice,
  surplusPrice,
  size = 'md',
  isCharity = false,
  showDiscountTag = true,
}) => {
  if (isCharity) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded text-sm uppercase tracking-wide">
          ₹0 • Free Claim
        </span>
        <span className="text-xs text-slate-400 line-through">
          Worth {formatCurrency(originalPrice)}
        </span>
      </div>
    );
  }

  const discount = calculateDiscount(originalPrice, surplusPrice);

  const priceClasses =
    size === 'lg'
      ? 'text-2xl font-extrabold text-forest-800'
      : size === 'sm'
      ? 'text-base font-bold text-forest-800'
      : 'text-xl font-bold text-forest-800';

  const origClasses =
    size === 'lg'
      ? 'text-sm text-slate-400 line-through'
      : 'text-xs text-slate-400 line-through';

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={priceClasses}>{formatCurrency(surplusPrice)}</span>
      {originalPrice > surplusPrice && (
        <span className={origClasses}>{formatCurrency(originalPrice)}</span>
      )}
      {showDiscountTag && discount > 0 && (
        <span className="text-[11px] font-bold bg-limebrand-100 text-limebrand-800 border border-limebrand-300 px-1.5 py-0.5 rounded-full">
          {discount}% OFF
        </span>
      )}
    </div>
  );
};
