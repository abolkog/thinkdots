export const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'cyan'];

export const colorClasses: Record<string, string> = {
  red: 'bg-red-500 ring-red-400',
  blue: 'bg-blue-500 ring-blue-400',
  green: 'bg-green-500 ring-green-400',
  yellow: 'bg-yellow-500 ring-yellow-400',
  purple: 'bg-purple-500 ring-purple-400',
  cyan: 'bg-cyan-500 ring-cyan-400',
};

export function generateSecretCode(length = 4) {
  if (length > COLORS.length) {
    throw new Error('Requested code length exceeds number of available colors');
  }
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, length);
}
