/**
 * 🚦 Rate Limiter (Memory-based)
 * Note: For production on Vercel, use @upstash/ratelimit or Vercel KV.
 */
const tracker: Record<string, { count: number; expires: number }> = {};

export async function rateLimit(identifier: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now();
  const entry = tracker[identifier];

  if (!entry || now > entry.expires) {
    tracker[identifier] = { count: 1, expires: now + windowMs };
    return { success: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 };
  }

  entry.count += 1;
  return { success: true, remaining: limit - entry.count };
}
