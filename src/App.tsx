import Controls from './components/Controls';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className='min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-4'>
      <div className='divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm'>
        <div className='px-4 py-5 sm:px-6'>
          <h1 className='text-4xl font-bold mb-6'>ThinkDots</h1>
        </div>
        <div className='px-4 py-5 sm:p-6'>
          <GameBoard />
        </div>
        <div className='px-4 py-4 sm:px-6'>
          <Controls />
        </div>
      </div>
    </div>
  );
}

export default App;
