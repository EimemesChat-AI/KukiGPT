
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';

export async function sendMessage(message: string, model: string) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, model }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Request failed');
  }
  return res.json();
}