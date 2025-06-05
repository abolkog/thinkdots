import { COLORS_PER_ROW } from '@util/common';
import type { AppAction, AppState, ModalProps } from '@context/types';
import { initialState } from '@context/GameContext';
import { getGuessStatus, initSecretCodeAndColorPalette } from '@util/gameUtil';

export const AppActions = {
  SET_GUESS: 'SET_GUESS',
  VALIDATE_GUESS: 'VALIDATE_GUESS',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  RESET_GAME: 'RESET_GAME',
  SET_DIFFICULTY: 'SET_DIFFICULTY',
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
        newGuesses.every((guess) => guess) &&
        new Set(newGuesses).size === COLORS_PER_ROW;
      return {
        ...state,
        guesses: newGuesses,
        isValidGuess,
      };
    }
    case AppActions.VALIDATE_GUESS: {
      const { guesses, secret, feedback } = state;

      const validationResult = guesses.map((guess, idx) =>
        getGuessStatus(guess, secret, idx)
      );
      const isGameOver = guesses.every((val, idx) => val === secret[idx]);

      const updatedFeedback = {
        ...feedback,
        [state.guessNumber]: validationResult,
      };

      return {
        ...state,
        guessNumber: isGameOver ? state.guessNumber : state.guessNumber + 1,
        guesses: [],
        isValidGuess: false,
        feedback: updatedFeedback,
        isGameOver,
      };
    }
    case AppActions.RESET_GAME: {
      return {
        ...initialState,
        ...initSecretCodeAndColorPalette(),
        isEasyMode: state.isEasyMode,
      };
    }
    case AppActions.TOGGLE_MODAL: {
      const modal = action.payload as ModalProps;
      return {
        ...state,
        modal,
      };
    }
    case AppActions.SET_DIFFICULTY: {
      const { isEasyMode } = action.payload as {
        isEasyMode: boolean;
      };

      return {
        ...state,
        isEasyMode,
      };
    }
    default:
      return state;
  }
}
