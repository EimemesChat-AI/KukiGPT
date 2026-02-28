import React from 'react';
import { Message } from '@/types';

export default function MessageUser({ message }: { message: Message }) {
  const time = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return (
    <div className="message user">
      <div className="message-avatar">ME</div>
      <div>
        <div className="bubble">
          {message.content}
          <div className="bubble-time">{time}</div>
        </div>
      </div>
    </div>
  );
}
