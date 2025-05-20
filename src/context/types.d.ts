export type AppState = {
  secret: string[];
  colorPalette: string[];
  guesses: string[];
  feedback: number[];
  guessNumber: number;
  isValidGuess: boolean;
  isGameOver: boolean;
};

export type GameContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

export type AppAction = {
  type: string;
  payload?: unknown;
};
