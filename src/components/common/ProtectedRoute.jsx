import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const ProtectedRoute = ({ allowedRole, children }) => {
  const { currentUser, showToast } = useApp();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (currentUser.role !== allowedRole) {
    // If a customer tries to access business or charity routes
    if (currentUser.role === 'consumer') {
      showToast(
        'Access Restricted: Customer accounts cannot access Business or Charity portals. Please log in as a partner.',
        'error'
      );
      return <Navigate to="/consumer/dashboard" replace />;
    }

    if (currentUser.role === 'business') {
      return <Navigate to="/business/dashboard" replace />;
    }

    if (currentUser.role === 'charity') {
      return <Navigate to="/charity/dashboard" replace />;
    }
  }

  return children;
};
