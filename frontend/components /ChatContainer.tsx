'use client';

import React, { useState } from 'react';
import MessageList from './MessageList';
import InputBar from './InputBar';
import { Message, Model } from '@/types';
import { sendMessage } from '@/utils/api';

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: "Hello! I'm EimemesChat AI. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const handleSend = async (text: string, model: Model) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);
    setLimitReached(false);

    try {
      const data = await sendMessage(text, model);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      if (err.message.includes('429') || err.message.includes('limit')) {
        setLimitReached(true);
        const limitMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: '⚠️ Daily message limit reached. Please try again tomorrow.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, limitMsg]);
      } else {
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: 'Sorry, something went wrong. Please try again.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } finally {
      setTyping(false);
    }
  };

  const handleChipClick = (text: string) => {
    handleSend(text, 'gemini');
  };

  return (
    <>
      <MessageList messages={messages} typing={typing} onChipClick={handleChipClick} />
      <InputBar onSend={handleSend} disabled={limitReached} />
    </>
  );
}
