import { createContext } from 'react';

type TimerContextType = {
  elapsed: number;
  start: () => void;
  stop: () => void;
  reset: (restart?: boolean) => void;
};

export const TimerContext = createContext<TimerContextType>({
  elapsed: 0,
  start: () => {},
  stop: () => {},
  reset: () => {},
});
