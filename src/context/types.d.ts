export type AppState = {
  secret: string[];
};

export type GameContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};

export type AppAction = {
  type: string;
  payload?: unknown;
};
