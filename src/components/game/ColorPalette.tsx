import { colorClasses } from '@util/gameUtil';
import { useGameContext } from '@hooks/useGameContext';

export default function ColorPalette() {
  const { state } = useGameContext();
  const { colorPalette } = state;
  return (
    <div className='bg-gray-300 p-3 rounded-lg flex w-full mb-5 flex-col items-center'>
      <span className='font-bold text-black-500 uppercase mb-2'>
        current code colors
      </span>
      <div className='flex space-x-2 '>
        {colorPalette.map(color => (
          <button
            key={color}
            className={`w-10 h-10 rounded-full border-2 border-gray-200 hover:ring-2 ${colorClasses[color]}`}
          />
        ))}
      </div>
    </div>
  );
}
