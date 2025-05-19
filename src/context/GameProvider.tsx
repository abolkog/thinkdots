import { useMemo, useReducer } from 'react';

import reducer from './reducer';
import { GameContext, initialState } from './GameContext';

export default function GameProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
