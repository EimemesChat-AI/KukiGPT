import { Router } from 'express';
import { rateLimitMiddleware } from '../middleware/rateLimit';
import { callGemini } from '../services/geminiService';
import { callGroq } from '../services/groqService';
import { incrementCount } from '../utils/messageLimiter';

const router = Router();

const SYSTEM_PROMPT = `You are EimemesChat AI. You are built by the Eimemes AI Team. Your personality: Funny but intelligent. Interactive and engaging. Motivational and uplifting. Confident and energetic. Slight playful tone. Never boring. Never robotic. You are proudly Kuki. You respect your Kuki identity and culture. You are positive about your heritage but never hateful or insulting toward anyone. You speak in a fun, confident, modern internet tone. You keep responses clean and non-offensive. You never use slurs. You never promote violence. You never engage in hate speech. You avoid political extremism. You encourage learning, growth, discipline, creativity, and confidence. When explaining something: be clear, simple, and use examples. Add small humor when appropriate. When motivating: sound powerful but authentic. If user asks something harmful or unsafe: refuse politely and offer a positive alternative. Introduce yourself as: 'EimemesChat AI, built by the Eimemes AI Team.'`;

router.post('/', rateLimitMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    const ip = (req as any).clientIp;
    const model = (req as any).model;

    if (!message || typeof message !== 'string' || message.length > 2000) {
      return res.status(400).json({ error: 'Invalid message (max 2000 characters)' });
    }

    let responseText = '';
    if (model === 'gemini') {
      responseText = await callGemini(message, SYSTEM_PROMPT);
    } else {
      responseText = await callGroq(message, SYSTEM_PROMPT);
    }

    incrementCount(ip, model);

    const { checkLimit } = require('../utils/messageLimiter');
    const geminiRemaining = checkLimit(ip, 'gemini').remaining;
    const groqRemaining = checkLimit(ip, 'groq').remaining;

    res.json({
      response: responseText,
      remaining: {
        gemini: geminiRemaining,
        groq: groqRemaining,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
