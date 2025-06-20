import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import App from './App';
import GameProvider from '@context/GameProvider';
import { TimerProvider } from '@context/timer/TimerProvider';

import '@styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="bg-black-400 text-gray-400 h-screen flex flex-col items-center overflow-auto">
      <section className="w-full sm:w-[60%] lg:w-[60%] flex flex-col items-center justify-center gap-10 min-h-screen">
        <HashRouter>
          <GameProvider>
            <TimerProvider>
              <App />
            </TimerProvider>
          </GameProvider>
        </HashRouter>
      </section>
    </main>
  </StrictMode>
);
