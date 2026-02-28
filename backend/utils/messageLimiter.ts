interface LimitRecord {
  gemini: number;
  groq: number;
  resetTime: number;
}

const store = new Map<string, LimitRecord>();
const LIMITS = { gemini: 30, groq: 20 };
const WINDOW_MS = 24 * 60 * 60 * 1000;

function getResetTime(): number {
  return Date.now() + WINDOW_MS;
}

export function checkLimit(ip: string, model: 'gemini' | 'groq'): {
  allowed: boolean;
  remaining: number;
  limit: number;
} {
  const now = Date.now();
  let record = store.get(ip);

  if (!record || now > record.resetTime) {
    record = { gemini: 0, groq: 0, resetTime: getResetTime() };
    store.set(ip, record);
  }

  const used = record[model];
  const limit = LIMITS[model];
  const remaining = Math.max(0, limit - used);

  return {
    allowed: used < limit,
    remaining,
    limit,
  };
}

export function incrementCount(ip: string, model: 'gemini' | 'groq'): void {
  const record = store.get(ip);
  if (record) {
    record[model] += 1;
  }
}
