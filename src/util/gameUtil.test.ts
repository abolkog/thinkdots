import type { PlayerStats } from '@context/types';
import * as StorageService from '@services/storage';
import { GUESS_STATUS } from './common';
import {
  getGuessStatus,
  getPlayerStateFromStorage,
  initSecretCodeAndColorPalette,
  savePlayerStats,
  updateStats,
} from './gameUtil';
import { mockState } from '@test/fixtures';

jest.mock('@services/storage');

const mockedStorageService = StorageService as jest.Mocked<typeof StorageService>;

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

  describe('getPlayerStateFromStorage', () => {
    beforeEach(jest.clearAllMocks);

    it('returns default stats if nothing in storage', () => {
      mockedStorageService.getItem.mockReturnValue('');
      const stats = getPlayerStateFromStorage();
      expect(stats).toEqual({
        totalGames: 0,
        wins: 0,
        losses: 0,
        fastestSolve: 0,
        fewestGuesses: 0,
        currentStreak: 0,
        maxStreak: 0,
        lastPlayed: 0,
      });
    });

    it('returns parsed stats from storage', () => {
      const stored: PlayerStats = {
        totalGames: 5,
        wins: 3,
        losses: 2,
        fastestSolve: 2,
        averageGuesses: 4,
        currentStreak: 1,
        maxStreak: 2,
      };
      mockedStorageService.getItem.mockReturnValue(JSON.stringify(stored));
      const stats = getPlayerStateFromStorage();
      expect(stats).toEqual(stored);
    });
  });

  describe('savePlayerStats', () => {
    beforeEach(jest.clearAllMocks);

    it('calls setItem with correct arguments', () => {
      const stats: PlayerStats = {
        totalGames: 10,
        wins: 7,
        losses: 3,
        fastestSolve: 1,
        averageGuesses: 3,
        currentStreak: 2,
        maxStreak: 5,
      };
      savePlayerStats(stats);
      expect(mockedStorageService.setItem).toHaveBeenCalledWith('playerStats', JSON.stringify(stats));
    });
  });

  describe('updateStats', () => {
    it('should update stats correctly for a win', () => {
      const initialStats: PlayerStats = {
        totalGames: 5,
        wins: 3,
        losses: 2,
        fastestSolve: 2,
        fewestGuesses: 4,
        currentStreak: 1,
        maxStreak: 2,
        lastPlayed: 0,
      };
      const updatedStats = updateStats({ ...mockState, playerState: initialStats, isVictory: true, guessNumber: 5 });
      expect(updatedStats).toEqual({
        totalGames: 6,
        wins: 4,
        losses: 2,
        fastestSolve: 2,
        fewestGuesses: 4,
        currentStreak: 2,
        maxStreak: 2,
        lastPlayed: 0,
      });
    });

    it('should update stats correctly for a loss', () => {
      const initialStats: PlayerStats = {
        totalGames: 5,
        wins: 3,
        losses: 2,
        fastestSolve: 2,
        fewestGuesses: 0,
        currentStreak: 1,
        maxStreak: 2,
        lastPlayed: 0,
      };
      const updatedStats = updateStats({ ...mockState, playerState: initialStats });
      expect(updatedStats).toEqual({
        totalGames: 6,
        wins: 3,
        losses: 3,
        fastestSolve: 2,
        fewestGuesses: 0,
        currentStreak: 0,
        maxStreak: 2,
        lastPlayed: 0,
      });
    });
  });
});
