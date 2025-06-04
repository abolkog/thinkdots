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

export const COLORS = ['red', 'indigo', 'green', 'yellow', 'purple', 'cyan'];

export const colorClasses: Record<string, string> = {
  red: 'bg-red-500 ring-red-400',
  indigo: 'bg-indigo-500 ring-indigo-400',
  green: 'bg-green-500 ring-green-400',
  yellow: 'bg-yellow-500 ring-yellow-400',
  purple: 'bg-purple-500 ring-purple-400',
  cyan: 'bg-cyan-500 ring-cyan-400',
};
