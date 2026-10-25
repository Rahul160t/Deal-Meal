import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USERS,
  INITIAL_LISTINGS,
  INITIAL_BOOKINGS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';
import { generateId, generatePickupCode } from '../utils/formatters';

const AppContext = createContext();

const STORAGE_KEYS = {
  USER: 'dealmeal_current_user',
  ALL_USERS: 'dealmeal_all_users',
  LISTINGS: 'dealmeal_listings',
  BOOKINGS: 'dealmeal_bookings',
  REVIEWS: 'dealmeal_reviews',
  NOTIFICATIONS: 'dealmeal_notifications',
};

export const AppProvider = ({ children }) => {
  // Initialize user (defaults to consumer demo user so all public & dashboard links work immediately)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_USERS[0]; // Aarav Sharma (Consumer)
  });

  // Users registry
  const [allUsers, setAllUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_USERS;
  });

  // Listings state
  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LISTINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_LISTINGS;
  });

  // Bookings state
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_BOOKINGS;
  });

  // Reviews state
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REVIEWS;
  });

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Toast alert state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Auth functions
  const loginAsRole = (role) => {
    const user = allUsers.find((u) => u.role === role) || INITIAL_USERS.find((u) => u.role === role);
    if (user) {
      setCurrentUser(user);
      showToast(`Switched active profile to ${user.name} (${role.toUpperCase()})`, 'info');
      return user;
    }
    return null;
  };

  const loginCustom = (email, password) => {
    // Demo login logic: find user by email or fallback to matched role
    const found = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      showToast(`Welcome back, ${found.name}!`, 'success');
      return { success: true, user: found };
    }
    // Generic fallback mock user
    const mockUser = {
      uid: generateId('user'),
      name: email.split('@')[0],
      email,
      role: 'consumer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      location: 'Koregaon Park, Pune',
      phone: '+91 98980 00000',
      verified: true,
      savedMoney: 0,
      mealsRescued: 0,
    };
    setCurrentUser(mockUser);
    setAllUsers((prev) => [mockUser, ...prev]);
    showToast(`Welcome, ${mockUser.name}!`, 'success');
    return { success: true, user: mockUser };
  };

  const signup = (formData) => {
    const newUser = {
      uid: generateId('user'),
      name: formData.name || formData.businessName || formData.organizationName || 'New User',
      email: formData.email,
      role: formData.role, // 'business', 'consumer', 'charity'
      businessName: formData.businessName || '',
      organizationName: formData.organizationName || '',
      businessType: formData.businessType || '',
      registrationNumber: formData.registrationNumber || '',
      avatar:
        formData.role === 'business'
          ? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80'
          : formData.role === 'charity'
          ? 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=150&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      location: formData.location || 'Pune',
      address: formData.address || 'Pune, Maharashtra',
      phone: formData.phone || '+91 98000 00000',
      verified: true,
      averageRating: 5.0,
      reviewCount: 0,
      savedMoney: 0,
      mealsRescued: 0,
      mealsDistributed: 0,
    };

    setAllUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    showToast(`Account created successfully! Welcome to Deal Meal.`, 'success');
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out of demo session.', 'info');
  };

  // Listings CRUD
  const addListing = (listingData) => {
    const newListing = {
      ...listingData,
      listingId: generateId('list'),
      businessId: currentUser?.uid || 'user_business_1',
      businessName: currentUser?.businessName || currentUser?.name || 'Local Partner',
      businessAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&q=80',
      verified: currentUser?.verified ?? true,
      rating: currentUser?.averageRating || 4.8,
      reviewCount: currentUser?.reviewCount || 1,
      status: 'active',
      createdAt: new Date().toISOString(),
      distanceKm: (Math.random() * 4 + 1).toFixed(1),
    };

    setListings((prev) => [newListing, ...prev]);

    // Add business notification
    addNotification({
      userId: currentUser?.uid || 'user_business_1',
      type: 'listing_created',
      title: 'New Surplus Listing Published',
      message: `"${newListing.item}" (${newListing.quantity} portions) is now live on Deal Meal explore.`,
      link: '/business/listings',
    });

    showToast(`Listing "${newListing.item}" published successfully!`, 'success');
    return newListing;
  };

  const updateListing = (listingId, updatedFields) => {
    setListings((prev) =>
      prev.map((item) => (item.listingId === listingId ? { ...item, ...updatedFields } : item))
    );
    showToast('Listing updated successfully.', 'success');
  };

  const deleteListing = (listingId) => {
    const target = listings.find((l) => l.listingId === listingId);
    setListings((prev) => prev.filter((item) => item.listingId !== listingId));
    showToast(`Listing "${target?.item || ''}" removed.`, 'info');
  };

  const toggleListingStatus = (listingId) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.listingId === listingId) {
          const nextStatus = item.status === 'active' ? 'paused' : 'active';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
    showToast('Listing visibility status updated.', 'info');
  };

  // Booking / Reservation / Charity Claim
  const reserveOrClaimFood = ({ listingId, quantity, isCharityClaim = false, notes = '' }) => {
    if (currentUser?.role === 'business') {
      showToast('Business accounts cannot reserve surplus food. Businesses are food providers.', 'error');
      return { success: false, error: 'Businesses cannot reserve food' };
    }

    const targetListing = listings.find((l) => l.listingId === listingId);

    if (!targetListing) {
      showToast('Food item listing not found.', 'error');
      return { success: false, error: 'Listing not found' };
    }

    if (targetListing.quantity < quantity) {
      showToast(`Only ${targetListing.quantity} portions available.`, 'error');
      return { success: false, error: 'Insufficient quantity' };
    }

    const pricePerUnit = isCharityClaim ? 0 : targetListing.surplusPrice;
    const totalAmount = isCharityClaim ? 0 : pricePerUnit * quantity;
    const originalTotal = targetListing.originalPrice * quantity;
    const savings = originalTotal - totalAmount;

    const pickupCode = generatePickupCode(isCharityClaim ? 'CHARITY' : 'DM');

    const newBooking = {
      bookingId: isCharityClaim ? generateId('CLM') : generateId('BK'),
      listingId: targetListing.listingId,
      businessId: targetListing.businessId,
      businessName: targetListing.businessName,
      item: targetListing.item,
      consumerId: currentUser?.uid || 'guest_user',
      consumerName: currentUser?.name || 'Valued User',
      charityId: isCharityClaim ? currentUser?.uid : null,
      charityName: isCharityClaim ? (currentUser?.organizationName || currentUser?.name) : null,
      userRole: isCharityClaim ? 'charity' : 'consumer',
      quantity,
      pricePerUnit,
      totalAmount,
      originalTotal,
      savings,
      status: 'ready_for_pickup',
      pickupCode,
      pickupWindow: targetListing.pickupWindow,
      location: targetListing.location,
      address: targetListing.address,
      createdAt: new Date().toISOString(),
      image: targetListing.image,
      notes,
    };

    // Decrement inventory
    setListings((prev) =>
      prev.map((item) => {
        if (item.listingId === listingId) {
          const remaining = item.quantity - quantity;
          return {
            ...item,
            quantity: remaining,
            status: remaining <= 0 ? 'sold_out' : item.status,
          };
        }
        return item;
      })
    );

    // Save booking
    setBookings((prev) => [newBooking, ...prev]);

    // Send notification to consumer/charity
    addNotification({
      userId: currentUser?.uid || 'user_consumer_1',
      type: isCharityClaim ? 'claim_confirmed' : 'booking_confirmed',
      title: isCharityClaim ? 'Food Donation Claim Confirmed! 🎉' : 'Surplus Food Reserved! 🥗',
      message: `Pickup Code: ${pickupCode} for ${quantity}x "${targetListing.item}" at ${targetListing.businessName}.`,
      link: isCharityClaim ? '/charity/claims' : '/consumer/bookings',
    });

    // Send notification to business
    addNotification({
      userId: targetListing.businessId,
      type: 'new_reservation',
      title: isCharityClaim ? 'Charity Donation Claimed' : 'New Paid Reservation',
      message: `${isCharityClaim ? (currentUser?.name || 'Robin Hood Army') : (currentUser?.name || 'Consumer')} claimed ${quantity}x "${targetListing.item}". Code: ${pickupCode}.`,
      link: '/business/listings',
    });

    // Update user stats
    if (currentUser) {
      setCurrentUser((prev) => ({
        ...prev,
        savedMoney: (prev.savedMoney || 0) + savings,
        mealsRescued: (prev.mealsRescued || 0) + quantity,
        mealsDistributed: isCharityClaim ? (prev.mealsDistributed || 0) + quantity : (prev.mealsDistributed || 0),
      }));
    }

    showToast(
      isCharityClaim
        ? `Donation claimed free! Pickup code: ${pickupCode}`
        : `Reserved successfully! Total: ₹${totalAmount}. Pickup code: ${pickupCode}`,
      'success'
    );

    return { success: true, booking: newBooking };
  };

  // Mark booking as picked up (completed)
  const completeBookingPickup = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.bookingId === bookingId) {
          return {
            ...b,
            status: 'completed',
            completedAt: new Date().toISOString(),
          };
        }
        return b;
      })
    );

    addNotification({
      userId: currentUser?.uid || 'user_consumer_1',
      type: 'pickup_completed',
      title: 'Meal Rescued! ⭐',
      message: `Your pickup has been marked as completed. Thank you for preventing food waste!`,
      link: currentUser?.role === 'charity' ? '/charity/claims' : '/consumer/bookings',
    });

    showToast('Pickup marked as completed! Thank you for reducing food waste.', 'success');
  };

  // Cancel booking (only if ready_for_pickup) -> Restores quantity!
  const cancelBooking = (bookingId) => {
    const booking = bookings.find((b) => b.bookingId === bookingId);
    if (!booking) return;

    if (booking.status === 'completed') {
      showToast('Cannot cancel an already completed pickup.', 'error');
      return;
    }

    // Restore listing quantity
    setListings((prev) =>
      prev.map((l) => {
        if (l.listingId === booking.listingId) {
          const restored = l.quantity + booking.quantity;
          return {
            ...l,
            quantity: restored,
            status: l.status === 'sold_out' ? 'active' : l.status,
          };
        }
        return l;
      })
    );

    // Mark booking cancelled
    setBookings((prev) =>
      prev.map((b) => (b.bookingId === bookingId ? { ...b, status: 'cancelled' } : b))
    );

    addNotification({
      userId: booking.businessId,
      type: 'booking_cancelled',
      title: 'Booking Cancelled',
      message: `Booking ${booking.pickupCode} for ${booking.quantity}x "${booking.item}" was cancelled. Inventory restored.`,
      link: '/business/listings',
    });

    showToast('Booking cancelled. Inventory has been restored.', 'info');
  };

  // Reviews
  const submitReview = ({ bookingId, businessId, score, reviewText }) => {
    const newReview = {
      ratingId: generateId('rev'),
      bookingId,
      userId: currentUser?.uid || 'user_c',
      userName: currentUser?.name || 'Verified Food Saver',
      userAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      businessId,
      score: Number(score),
      date: 'Just now',
      reviewText,
    };

    setReviews((prev) => [newReview, ...prev]);

    // Mark booking as reviewed
    if (bookingId) {
      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === bookingId ? { ...b, hasReview: true, rating: score, reviewText } : b
        )
      );
    }

    showToast('Thank you for rating your food surplus experience!', 'success');
    return newReview;
  };

  // Notifications
  const addNotification = (notif) => {
    const newNotif = {
      notificationId: generateId('notif'),
      timestamp: 'Just now',
      read: false,
      ...notif,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.notificationId === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Reset demo data to initial defaults
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ALL_USERS);
    localStorage.removeItem(STORAGE_KEYS.LISTINGS);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);

    setCurrentUser(INITIAL_USERS[0]);
    setAllUsers(INITIAL_USERS);
    setListings(INITIAL_LISTINGS);
    setBookings(INITIAL_BOOKINGS);
    setReviews(INITIAL_REVIEWS);
    setNotifications(INITIAL_NOTIFICATIONS);

    showToast('Demo data successfully restored to fresh Pune sample state!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        listings,
        bookings,
        reviews,
        notifications,
        toast,
        showToast,
        loginAsRole,
        loginCustom,
        signup,
        logout,
        addListing,
        updateListing,
        deleteListing,
        toggleListingStatus,
        reserveOrClaimFood,
        completeBookingPickup,
        cancelBooking,
        submitReview,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
