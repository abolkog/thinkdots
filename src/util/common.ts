export const COLORS_PER_ROW = 4;
export const NUMBER_OF_ATTEMPTS = 7;

export const GUESS_STATUS = {
  CORRECT: 1,
  PRESENT: 0,
  ABSENT: -1,
} as const;

export const FEEDBACK_COLORS = {
  correct: 'bg-green-500',
  present: 'bg-white',
  absent: 'bg-gray-500',
} as const;

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
