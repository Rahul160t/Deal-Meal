import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Check, ExternalLink, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotificationPanel = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, currentUser } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const navigate = useNavigate();

  // Filter notifications relevant to current user or broadcast
  const userNotifications = notifications.filter(
    (n) => !n.userId || n.userId === currentUser?.uid || n.userId === 'user_consumer_1'
  );

  const unreadCount = userNotifications.filter((n) => !n.read).length;

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.notificationId);
    if (notif.link) {
      navigate(notif.link);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
        className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 text-sm">Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-forest-700 hover:text-forest-800 font-medium flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {userNotifications.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm">
                No notifications right now.
              </div>
            ) : (
              userNotifications.map((n) => (
                <div
                  key={n.notificationId}
                  onClick={() => handleNotificationClick(n)}
                  className={`p-3.5 hover:bg-slate-50 transition cursor-pointer flex gap-3 ${
                    !n.read ? 'bg-emerald-50/40' : ''
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <span
                      className={`w-2 h-2 rounded-full inline-block ${
                        !n.read ? 'bg-forest-600' : 'bg-transparent'
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                    {n.link && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-forest-700 mt-1.5 hover:underline">
                        View Details <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              Mock Notifications • Saved in browser LocalStorage
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
