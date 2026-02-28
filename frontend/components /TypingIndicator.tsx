import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="ai-container">
      <div className="message-avatar">AI</div>
      <div className="typing-indicator">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </div>
  );
}
