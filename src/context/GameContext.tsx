import { createContext } from 'react';
import { generateSecretCode } from '../util/gameUtil';
import type { AppState, GameContextType } from './types';

const initSecretCode = () => {
  const secret = generateSecretCode();
  const colorPalette = [...secret].sort(() => Math.random() - 0.5);
  return { secret, colorPalette };
};
export const initialState: AppState = {
  ...initSecretCode(),
  guesses: [],
  feedback: [],
  guessNumber: 1,
  isValidGuess: false,
  isGameOver: false,
};

export const GameContext = createContext<GameContextType>({
  state: initialState,
  dispatch: () => {},
});
