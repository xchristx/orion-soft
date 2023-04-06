import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// hooks

// pages
import LoginPage from '../pages/auth/LoginPage';
// components
import LoadingScreen from '../components/LoadingScreen';
import { useSelector } from 'react-redux';
import Register from '../pages/auth/Register';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isLoading } = useSelector(s => s.authSlice);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (isAuthenticated && pathname === '/') navigate('/dashboard/usuario');
  }, [isAuthenticated]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    if (pathname === '/register') return <Register />;
    return <LoginPage />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
