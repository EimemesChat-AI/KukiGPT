import React from 'react';

interface Props {
  onChipClick: (text: string) => void;
}

const chips = [
  'Design an iOS app',
  'Explain quantum computing',
  'Write a poem',
  'Plan a trip',
  'Code a website',
];

export default function WelcomeSection({ onChipClick }: Props) {
  return (
    <div className="welcome-section">
      <div className="gradient-title">EimemesChat AI</div>
      <div className="recommendation-prompt">How can I help you today?</div>
      <div className="suggestion-chips">
        {chips.map((chip) => (
          <span key={chip} className="chip" onClick={() => onChipClick(chip)}>
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}