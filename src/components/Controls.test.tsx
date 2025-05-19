import { render, screen, fireEvent } from '@testing-library/react';
import Controls from './Controls';
import { GameContext } from '../context/GameContext';
import { mockState } from '../../test/fixtures';

const mockDispatch = jest.fn();

describe('Controls', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders the Submit Guess button', () => {
    render(
      <GameContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <Controls />
      </GameContext.Provider>
    );
    expect(
      screen.getByRole('button', { name: /submit guess/i })
    ).toBeInTheDocument();
  });

  it('enables the Submit Guess button when isValidGuess is true', () => {
    render(
      <GameContext.Provider
        value={{
          state: { ...mockState, isValidGuess: true },
          dispatch: mockDispatch,
        }}
      >
        <Controls />
      </GameContext.Provider>
    );
    expect(screen.getByRole('button', { name: /submit guess/i })).toBeEnabled();
  });

  it('disables the Submit Guess button when isValidGuess is false', () => {
    render(
      <GameContext.Provider
        value={{
          state: { ...mockState, isValidGuess: false },
          dispatch: mockDispatch,
        }}
      >
        <Controls />
      </GameContext.Provider>
    );
    expect(
      screen.getByRole('button', { name: /submit guess/i })
    ).toBeDisabled();
  });

  it('dispatches VALIDATE_GUESS action when Submit Guess is clicked', () => {
    render(
      <GameContext.Provider
        value={{
          state: { ...mockState, isValidGuess: true },
          dispatch: mockDispatch,
        }}
      >
        <Controls />
      </GameContext.Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /submit guess/i }));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'VALIDATE_GUESS' });
  });
});
