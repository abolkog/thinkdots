import { createContext } from 'react';
import { initSecretCode, getPlayerStateFromStorage } from '@util/gameUtil';
import type { AppState, GameContextType } from '@context/types';

export const initialState: AppState = {
  ...initSecretCode(),
  playerState: getPlayerStateFromStorage(),
  guesses: [],
  feedback: {},
  guessNumber: 1,
  isValidGuess: false,
  isVictory: false,
  isEasyMode: true,
  sidePanelOpen: false,
  startTime: 0,
  isCustomChallenge: false,
};

export const GameContext = createContext<GameContextType>({
  state: initialState,
  dispatch: () => {},
});
