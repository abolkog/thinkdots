import { useGameContext } from '@hooks/useGameContext';
import { COLORS_PER_ROW } from '@util/common';
import Dot from '@components/game/Dot';
import RowFeedback from '@components/game/RowFeedback';
import DotFeedback from './DotFeedback';

export default function GuessRow({ rowNumber }: { rowNumber: number }) {
  const { state } = useGameContext();
  const disabled = state.isGameOver || state.guessNumber > rowNumber;
  const hideDotFeedback =
    state.isGameOver || !state.isEasyMode || state.guessNumber <= rowNumber;
  const hideRowFeedback = state.isGameOver || state.isEasyMode;

  return (
    <div className="flex items-center space-x-4">
      <div className="flex space-x-2">
        {[...Array(COLORS_PER_ROW)].map((_, i) => (
          <div className="flex flex-col justify-center items-center" key={i}>
            <Dot position={i} disabled={disabled} />
            <DotFeedback
              rowNumber={rowNumber}
              position={i}
              hidden={hideDotFeedback}
            />
          </div>
        ))}
      </div>
      <RowFeedback rowNumber={rowNumber} hidden={hideRowFeedback} />
    </div>
  );
}
