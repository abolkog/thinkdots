import Controls from '@components/game/Controls';
import GameBoard from '@components/game/GameBoard';
import Header from '@components/game/Header';

function App() {
  return (
    <section className='h-screen md:h-[70vh] w-full sm:w-[60%] lg:w-[90%] flex flex-col justify-center items-center'>
      <Header />

      <div className='flex flex-col items-center justify-center w-full bg-black-300 p-5 mb-10 rounded-2xl'>
        <GameBoard />
      </div>
      <Controls />
    </section>
  );
}

export default App;
