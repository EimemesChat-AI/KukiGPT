
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EimemesChat AI',
  description: 'Chat with Gemini and Groq',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}