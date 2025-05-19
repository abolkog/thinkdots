import { colorClasses } from '../util/gameUtil';
import { useGameContext } from '../hooks/useGameContext';

export default function ColorPalette() {
  const { state } = useGameContext();
  const { colorPalette } = state;
  return (
    <div className='flex space-x-2'>
      {colorPalette.map(color => (
        <button
          key={color}
          className={`w-10 h-10 rounded-full border-2 border-gray-200 hover:ring-2 ${colorClasses[color]}`}
        />
      ))}
    </div>
  );
}
