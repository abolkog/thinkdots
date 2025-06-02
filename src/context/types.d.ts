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
  feedback: number[];
  guessNumber: number;
  isValidGuess: boolean;
  isGameOver: boolean;
  modal?: ModalProps;
};

export type GameContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

export type AppAction = {
  type: string;
  payload?: unknown;
};
