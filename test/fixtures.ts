import type { AppState } from '../src/context/types';

export const mockState: AppState = {
  secret: ['red', 'indigo', 'green', 'yellow'],
  colorPalette: ['red', 'indigo', 'green', 'yellow'],
  guesses: [],
  feedback: {
    0: [1, 1, -1, 0],
  },
  guessNumber: 1,
  isValidGuess: false,
  isVictory: false,
  isEasyMode: true,
  sidePanelOpen: false,
  startTime: 0,
  playerState: {
    totalGames: 0,
    wins: 0,
    losses: 0,
    fastestSolve: 0,
    fewestGuesses: 0,
    currentStreak: 0,
    maxStreak: 0,
    lastPlayed: 0,
  },
};
