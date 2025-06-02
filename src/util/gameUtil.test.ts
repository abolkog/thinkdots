import { GUESS_STATUS } from './common';
import { getGuessStatus, initSecretCodeAndColorPalette } from './gameUtil';

describe('GameUtil', () => {
  describe('initSecretCodeAndColorPalette', () => {
    it('should generate a code color palette', () => {
      const { secret, colorPalette } = initSecretCodeAndColorPalette();
      expect(secret).toHaveLength(4);
      expect(colorPalette).toHaveLength(4);
    });

    it('should only use available colors', () => {
      const { secret } = initSecretCodeAndColorPalette();
      const COLORS = ['red', 'indigo', 'green', 'yellow', 'purple', 'cyan'];
      secret.forEach((color) => {
        expect(COLORS).toContain(color);
      });
    });

    it('should not have duplicate colors in the code', () => {
      const { secret } = initSecretCodeAndColorPalette();
      const uniqueColors = new Set(secret);
      expect(uniqueColors.size).toEqual(secret.length);
    });

    it('should generate different codes on subsequent calls (likely)', () => {
      const { secret: secret1 } = initSecretCodeAndColorPalette();
      const { secret: secret2 } = initSecretCodeAndColorPalette();

      expect(secret1.join('')).not.toEqual(secret2.join(''));
    });

    it('should generate a color palette that includes the secret colors', () => {
      const { secret, colorPalette } = initSecretCodeAndColorPalette();
      secret.forEach((color) => {
        expect(colorPalette).toContain(color);
      });
    });
  });

  describe('getGuessStatus', () => {
    const secret = ['red', 'blue', 'green', 'yellow'];

    it('should return CORRECT for a correct guess', () => {
      const guess = 'red';
      const idx = 0;
      const status = getGuessStatus(guess, secret, idx);
      expect(status).toEqual(GUESS_STATUS.CORRECT);
    });

    it('should return PRESENT for a guess that is in the secret but at a different index', () => {
      const guess = 'blue';
      const idx = 0;
      const status = getGuessStatus(guess, secret, idx);
      expect(status).toEqual(GUESS_STATUS.PRESENT);
    });

    it('should return ABSENT for a guess that is not in the secret', () => {
      const guess = 'purple';
      const idx = 0;
      const status = getGuessStatus(guess, secret, idx);
      expect(status).toEqual(GUESS_STATUS.ABSENT);
    });
  });
});
