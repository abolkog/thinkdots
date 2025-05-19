const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'cyan'];

export function generateSecretCode(length = 4) {
  if (length > COLORS.length) {
    throw new Error('Requested code length exceeds number of available colors');
  }
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, length);
}
