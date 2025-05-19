import { COLORS_PER_ROW } from '../util/common';
import type { AppAction, AppState } from './types';

export const AppActions = {
  SET_GUESS: 'SET_GUESS',
  VALIDATE_GUESS: 'VALIDATE_GUESS',
};

export default function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case AppActions.SET_GUESS: {
      const { position, color } = action.payload as {
        position: number;
        color: string;
      };
      const newGuesses = [...state.guesses];
      newGuesses[position] = color;
      const isValidGuess =
        newGuesses.every(guess => guess !== '') &&
        new Set(newGuesses).size === COLORS_PER_ROW;

      return {
        ...state,
        guesses: newGuesses,
        isValidGuess,
      };
    }
    case AppActions.VALIDATE_GUESS: {
      const { guesses, secret } = state;
      console.log('Validating guess:', guesses);
      console.log('Secret code:', secret);
      const isCorrect = guesses.every((val, idx) => val === secret[idx]);
      console.log('Is correct:', isCorrect);
      return {
        ...state,
        guessNumber: state.guessNumber + 1,
        isValidGuess: false,
      };
    }
    default:
      return state;
  }
}
