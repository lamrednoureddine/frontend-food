import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector hook

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  // Access user data from the Redux store
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.isAdmin; // Replace this with the actual path to the admin flag in your Redux state
  console.log('User object:', user);
  if (!isAdmin) {
    // Redirect to the login page if not an admin
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
