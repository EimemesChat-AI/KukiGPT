import React, { useState, FormEvent } from 'react';
import ModelSelector from './ModelSelector';
import { Model } from '@/types';

interface Props {
  onSend: (message: string, model: Model) => void;
  disabled?: boolean;
}

export default function InputBar({ onSend, disabled }: Props) {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<Model>('gemini');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim(), model);
      setInput('');
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit} className="input-wrapper">
        <ModelSelector selected={model} onSelect={setModel} />
        <input
          type="text"
          placeholder="Message EimemesChat AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
        />
        <button type="submit" className="send-button" disabled={disabled}>
          ↑
        </button>
      </form>
      <div className="home-bar"></div>
    </div>
  );
}
