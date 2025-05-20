import reducer, { AppActions } from './reducer';
import { COLORS_PER_ROW } from '../util/common';
import type { AppState } from './types';

const initialState: AppState = {
  guesses: ['', '', '', ''],
  secret: ['red', 'blue', 'green', 'yellow'],
  colorPalette: ['red', 'blue', 'green', 'yellow'],
  feedback: [],
  guessNumber: 0,
  isValidGuess: false,
  isGameOver: false,
};

describe('reducer', () => {
  it('handles SET_GUESS and updates guesses and isValidGuess', () => {
    const action = {
      type: AppActions.SET_GUESS,
      payload: { position: 0, color: 'red' },
    };
    const state = reducer(initialState, action);
    expect(state.guesses[0]).toEqual('red');
    expect(state.isValidGuess).toEqual(false);

    let filledState = { ...state, guesses: ['red', 'blue', 'green', 'yellow'] };
    const validAction = {
      type: AppActions.SET_GUESS,
      payload: { position: 3, color: 'yellow' },
    };
    const validState = reducer(filledState, validAction);
    expect(validState.isValidGuess).toEqual(
      new Set(validState.guesses).size === COLORS_PER_ROW &&
        validState.guesses.every(g => g !== '')
    );
  });

  it('handles VALIDATE_GUESS and updates feedback, guessNumber, isGameOver', () => {
    const state = {
      ...initialState,
      guesses: ['red', 'blue', 'green', 'yellow'],
      secret: ['red', 'blue', 'green', 'yellow'],
      feedback: [],
      guessNumber: 0,
      isValidGuess: true,
      isGameOver: false,
    };
    const action = { type: AppActions.VALIDATE_GUESS };
    const newState = reducer(state, action);

    expect(newState.feedback).toEqual([4]);
    expect(newState.guessNumber).toEqual(1);
    expect(newState.isValidGuess).toEqual(false);
    expect(newState.isGameOver).toEqual(true);
  });

  it('handles VALIDATE_GUESS with partial correct guesses', () => {
    const state = {
      ...initialState,
      guesses: ['red', 'blue', 'yellow', 'green'],
      secret: ['red', 'blue', 'green', 'yellow'],
      feedback: [],
      guessNumber: 0,
      isValidGuess: true,
      isGameOver: false,
    };
    const action = { type: AppActions.VALIDATE_GUESS };
    const newState = reducer(state, action);

    expect(newState.feedback).toEqual([2]);
    expect(newState.isGameOver).toEqual(false);
  });

  it('returns state for unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any;
    const state = reducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
