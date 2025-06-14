import type { AppState, PlayerStats } from '@context/types';
import { ACHIEVEMENTS, COLORS, COLORS_PER_ROW, GUESS_STATUS } from './common';
import { getItem, setItem } from '@services/storage';

const initialPlayerState: PlayerStats = {
  totalGames: 0,
  wins: 0,
  losses: 0,
  fastestSolve: 0,
  fewestGuesses: 0,
  currentStreak: 0,
  maxStreak: 0,
  lastPlayed: Date.now(),
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

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function getPlayerStateFromStorage(): PlayerStats {
  const raw = getItem('playerStats');
  if (!raw) {
    return initialPlayerState;
  }
  return JSON.parse(raw) as PlayerStats;
}

export function savePlayerStats(stats: PlayerStats) {
  setItem('playerStats', JSON.stringify(stats));
}

export function resetPlayerStats(): PlayerStats {
  setItem('playerStats', JSON.stringify(initialPlayerState));
  return initialPlayerState;
}

export function updateStats(appSate: AppState): PlayerStats {
  const { playerState, guessNumber: guesses, isVictory: won, startTime } = appSate;
  const elapsedTimeInSeconds = Math.floor((Date.now() - startTime) / 1000);

  const updated = { ...playerState };
  updated.totalGames++;
  if (won) {
    updated.wins++;
    updated.fewestGuesses = Math.min(updated.fewestGuesses || guesses, guesses);
    updated.fastestSolve =
      updated.fastestSolve === 0 ? elapsedTimeInSeconds : Math.min(updated.fastestSolve, elapsedTimeInSeconds);
    updated.currentStreak++;
    updated.maxStreak = Math.max(updated.currentStreak, updated.maxStreak);
  } else {
    updated.losses++;
    updated.currentStreak = 0;
  }
  updated.lastPlayed = Date.now();

  savePlayerStats(updated);
  return updated;
}

export function getUnlockedAchievements(playerState: PlayerStats) {
  const unlocked = ACHIEVEMENTS.filter((achievement) => achievement.conditions(playerState));
  const remaining = ACHIEVEMENTS.filter((achievement) => !achievement.conditions(playerState));
  return { unlocked, remaining };
}

export function validateCode(value: string): { isValid: boolean; code: string[] } {
  const code = value.split(',').map((color) => color.trim());

  const uniqueColors = new Set(code);

  if (uniqueColors.size !== COLORS_PER_ROW) return { isValid: false, code: [] };

  const isValid = code.every((color) => COLORS.includes(color));

  return { isValid, code: isValid ? code : [] };
}
