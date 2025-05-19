import { useGameContext } from '../hooks/useGameContext';
import GuessRow from './GuessRow';

export default function GameBoard() {
  const { state } = useGameContext();
  const { guessNumber } = state;

  return (
    <div className='grid gap-4 mb-6'>
      {[...Array(guessNumber)].map((_, i) => (
        <GuessRow key={i} />
      ))}
    </div>
  );
}
