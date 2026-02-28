
export interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface ApiResponse {
  response: string;
  remaining: {
    gemini: number;
    groq: number;
  };
}

export type Model = 'gemini' | 'groq';