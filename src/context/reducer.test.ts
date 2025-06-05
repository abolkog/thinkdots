import reducer, { AppActions } from '@context/reducer';
import type { AppAction, AppState } from '@context/types';

const initialState: AppState = {
  guesses: [],
  secret: ['red', 'blue', 'green', 'yellow'],
  colorPalette: ['red', 'blue', 'green', 'yellow'],
  feedback: {},
  guessNumber: 1,
  isValidGuess: false,
  isGameOver: false,
  isEasyMode: true,
};

describe('reducer', () => {
  describe('SET_GUESS', () => {
    it('updates guesses and isValidGuess', () => {
      const action = {
        type: AppActions.SET_GUESS,
        payload: { position: 0, color: 'red' },
      };
      const state = reducer(initialState, action);
      expect(state.guesses[0]).toEqual('red');
      expect(state.isValidGuess).toEqual(false);
    });

    it('set isValidGuess to true when all guesses are set', () => {
      const filledState = {
        ...initialState,
        guesses: ['red', 'blue', '', 'yellow'],
      };

      const validAction = {
        type: AppActions.SET_GUESS,
        payload: { position: 2, color: 'cyan' },
      };
      const state = reducer(filledState, validAction);
      expect(state.isValidGuess).toEqual(true);
    });
  });

  describe('VALIDATE_GUESS', () => {
    const baseState = {
      ...initialState,
      guesses: ['red', 'blue', 'green', 'yellow'],
      secret: ['red', 'blue', 'green', 'yellow'],
      feedback: {},
      guessNumber: 0,
      isValidGuess: true,
      isGameOver: false,
    };

    it('reset guesses array', () => {
      const action = { type: AppActions.VALIDATE_GUESS };
      const state = reducer(baseState, action);

      expect(state.guesses).toEqual([]);
    });

    it('set isGameOver to true when guess is correct', () => {
      const action = { type: AppActions.VALIDATE_GUESS };
      const newState = reducer(baseState, action);
      expect(newState.isGameOver).toEqual(true);
    });

    it('update the feedback object and increment guess number', () => {
      const action = { type: AppActions.VALIDATE_GUESS };
      const state = reducer(
        {
          ...baseState,
          guessNumber: 0,
          guesses: ['yellow', 'orange', 'red', 'cyan'],
        },
        action
      );

      const { feedback, guessNumber } = state;
      expect(feedback[0]).toBeDefined();
      expect(guessNumber).toEqual(1);
    });
  });

  describe('RESET_GAME', () => {
    it('reset all default values', () => {
      const action = { type: AppActions.RESET_GAME };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        secret: expect.any(Array),
        colorPalette: expect.any(Array),
        guessNumber: 1,
        isValidGuess: false,
        isGameOver: false,
        feedback: {},
        guesses: [],
        isEasyMode: true,
      });
    });

    it('regenerates secret and colorPalette', () => {
      const action = { type: AppActions.RESET_GAME };
      const state = reducer(initialState, action);
      expect(state.secret).toHaveLength(4);
      expect(state.colorPalette).toHaveLength(4);
      expect(state.secret).not.toEqual(initialState.secret);
      expect(state.colorPalette).not.toEqual(initialState.colorPalette);
    });

    it('keeps isEasyMode value', () => {
      const action = { type: AppActions.RESET_GAME };
      const state = reducer({ ...initialState, isEasyMode: false }, action);
      expect(state.isEasyMode).toEqual(false);
    });
  });

  describe('TOGGLE_MODAL', () => {
    it('updates the modal state', () => {
      const modal = { isOpen: true, content: 'Test Modal' };
      const action = {
        type: AppActions.TOGGLE_MODAL,
        payload: modal,
      };
      const state = reducer(initialState, action);
      expect(state.modal).toEqual(modal);
    });
  });

  describe('SET_DIFFICULTY', () => {
    it('updates isEasyMode', () => {
      const action = {
        type: AppActions.SET_DIFFICULTY,
        payload: { isEasyMode: false },
      };
      const state = reducer(initialState, action);
      expect(state.isEasyMode).toEqual(false);
    });
  });

  it('returns state for unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' } as AppAction;
    const state = reducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
