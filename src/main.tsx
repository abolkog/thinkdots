import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import GameProvider from '@context/GameProvider';

import '@styles/index.css';
import { PROD } from '@util/envHelper';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="bg-black-400 text-gray-400 h-screen flex flex-col items-center overflow-auto">
      <section className="w-full sm:w-[60%] lg:w-[60%] flex flex-col items-center justify-center gap-10 min-h-screen">
        <BrowserRouter basename={PROD ? '/thinkdots/' : '/'}>
          <GameProvider>
            <App />
          </GameProvider>
        </BrowserRouter>
      </section>
    </main>
  </StrictMode>
);
