import type { Achievement, PlayerStats } from '@context/types';
import * as StorageService from '@services/storage';
import { GUESS_STATUS } from './common';
import {
  getGuessStatus,
  getPlayerStateFromStorage,
  getUnlockedAchievements,
  initSecretCodeAndColorPalette,
  savePlayerStats,
  updateStats,
  validateCode,
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
        lastPlayed: expect.any(Number),
      });
    });

    it('returns parsed stats from storage', () => {
      const stored: PlayerStats = {
        totalGames: 5,
        wins: 3,
        losses: 2,
        fastestSolve: 2,
        fewestGuesses: 4,
        currentStreak: 1,
        maxStreak: 2,
        lastPlayed: 0,
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
        fewestGuesses: 3,
        currentStreak: 2,
        maxStreak: 5,
        lastPlayed: 0,
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

  describe('achievements', () => {
    beforeEach(jest.clearAllMocks);
    const basePlayerState = { ...mockState.playerState };

    const mapToString = (achievements: Achievement[]) => achievements.map((a) => a.id);

    it('unlocks first_win when wins >= 1 and totalGames > 0', () => {
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, wins: 1, totalGames: 1 });
      expect(mapToString(unlocked)).toContain('first_win');
    });
    it('does not unlock first_win when wins < 1', () => {
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, wins: 0, totalGames: 1 });
      expect(mapToString(unlocked)).not.toContain('first_win');
    });

    it('unlocks streak_5 when currentStreak >= 5 and < 10', () => {
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, currentStreak: 5 });
      expect(mapToString(unlocked)).toContain('streak_5');
    });
    it('does not unlock streak_5 when currentStreak < 5', () => {
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, currentStreak: 4 });
      expect(mapToString(unlocked)).not.toContain('streak_5');
    });

    it('unlocks streak_10 when currentStreak >= 10', () => {
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, currentStreak: 10 });
      expect(mapToString(unlocked)).toContain('streak_10');
    });
    it('does not unlock streak_10 when currentStreak < 10', () => {
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, currentStreak: 9 });
      expect(mapToString(unlocked)).not.toContain('streak_10');
    });

    it('unlocks master_solver when wins >= 50', () => {
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, wins: 50 });
      expect(mapToString(unlocked)).toContain('master_solver');
    });
    it('does not unlock master_solver when wins < 50', () => {
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, wins: 49 });
      expect(mapToString(unlocked)).not.toContain('master_solver');
    });

    it('unlocks fastest_solver when fastestSolve <= 30 and > 0', () => {
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, fastestSolve: 25 });
      expect(mapToString(unlocked)).toContain('fastest_solver');
    });
    it('does not unlock fastest_solver when fastestSolve > 30', () => {
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, fastestSolve: 31 });
      expect(mapToString(unlocked)).not.toContain('fastest_solver');
    });

    it('unlocks mind_reader when fewestGuesses <= 3 and totalGames > 0', () => {
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, fewestGuesses: 3, totalGames: 1 });
      expect(mapToString(unlocked)).toContain('mind_reader');
    });
    it('does not unlock mind_reader when fewestGuesses > 3', () => {
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, fewestGuesses: 4, totalGames: 1 });
      expect(mapToString(unlocked)).not.toContain('mind_reader');
    });

    it('unlocks weekend_warrior when lastPlayed is Saturday', () => {
      // Saturday = 6
      const saturday = new Date();
      saturday.setDate(saturday.getDate() - ((saturday.getDay() + 1) % 7)); // Go to last Saturday
      saturday.setHours(12, 0, 0, 0);
      const { unlocked } = getUnlockedAchievements({
        ...basePlayerState,
        lastPlayed: saturday.getTime(),
        totalGames: 1,
      });
      expect(mapToString(unlocked)).toContain('weekend_warrior');
    });
    it('unlocks weekend_warrior when lastPlayed is Sunday', () => {
      // Sunday = 0
      const sunday = new Date();
      sunday.setDate(sunday.getDate() - sunday.getDay());
      sunday.setHours(12, 0, 0, 0);
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, lastPlayed: sunday.getTime(), totalGames: 1 });
      expect(mapToString(unlocked)).toContain('weekend_warrior');
    });
    it('does not unlock weekend_warrior when lastPlayed is a weekday', () => {
      // Monday = 1
      const monday = new Date();
      monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
      monday.setHours(12, 0, 0, 0);
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, lastPlayed: monday.getTime(), totalGames: 1 });
      expect(mapToString(unlocked)).not.toContain('weekend_warrior');
    });

    it('unlocks comeback_kid when lastPlayed is at least 7 days ago', () => {
      const eightDaysAgo = Date.now() - 8 * 24 * 60 * 60 * 1000;
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, lastPlayed: eightDaysAgo, totalGames: 1 });
      expect(mapToString(unlocked)).toContain('comeback_kid');
    });
    it('does not unlock comeback_kid when lastPlayed is less than 7 days ago', () => {
      const sixDaysAgo = Date.now() - 6 * 24 * 60 * 60 * 1000;
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, lastPlayed: sixDaysAgo, totalGames: 1 });
      expect(mapToString(unlocked)).not.toContain('comeback_kid');
    });

    it('unlocks back_to_back when lastPlayed is exactly 1 day ago', () => {
      const yesterday = Date.now() - 1 * 24 * 60 * 60 * 1000;
      const { unlocked } = getUnlockedAchievements({ ...basePlayerState, lastPlayed: yesterday, totalGames: 1 });
      expect(mapToString(unlocked)).toContain('back_to_back');
    });
    it('does not unlock back_to_back when lastPlayed is not exactly 1 day ago', () => {
      const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;
      const today = Date.now();
      expect(
        mapToString(getUnlockedAchievements({ ...basePlayerState, lastPlayed: twoDaysAgo, totalGames: 1 }).unlocked)
      ).not.toContain('back_to_back');
      expect(
        mapToString(getUnlockedAchievements({ ...basePlayerState, lastPlayed: today, totalGames: 1 }).unlocked)
      ).not.toContain('back_to_back');
    });
  });

  describe('validateCode', () => {
    beforeEach(jest.clearAllMocks);
    it('should return valid code with correct colors', () => {
      const { isValid, code } = validateCode('red, indigo, green, yellow');
      expect(isValid).toBe(true);
      expect(code).toEqual(['red', 'indigo', 'green', 'yellow']);
    });

    it('should return invalid for duplicate colors', () => {
      const { isValid, code } = validateCode('red, blue, red, yellow');
      expect(isValid).toBe(false);
      expect(code).toEqual([]);
    });

    it('should return invalid for incorrect colors', () => {
      const { isValid, code } = validateCode('orange, blue, purple, yellow');
      expect(isValid).toBe(false);
      expect(code).toEqual([]);
    });

    it('should return invalid for less than required colors', () => {
      const { isValid, code } = validateCode('red, blue');
      expect(isValid).toBe(false);
      expect(code).toEqual([]);
    });

    it('should return invalid for more than required colors', () => {
      const { isValid, code } = validateCode('red, blue, green, yellow, orange');
      expect(isValid).toBe(false);
      expect(code).toEqual([]);
    });
  });
});
