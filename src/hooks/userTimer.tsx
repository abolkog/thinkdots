import { TimerContext } from '@context/timer/TimerContext';
import { useContext } from 'react';

export function useTimer() {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error('useTimer must be used within a TimerProvider');
  return ctx;
}
