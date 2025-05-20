import type { AppState } from '../src/context/types';

export const mockState: AppState = {
  secret: ['red', 'indigo', 'green', 'yellow'],
  colorPalette: ['red', 'indigo', 'green', 'yellow'],
  guesses: [],
  feedback: [],
  guessNumber: 1,
  isValidGuess: false,
  isGameOver: false,
};
