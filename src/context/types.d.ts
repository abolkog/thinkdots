export type AppState = {
  secret: string[];
  colorPalette: string[];
  guesses: string[];
  guessNumber: number;
  isValidGuess: boolean;
};

export type GameContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

export type AppAction = {
  type: string;
  payload?: unknown;
};
