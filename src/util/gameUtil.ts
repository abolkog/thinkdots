import { COLORS, COLORS_PER_ROW, GUESS_STATUS } from './common';

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

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
