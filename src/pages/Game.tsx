import { useEffect } from 'react';
import Controls from '@components/game/Controls';
import GameBoard from '@components/game/GameBoard';
import Header from '@components/game/Header';
import StateListener from '@components/game/StateListener';

import { AppActions } from '@context/reducer';
import { useGameContext } from '@hooks/useGameContext';
import { useTimer } from '@hooks/userTimer';

function Game() {
  const { dispatch } = useGameContext();
  const { start, stop } = useTimer();

  useEffect(() => {
    dispatch({ type: AppActions.INIT_GAME });
    start();

    return () => {
      stop();
    };
  }, [dispatch, start, stop]);

  return (
    <section className="w-full sm:w-[60%] lg:w-[90%] flex flex-col justify-center items-center">
      <Header />

      <div className="flex flex-col items-center justify-center max-w-96 bg-black-300 p-5 mb-5 rounded-4xl">
        <GameBoard />
      </div>
      <Controls />
      <StateListener />
    </section>
  );
}

export default Game;
