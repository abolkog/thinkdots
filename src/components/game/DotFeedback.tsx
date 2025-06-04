import { useGameContext } from '@hooks/useGameContext';
import { FEEDBACK_COLORS, GUESS_STATUS } from '@util/common';
import { classNames } from '@util/gameUtil';

type DotFeedbackProps = {
  position: number;
  rowNumber: number;
  hidden: boolean;
};

export default function DotFeedback({
  position,
  rowNumber,
  hidden,
}: DotFeedbackProps) {
  const {
    state: { feedback },
  } = useGameContext();

  if (hidden) return null;

  const currentFeedback = feedback[rowNumber][position];

  let color: string = FEEDBACK_COLORS.absent;
  if (currentFeedback === GUESS_STATUS.CORRECT) color = FEEDBACK_COLORS.correct;
  else if (currentFeedback === GUESS_STATUS.PRESENT)
    color = FEEDBACK_COLORS.present;

  return (
    <span
      data-testid={`dotFeedback-${position}`}
      className={classNames('w-1/2 h-1.5 mt-1.5', color)}
    />
  );
}
