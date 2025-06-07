import type { PlayerStats } from '@context/types';
import { COLORS, COLORS_PER_ROW, GUESS_STATUS } from './common';
import { getItem, setItem } from '@services/storage';

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

export function getPlayerStateFromStorage(): PlayerStats {
  const raw = getItem('playerStats');
  if (!raw) {
    return {
      totalGames: 0,
      wins: 0,
      losses: 0,
      fastestSolve: 0,
      averageGuesses: 0,
      currentStreak: 0,
      maxStreak: 0,
    };
  }
  return JSON.parse(raw) as PlayerStats;
}

export function savePlayerStats(stats: PlayerStats) {
  setItem('playerStats', JSON.stringify(stats));
}

export function updateStats(stats: PlayerStats, guesses: number, won: boolean): PlayerStats {
  const updated = { ...stats };
  updated.totalGames++;
  if (won) {
    updated.wins++;
    updated.fastestSolve = Math.min(updated.fastestSolve || guesses, guesses);
    updated.currentStreak++;
    updated.maxStreak = Math.max(updated.currentStreak, updated.maxStreak);
  } else {
    updated.losses++;
    updated.currentStreak = 0;
  }
  updated.averageGuesses = Math.round((stats.averageGuesses * stats.totalGames + guesses) / updated.totalGames);
  savePlayerStats(updated);
  return updated;
}
