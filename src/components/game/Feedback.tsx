import { useGameContext } from '@hooks/useGameContext';
import { COLORS_PER_ROW } from '@util/common';

export default function Feedback({ position }: { position: number }) {
  const { state } = useGameContext();
  const { feedback } = state;
  const correctGuesses = feedback[position] ?? 0;

  return (
    <div
      className='grid grid-cols-2 gap-1 w-6 h-6'
      data-testid='feedback-container'
    >
      {[...Array(COLORS_PER_ROW)].map((_, i) => (
        <div
          key={i}
          role='presentation'
          className={`w-3 h-3 rounded-full border border-gray-400 ${
            i < correctGuesses ? 'bg-green-500' : 'bg-white'
          }`}
        />
      ))}
    </div>
  );
}
