import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setupAutoRefresh, trackUserActivity } from '@/lib/auth';

const AuthManager = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    
    if (!isLoggedIn) {
      return;
    }

    // Set up automatic token refresh
    const refreshInterval = setupAutoRefresh();

    // Set up user activity tracking
    const cleanupActivityTracking = trackUserActivity();

    // Cleanup on unmount
    return () => {
      clearInterval(refreshInterval);
      cleanupActivityTracking();
    };
  }, [router]);

  return null; // This component doesn't render anything
};

export default AuthManager;