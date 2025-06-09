import { createContext } from 'react';
import { initSecretCodeAndColorPalette, getPlayerStateFromStorage } from '@util/gameUtil';
import type { AppState, GameContextType } from '@context/types';

export const initialState: AppState = {
  ...initSecretCodeAndColorPalette(),
  playerState: getPlayerStateFromStorage(),
  guesses: [],
  feedback: {},
  guessNumber: 1,
  isValidGuess: false,
  isVictory: false,
  isEasyMode: true,
  sidePanelOpen: false,
  startTime: 0,
};

export const GameContext = createContext<GameContextType>({
  state: initialState,
  dispatch: () => {},
});
