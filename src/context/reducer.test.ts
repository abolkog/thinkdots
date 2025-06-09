import reducer, { AppActions } from '@context/reducer';
import type { AppAction } from '@context/types';
import { mockState } from '@test/fixtures';

describe('reducer', () => {
  const mockDate = new Date('2023-10-01T00:00:00Z');
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });
  describe('SET_GUESS', () => {
    it('updates guesses and isValidGuess', () => {
      const action = {
        type: AppActions.SET_GUESS,
        payload: { position: 0, color: 'red' },
      };
      const state = reducer(mockState, action);
      expect(state.guesses[0]).toEqual('red');
      expect(state.isValidGuess).toEqual(false);
    });

    it('set isValidGuess to true when all guesses are set', () => {
      const filledState = {
        ...mockState,
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
      ...mockState,
      guesses: ['red', 'blue', 'green', 'yellow'],
      secret: ['red', 'blue', 'green', 'yellow'],
      feedback: {},
      guessNumber: 0,
      isValidGuess: true,
      isVictory: false,
    };

    it('reset guesses array', () => {
      const action = { type: AppActions.VALIDATE_GUESS };
      const state = reducer(baseState, action);

      expect(state.guesses).toEqual([]);
    });

    it('set isVictory to true when guess is correct', () => {
      const action = { type: AppActions.VALIDATE_GUESS };
      const newState = reducer(baseState, action);
      expect(newState.isVictory).toEqual(true);
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
      const state = reducer(mockState, action);
      expect(state).toEqual({
        ...mockState,
        secret: expect.any(Array),
        colorPalette: expect.any(Array),
        guessNumber: 1,
        isValidGuess: false,
        isVictory: false,
        feedback: {},
        guesses: [],
        isEasyMode: true,
        playerState: expect.any(Object),
      });
    });

    it('regenerates secret and colorPalette', () => {
      const action = { type: AppActions.RESET_GAME };
      const state = reducer(mockState, action);
      expect(state.secret).toHaveLength(4);
      expect(state.colorPalette).toHaveLength(4);
      expect(state.secret).not.toEqual(mockState.secret);
      expect(state.colorPalette).not.toEqual(mockState.colorPalette);
    });

    it('keeps isEasyMode value', () => {
      const action = { type: AppActions.RESET_GAME };
      const state = reducer({ ...mockState, isEasyMode: false }, action);
      expect(state.isEasyMode).toEqual(false);
    });

    it('updates playerState with new stats', () => {
      const action = { type: AppActions.RESET_GAME };
      const state = reducer(mockState, action);
      expect(state.playerState).toEqual(
        expect.objectContaining({
          totalGames: mockState.playerState.totalGames + 1,
          wins: mockState.playerState.wins,
        })
      );
    });
  });

  describe('TOGGLE_MODAL', () => {
    it('updates the modal state', () => {
      const modal = { isOpen: true, content: 'Test Modal' };
      const action = {
        type: AppActions.TOGGLE_MODAL,
        payload: modal,
      };
      const state = reducer(mockState, action);
      expect(state.modal).toEqual(modal);
    });
  });

  describe('SET_DIFFICULTY', () => {
    it('updates isEasyMode', () => {
      const action = {
        type: AppActions.SET_DIFFICULTY,
        payload: { isEasyMode: false },
      };
      const state = reducer(mockState, action);
      expect(state.isEasyMode).toEqual(false);
    });
  });

  describe('SIDE_PANEL', () => {
    it('opens side panel', () => {
      const action = { type: AppActions.OPEN_SIDE_PANEL };
      const state = reducer(mockState, action);
      expect(state.sidePanelOpen).toEqual(true);
    });

    it('closes side panel', () => {
      const action = { type: AppActions.CLOSE_SIDE_PANEL };
      const state = reducer({ ...mockState, sidePanelOpen: true }, action);
      expect(state.sidePanelOpen).toEqual(false);
    });
  });

  describe('INIT_GAME', () => {
    it('set start time', () => {
      const action = { type: AppActions.INIT_GAME };
      const state = reducer(mockState, action);
      expect(state.startTime).toBeDefined();
      expect(state.startTime).toEqual(mockDate.getTime());
    });
  });

  describe('RESET_PLAYER_STATE', () => {
    it('resets player state', () => {
      const action = { type: AppActions.RESET_PLAYER_STATE };
      const state = reducer(mockState, action);
      expect(state.playerState).toEqual({
        totalGames: 0,
        wins: 0,
        losses: 0,
        fastestSolve: 0,
        fewestGuesses: 0,
        currentStreak: 0,
        maxStreak: 0,
        lastPlayed: 0,
      });
    });
  });

  it('returns state for unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' } as AppAction;
    const state = reducer(mockState, action);
    expect(state).toEqual(mockState);
  });
});
