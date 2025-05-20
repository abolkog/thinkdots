import type { AppState } from '../src/context/types';

export const mockState: AppState = {
  secret: ['red', 'blue', 'green', 'yellow'],
  colorPalette: ['red', 'blue', 'green', 'yellow'],
  guesses: [],
  feedback: [],
  guessNumber: 1,
  isValidGuess: false,
  isGameOver: false,
};
