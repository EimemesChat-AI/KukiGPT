import React, { useEffect, useRef } from 'react';
import { Message } from '@/types';
import MessageUser from './MessageUser';
import MessageAI from './MessageAI';
import TypingIndicator from './TypingIndicator';
import WelcomeSection from './WelcomeSection';

interface Props {
  messages: Message[];
  typing: boolean;
  onChipClick: (text: string) => void;
}

export default function MessageList({ messages, typing, onChipClick }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  return (
    <div className="messages-area">
      <WelcomeSection onChipClick={onChipClick} />
      {messages.map((msg) =>
        msg.sender === 'user' ? (
          <MessageUser key={msg.id} message={msg} />
        ) : (
          <MessageAI key={msg.id} message={msg} />
        )
      )}
      {typing && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
