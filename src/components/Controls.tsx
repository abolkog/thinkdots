import ColorPalette from './ColorPalette';

export default function Controls() {
  return (
    <div className='flex flex-col items-center space-y-4'>
      <ColorPalette />
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'>
        Submit Guess
      </button>
    </div>
  );
}
