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
  showPalette: false,
};
