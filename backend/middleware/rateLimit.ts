import { Request, Response, NextFunction } from 'express';
import { checkLimit } from '../utils/messageLimiter';

export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const { model } = req.body;

  if (!model || (model !== 'gemini' && model !== 'groq')) {
    return res.status(400).json({ error: 'Invalid or missing model' });
  }

  const { allowed, remaining, limit } = checkLimit(ip, model);

  if (!allowed) {
    return res.status(429).json({
      error: 'Daily message limit reached',
      remaining: 0,
      limit,
    });
  }

  (req as any).clientIp = ip;
  (req as any).model = model;
  (req as any).remaining = remaining;
  next();
}
