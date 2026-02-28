import React from 'react';
import { Message } from '@/types';

export default function MessageAI({ message }: { message: Message }) {
  const time = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <div className="ai-container">
      <div className="message-avatar">AI</div>
      <div className="ai-message">
        {message.content}
        <div className="message-time">{time}</div>
      </div>
    </div>
  );
}
