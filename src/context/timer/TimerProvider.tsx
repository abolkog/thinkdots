import { useRef, useState, useEffect, type PropsWithChildren } from 'react';
import { TimerContext } from './TimerContext';

export function TimerProvider({ children }: PropsWithChildren) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const start = () => {
    if (intervalRef.current) return;
    startTimeRef.current = Date.now() - elapsed;
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - (startTimeRef.current ?? Date.now()));
    }, 50);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = (restart = false) => {
    stop();
    setElapsed(0);
    startTimeRef.current = null;
    if (restart) {
      start();
    }
  };

  useEffect(() => {
    return stop;
  }, []);

  return <TimerContext.Provider value={{ elapsed, start, stop, reset }}>{children}</TimerContext.Provider>;
}
