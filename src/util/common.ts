import type { Achievement } from '@context/types';

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

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_win',
    name: 'First Win',
    description: 'Win your first game.',
    conditions: (state) => state.wins >= 1 && state.totalGames > 0,
  },
  {
    id: 'streak_5',
    name: 'On Fire',
    description: 'Achieve a win streak of 5 games.',
    conditions: (state) => state.currentStreak >= 5 && state.currentStreak < 10,
  },
  {
    id: 'streak_10',
    name: 'Unstoppable',
    description: 'Achieve a win streak of 10 games.',
    conditions: (state) => state.currentStreak >= 10,
  },
  {
    id: 'master_solver',
    name: 'Master Solver',
    description: 'Win 50 games.',
    conditions: (state) => state.wins >= 50,
  },
  {
    id: 'fastest_solver',
    name: 'Speed Demon',
    description: 'Solve a game in under 30 seconds.',
    conditions: (state) => state.fastestSolve <= 30 && state.fastestSolve > 0,
  },
  {
    id: 'mind_reader',
    name: 'Mind Reader',
    description: 'Solve a game in 3 guesses or fewer.',
    conditions: (state) => state.fewestGuesses <= 3,
  },
  {
    id: 'daily_dedication',
    name: 'Daily Dedication',
    description: 'Play 3 days in a row',
    conditions: (state) => {
      const today = new Date();
      const lastPlayed = new Date(state.lastPlayed);
      const daysSinceLastPlayed = Math.floor((today.getTime() - lastPlayed.getTime()) / (1000 * 60 * 60 * 24));
      return daysSinceLastPlayed <= 3 && state.totalGames > 0;
    },
  },
];
