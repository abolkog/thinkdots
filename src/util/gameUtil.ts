import { COLORS_PER_ROW, GUESS_STATUS } from './common';

export const COLORS = ['red', 'indigo', 'green', 'yellow', 'purple', 'cyan'];

export const colorClasses: Record<string, string> = {
  red: 'bg-red-500 ring-red-400',
  indigo: 'bg-indigo-500 ring-indigo-400',
  green: 'bg-green-500 ring-green-400',
  yellow: 'bg-yellow-500 ring-yellow-400',
  purple: 'bg-purple-500 ring-purple-400',
  cyan: 'bg-cyan-500 ring-cyan-400',
};

function generateSecretCode() {
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, COLORS_PER_ROW);
}

export function initSecretCodeAndColorPalette() {
  const secret = generateSecretCode();
  const colorPalette = [...secret].sort(() => Math.random() - 0.5);
  return { secret, colorPalette };
}

export function getGuessStatus(guess: string, secret: string[], idx: number) {
  if (secret[idx] === guess) return GUESS_STATUS.CORRECT;
  if (secret.includes(guess)) return GUESS_STATUS.PRESENT;
  return GUESS_STATUS.ABSENT;
}
