import { useGameContext } from '@hooks/useGameContext';
import { FEEDBACK_COLORS } from '@util/common';

type RowFeedbackProps = { rowNumber: number; hidden: boolean };

export default function RowFeedback({ rowNumber, hidden }: RowFeedbackProps) {
  const { state } = useGameContext();
  if (hidden) return null;

  const { feedback } = state;
  const rowFeedback = feedback[rowNumber] ?? [];
  const sortedFeedback = rowFeedback.sort((a, b) => b - a);

  const getColor = (value: number) => {
    if (value === 1) return FEEDBACK_COLORS.correct;
    if (value === 0) return FEEDBACK_COLORS.present;
    return FEEDBACK_COLORS.absent;
  };

  return (
    <div
      className="grid grid-cols-2 gap-1 w-6 h-6"
      data-testid="feedback-container"
    >
      {sortedFeedback.map((value, i) => {
        const bgColor = getColor(value);
        return (
          <div
            key={`${value}_${i}`}
            role="presentation"
            className={`w-3 h-3 rounded-full border border-gray-400 ${bgColor}`}
          />
        );
      })}
    </div>
  );
}
