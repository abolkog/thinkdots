type AppState = {
  secret: string[];
};

type GameContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

type AppAction = {
  type: string;
  payload?: unknown;
};
