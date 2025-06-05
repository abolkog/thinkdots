import Controls from '@components/game/Controls';
import GameBoard from '@components/game/GameBoard';
import Header from '@components/game/Header';
import StateListener from '@components/game/StateListener';
import Modal from '@components/ui/Modal';

function Game() {
  return (
    <section className="w-full sm:w-[60%] lg:w-[90%] flex flex-col justify-center items-center">
      <Header />

      <div className="flex flex-col items-center justify-center max-w-96 bg-black-300 p-5 mb-10 rounded-4xl">
        <GameBoard />
      </div>
      <Controls />
      <StateListener />
      <Modal />
    </section>
  );
}

export default Game;
