import React from 'react';
import { PackageOpen, Sparkles } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = PackageOpen,
  title = 'No items found',
  description = 'Try adjusting your filters or check back shortly for fresh surplus listings.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="text-center py-12 px-4 rounded-2xl bg-white border border-dashed border-slate-200">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-forest-50 text-forest-700 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-forest-700 hover:bg-forest-800 text-white shadow-sm transition"
        >
          <Sparkles className="w-4 h-4" /> {actionLabel}
        </button>
      )}
    </div>
  );
};
