import React from 'react';
import { Menu, Compass, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NotificationPanel } from '../common/NotificationPanel';
import { useApp } from '../../context/AppContext';

export const DashboardHeader = ({
  title,
  subtitle,
  actions,
  onOpenMobileSidebar,
}) => {
  const { currentUser } = useApp();

  return (
    <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title & mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {title}
            </h1>
            {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {/* Right side actions & notifications */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Link
            to="/explore"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <Compass className="w-3.5 h-3.5 text-forest-700" /> Explore Food
          </Link>

          <NotificationPanel />

          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>
    </header>
  );
};
