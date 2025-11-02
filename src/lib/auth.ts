export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  accessToken?: string;
  refreshToken?: string;
  token?: string; // Keep for backward compatibility
}

export interface AuthError {
  error: string;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get('content-type');

    // Check if response is JSON
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text.substring(0, 200));
      throw new Error('Server error: Expected JSON response but received HTML. Please check if the API is running correctly.');
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Login failed');
    }

    return result;
  } catch (error: any) {
    // If it's a network error or parsing error
    if (error.message.includes('JSON')) {
      throw new Error('Server configuration error. Please contact support.');
    }
    throw error;
  }
};

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get('content-type');

    // Check if response is JSON
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text.substring(0, 200));
      throw new Error('Server error: Expected JSON response but received HTML. Please check if the API is running correctly.');
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Signup failed');
    }

    return result;
  } catch (error: any) {
    if (error.message.includes('JSON')) {
      throw new Error('Server configuration error. Please contact support.');
    }
    throw error;
  }
};

export const requestPasswordReset = async (email: string): Promise<{ message: string }> => {
  const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, action: 'request' }),
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Password reset request failed');
  }

  return result;
};

export const resetPassword = async (token: string, newPassword: string): Promise<{ message: string }> => {
  const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, newPassword, action: 'reset' }),
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Password reset failed');
  }

  return result;
};

export const refreshTokens = async (refreshToken: string): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Token refresh failed');
  }

  return result;
};

export const logout = async (refreshToken?: string): Promise<void> => {
  if (refreshToken) {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      console.error('Logout API error:', error);
    }
  }

  // Clear local storage
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('userToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
  localStorage.removeItem('tokenExpiry');
  localStorage.removeItem('lastActivity');
};

// Auto-refresh token mechanism
export const setupAutoRefresh = () => {
  const checkAndRefreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    if (!refreshToken || !tokenExpiry) {
      await logout();
      window.location.href = '/login';
      return;
    }

    const expiryTime = new Date(tokenExpiry).getTime();
    const currentTime = new Date().getTime();
    const timeUntilExpiry = expiryTime - currentTime;

    // Refresh if token expires within 5 minutes
    if (timeUntilExpiry < 5 * 60 * 1000) {
      try {
        const result = await refreshTokens(refreshToken);
        
        // Update stored tokens
        localStorage.setItem('userToken', result.accessToken || '');
        localStorage.setItem('refreshToken', result.refreshToken || '');
        localStorage.setItem('tokenExpiry', new Date(Date.now() + 15 * 60 * 1000).toISOString()); // 15 minutes from now
        
        console.log('Tokens refreshed successfully');
      } catch (error) {
        console.error('Failed to refresh tokens:', error);
        await logout();
        window.location.href = '/login';
      }
    }
  };

  // Check immediately
  checkAndRefreshToken();

  // Set up periodic checks every 5 minutes
  return setInterval(checkAndRefreshToken, 5 * 60 * 1000);
};

// Activity tracking
export const trackUserActivity = () => {
  let activityTimer: NodeJS.Timeout;

  const resetActivityTimer = () => {
    clearTimeout(activityTimer);
    
    // Update last activity timestamp
    localStorage.setItem('lastActivity', new Date().toISOString());
    
    // Set 4-hour inactivity timeout
    activityTimer = setTimeout(async () => {
      console.log('User inactive for 4 hours, logging out...');
      await logout(localStorage.getItem('refreshToken') || '');
      window.location.href = '/login';
    }, 4 * 60 * 60 * 1000); // 4 hours
  };

  // Track user activity events
  const activities = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
  
  activities.forEach(activity => {
    document.addEventListener(activity, resetActivityTimer, true);
  });

  // Initial setup
  resetActivityTimer();

  return () => {
    clearTimeout(activityTimer);
    activities.forEach(activity => {
      document.removeEventListener(activity, resetActivityTimer, true);
    });
  };
};