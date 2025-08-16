import { NextApiResponse } from 'next';

interface RateLimitOptions {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max unique tokens per interval
}

interface RateLimitData {
  count: number;
  resetTime: number;
}

// Simple in-memory store for rate limiting
const tokens = new Map<string, RateLimitData>();

export default function rateLimit(options: RateLimitOptions) {
  return {
    check: async (res: NextApiResponse, limit: number, token: string) => {
      const now = Date.now();
      const key = `${token}`;
      
      // Clean up expired entries
      for (const [k, v] of tokens.entries()) {
        if (now > v.resetTime) {
          tokens.delete(k);
        }
      }
      
      const tokenData = tokens.get(key);
      
      if (!tokenData) {
        // First request from this token
        tokens.set(key, {
          count: 1,
          resetTime: now + options.interval
        });
        return;
      }
      
      if (now > tokenData.resetTime) {
        // Reset the counter
        tokens.set(key, {
          count: 1,
          resetTime: now + options.interval
        });
        return;
      }
      
      if (tokenData.count >= limit) {
        // Rate limit exceeded
        const timeToReset = Math.ceil((tokenData.resetTime - now) / 1000);
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', 0);
        res.setHeader('X-RateLimit-Reset', timeToReset);
        
        throw new Error('Rate limit exceeded');
      }
      
      // Increment the counter
      tokenData.count++;
      tokens.set(key, tokenData);
      
      // Set headers
      res.setHeader('X-RateLimit-Limit', limit);
      res.setHeader('X-RateLimit-Remaining', limit - tokenData.count);
      res.setHeader('X-RateLimit-Reset', Math.ceil((tokenData.resetTime - now) / 1000));
    }
  };
}