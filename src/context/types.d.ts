export type ModalProps = {
  title: string;
  message: string;
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
  averageGuesses: number;
  currentStreak: number;
  maxStreak: number;
};
