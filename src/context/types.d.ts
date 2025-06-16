import type { ReactNode } from 'react';

export type ModalProps = {
  title: string;
  message: ReactNode;
  yesButtonText: string;
  noButtonText?: string;
  yesButtonOnClick: () => void;
  noButtonOnClick?: () => void;
  isOpen: boolean;
};

export type AppState = {
  secret: string[];
  colorPalette: string[];
  guesses: string[];
  feedback: Record<number, number[]>;
  guessNumber: number;
  isValidGuess: boolean;
  isVictory: boolean;
  modal?: ModalProps;
  isEasyMode: boolean;
  sidePanelOpen: boolean;
  playerState: PlayerStats;
  startTime: number;
  isCustomChallenge: boolean;
  challengerName?: string;
  challengeMessage?: string;
};

export type GameContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

export type AppAction = {
  type: string;
  payload?: unknown;
};

export type PlayerStats = {
  totalGames: number;
  wins: number;
  losses: number;
  fastestSolve: number;
  fewestGuesses: number;
  currentStreak: number;
  maxStreak: number;
  lastPlayed: number;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  conditions: (state: PlayerStats) => boolean;
};
