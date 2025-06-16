import { COLORS_PER_ROW } from '@util/common';
import type { AppAction, AppState, ModalProps } from '@context/types';
import { initialState } from '@context/GameContext';
import { getGuessStatus, initSecretCode, resetPlayerStats, updateStats } from '@util/gameUtil';

export const AppActions = {
  SET_GUESS: 'SET_GUESS',
  VALIDATE_GUESS: 'VALIDATE_GUESS',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  RESET_GAME: 'RESET_GAME',
  SET_DIFFICULTY: 'SET_DIFFICULTY',
  OPEN_SIDE_PANEL: 'OPEN_SIDE_PANEL',
  CLOSE_SIDE_PANEL: 'CLOSE_SIDE_PANEL',
  INIT_GAME: 'INIT_GAME',
  RESET_PLAYER_STATE: 'RESET_PLAYER_STATE',
  SET_CUSTOM_CHALLENGE: 'SET_CUSTOM_CHALLENGE',
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
      const isValidGuess = newGuesses.every(Boolean) && new Set(newGuesses).size === COLORS_PER_ROW;
      return {
        ...state,
        guesses: newGuesses,
        isValidGuess,
      };
    }
    case AppActions.VALIDATE_GUESS: {
      const { guesses, secret, feedback } = state;

      const validationResult = guesses.map((guess, idx) => getGuessStatus(guess, secret, idx));
      const isVictory = guesses.every((val, idx) => val === secret[idx]);

      const updatedFeedback = {
        ...feedback,
        [state.guessNumber]: validationResult,
      };

      return {
        ...state,
        guessNumber: isVictory ? state.guessNumber : state.guessNumber + 1,
        guesses: [],
        isValidGuess: false,
        feedback: updatedFeedback,
        isVictory,
      };
    }
    case AppActions.RESET_GAME: {
      const updatedPlayerState = state.isCustomChallenge ? state.playerState : updateStats(state);
      return {
        ...initialState,
        ...initSecretCode(),
        isEasyMode: state.isEasyMode,
        playerState: updatedPlayerState,
        startTime: Date.now(),
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
      return { ...state, isEasyMode };
    }
    case AppActions.OPEN_SIDE_PANEL: {
      return { ...state, sidePanelOpen: true };
    }
    case AppActions.CLOSE_SIDE_PANEL: {
      return { ...state, sidePanelOpen: false };
    }
    case AppActions.INIT_GAME: {
      return { ...state, startTime: Date.now() };
    }
    case AppActions.SET_CUSTOM_CHALLENGE: {
      const { secret, challengeMessage, challengerName } = action.payload as {
        secret: string[];
        challengerName?: string;
        challengeMessage?: string;
      };
      const updatedState = {
        ...initialState,
        secret,
        isEasyMode: false,
        isCustomChallenge: true,
        challengeMessage: challengeMessage ?? '',
        challengerName: challengerName ?? '',
      };
      return updatedState;
    }
    case AppActions.RESET_PLAYER_STATE: {
      const playerState = resetPlayerStats();
      return {
        ...state,
        playerState,
      };
    }
    default:
      return state;
  }
}
