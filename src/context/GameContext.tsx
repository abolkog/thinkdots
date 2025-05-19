import { createContext } from 'react';
import { generateSecretCode } from '../util/gameUtil';
import type { AppState, GameContextType } from './types';

export const initialState: AppState = {
  secret: generateSecretCode(),
};

export const GameContext = createContext<GameContextType>({
  state: initialState,
  dispatch: () => {},
});
