import GuessRow from '@components/game/GuessRow';
import { NUMBER_OF_ATTEMPTS } from '@util/common';

export default function GameBoard() {
  return (
    <div className="grid gap-4 mb-6" data-testid="gameBoard">
      {[...Array(NUMBER_OF_ATTEMPTS)].map((_, i) => (
        <GuessRow key={i} rowNumber={i + 1} />
      ))}
    </div>
  );
}
