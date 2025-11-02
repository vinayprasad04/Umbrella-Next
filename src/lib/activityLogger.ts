/**
 * Utility function to log user activities
 * This can be used throughout the application to track user actions
 */

export type ActivityType =
  | 'login'
  | 'logout'
  | 'profile_update'
  | 'calculator_usage'
  | 'goal_creation'
  | 'dashboard_access'
  | 'signup'
  | 'password_reset'
  | 'other';

interface LogActivityParams {
  userId: string;
  userEmail: string;
  activityType: ActivityType;
  description: string;
  metadata?: {
    calculatorType?: string;
    goalType?: string;
    fieldsUpdated?: string[];
    ipAddress?: string;
    userAgent?: string;
    [key: string]: any;
  };
}

/**
 * Logs a user activity to the database
 * @param params Activity parameters
 * @returns Promise with the result
 */
export async function logActivity(params: LogActivityParams): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/user/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Failed to log activity:', data.message);
      return { success: false, error: data.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error logging activity:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetches user activities from the database
 * @param userId User ID
 * @param userEmail User email
 * @param limit Number of activities to fetch (default: 20)
 * @returns Promise with the activities
 */
export async function fetchActivities(
  userId?: string,
  userEmail?: string,
  limit: number = 20
): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (userEmail) params.append('userEmail', userEmail);
    params.append('limit', limit.toString());

    const response = await fetch(`/api/user/activities?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      console.error('Failed to fetch activities:', data.message);
      return { success: false, error: data.message };
    }

    return { success: true, data: data.data };
  } catch (error: any) {
    console.error('Error fetching activities:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Formats a timestamp into a relative time string (e.g., "2 hours ago", "1 day ago")
 * @param timestamp ISO timestamp or Date object
 * @returns Relative time string
 */
export function formatRelativeTime(timestamp: string | Date): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  } else {
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  }
}

/**
 * Gets the appropriate icon for an activity type
 * @param activityType Activity type
 * @returns Icon name/identifier
 */
export function getActivityIcon(activityType: ActivityType): string {
  const icons: Record<ActivityType, string> = {
    login: 'login',
    logout: 'logout',
    profile_update: 'edit',
    calculator_usage: 'calculator',
    goal_creation: 'target',
    dashboard_access: 'dashboard',
    signup: 'user-plus',
    password_reset: 'key',
    other: 'info',
  };

  return icons[activityType] || 'info';
}
