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
  isGameOver: false,
  isEasyMode: true,
  sidePanelOpen: false,
  playerState: {
    totalGames: 0,
    wins: 0,
    losses: 0,
    fastestSolve: 0,
    averageGuesses: 0,
    currentStreak: 0,
    maxStreak: 0,
  },
};
