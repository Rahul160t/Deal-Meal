import React from 'react';
import { BadgeCheck } from 'lucide-react';

export const VerifiedBadge = ({ size = 'sm', showText = true }) => {
  return (
    <span
      title="Verified Partner (Prototype Demonstration Badge)"
      className={`inline-flex items-center gap-1 font-semibold rounded-full bg-emerald-50 text-forest-700 border border-emerald-200/80 ${
        size === 'sm' ? 'text-[11px] px-1.5 py-0.5' : 'text-xs px-2 py-1'
      }`}
    >
      <BadgeCheck className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-forest-600 fill-forest-100`} />
      {showText && <span>Verified Partner</span>}
    </span>
  );
};
