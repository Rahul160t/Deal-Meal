import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorScheme = 'forest', // 'forest', 'amber', 'purple', 'blue'
}) => {
  const colorMap = {
    forest: {
      bg: 'bg-emerald-50 text-emerald-700',
      badge: 'bg-emerald-100 text-emerald-800',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-700',
      badge: 'bg-amber-100 text-amber-800',
    },
    purple: {
      bg: 'bg-purple-50 text-purple-700',
      badge: 'bg-purple-100 text-purple-800',
    },
    blue: {
      bg: 'bg-blue-50 text-blue-700',
      badge: 'bg-blue-100 text-blue-800',
    },
  };

  const scheme = colorMap[colorScheme] || colorMap.forest;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl ${scheme.bg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {value}
        </span>
        {trend && (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${scheme.badge}`}>
            {trend}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-1.5 text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
};
