import { useEffect, useRef, useState } from 'react';

export default function Counter() {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current);
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);

    const pad = (n: number, len = 2) => n.toString().padStart(len, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}.${pad(centiseconds)}`;
  };

  return (
    <div className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-s font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20 ">
      {formatTime(elapsed)}
    </div>
  );
}
