import { generateSecretCode } from './gameUtil';

describe('GameUtil', () => {
  describe('generateSecretCode', () => {
    it('should generate a code of the specified length', () => {
      const code = generateSecretCode(6);
      expect(code).toHaveLength(6);
    });

    it('should only use available colors', () => {
      const code = generateSecretCode(6);
      const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'cyan'];
      code.forEach(color => {
        expect(COLORS).toContain(color);
      });
    });

    it('should not have duplicate colors in the code', () => {
      const code = generateSecretCode(6);
      const uniqueColors = new Set(code);
      expect(uniqueColors.size).toBe(code.length);
    });

    it('should throw an error if requested length exceeds available colors', () => {
      expect(() => generateSecretCode(7)).toThrow(
        'Requested code length exceeds number of available colors'
      );
    });

    it('should generate different codes on subsequent calls (likely)', () => {
      const code1 = generateSecretCode(4);
      const code2 = generateSecretCode(4);

      expect(code1.join('')).not.toBe(code2.join(''));
    });
  });
});
