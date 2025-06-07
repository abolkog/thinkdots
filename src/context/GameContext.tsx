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
  isGameOver: false,
  isEasyMode: true,
  sidePanelOpen: false,
};

export const GameContext = createContext<GameContextType>({
  state: initialState,
  dispatch: () => {},
});
