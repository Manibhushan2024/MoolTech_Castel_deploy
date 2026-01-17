// Simple in-memory rate limiter (use Redis in production)

interface RateLimitStore {
  [ip: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};
const REQUESTS = parseInt(process.env.RATE_LIMIT_REQUESTS || "5");
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "3600000"); // 1 hour

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = store[ip];

  if (!record || now > record.resetTime) {
    store[ip] = { count: 1, resetTime: now + WINDOW_MS };
    return true;
  }

  if (record.count >= REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

export function getRateLimitInfo(ip: string) {
  const record = store[ip];
  if (!record)
    return { remaining: REQUESTS, resetTime: Date.now() + WINDOW_MS };

  return {
    remaining: Math.max(0, REQUESTS - record.count),
    resetTime: record.resetTime,
  };
}
