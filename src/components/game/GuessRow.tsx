import { useGameContext } from '@hooks/useGameContext';
import { COLORS_PER_ROW } from '@util/common';
import Dot from '@components/game/Dot';
import Feedback from '@components/game/Feedback';

export default function GuessRow({ position }: { position: number }) {
  const { state } = useGameContext();
  const disabled = state.isGameOver || state.guessNumber > position + 1;

  return (
    <div className='flex items-center space-x-4'>
      <div className='flex space-x-2'>
        {[...Array(COLORS_PER_ROW)].map((_, i) => (
          <Dot key={i} position={i} disabled={disabled} />
        ))}
      </div>
      <Feedback position={position} />
    </div>
  );
}
