import { createContext } from 'react';
import { initSecretCodeAndColorPalette } from '@util/gameUtil';
import type { AppState, GameContextType } from '@context/types';

export const initialState: AppState = {
  ...initSecretCodeAndColorPalette(),
  guesses: [],
  feedback: {},
  guessNumber: 1,
  isValidGuess: false,
  isGameOver: false,
  isEasyMode: true,
};

export const GameContext = createContext<GameContextType>({
  state: initialState,
  dispatch: () => {},
});
