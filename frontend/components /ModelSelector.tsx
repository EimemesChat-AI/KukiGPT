import React, { useState } from 'react';
import { Model } from '@/types';

interface Props {
  selected: Model;
  onSelect: (model: Model) => void;
}

export default function ModelSelector({ selected, onSelect }: Props) {
  const [open, setOpen] = useState(false);

  const models: { value: Model; label: string }[] = [
    { value: 'gemini', label: 'Gemini' },
    { value: 'groq', label: 'Groq' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <div className="model-selector-button" onClick={() => setOpen(!open)}>
        <span>{selected === 'gemini' ? 'Gemini' : 'Groq'}</span>
        <span className="chevron">▼</span>
      </div>
      {open && (
        <div className="model-dropdown">
          {models.map((model) => (
            <div
              key={model.value}
              className={`model-dropdown-item ${selected === model.value ? 'selected' : ''}`}
              onClick={() => {
                onSelect(model.value);
                setOpen(false);
              }}
            >
              {model.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}