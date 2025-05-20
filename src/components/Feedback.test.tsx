import { render, screen } from '@testing-library/react';
import Feedback from './Feedback';
import { GameContext } from '../context/GameContext';
import { COLORS_PER_ROW } from '../util/common';
import { mockState } from '../../test/fixtures';

const mockDispatch = jest.fn();

describe('Feedback', () => {
  it('renders the correct number of feedback dots', () => {
    render(
      <GameContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <Feedback position={0} />
      </GameContext.Provider>
    );
    const dots = screen.getAllByRole('presentation');
    expect(dots.length).toEqual(COLORS_PER_ROW);
  });

  it('shows green dots for correct guesses', () => {
    render(
      <GameContext.Provider
        value={{
          state: { ...mockState, feedback: [0, 2] },
          dispatch: mockDispatch,
        }}
      >
        <Feedback position={1} />
      </GameContext.Provider>
    );
    const dots = screen
      .getByTestId('feedback-container')
      .querySelectorAll('div');
    const greenDots = Array.from(dots).filter(dot =>
      dot.className.includes('bg-green-500')
    );
    expect(greenDots.length).toEqual(2);
  });

  it('shows all white dots when there are no correct guesses', () => {
    render(
      <GameContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <Feedback position={0} />
      </GameContext.Provider>
    );
    const dots = screen
      .getByTestId('feedback-container')
      .querySelectorAll('div');
    const greenDots = Array.from(dots).filter(dot =>
      dot.className.includes('bg-green-500')
    );
    expect(greenDots.length).toEqual(0);
  });

  it('shows all green dots when all guesses are correct', () => {
    render(
      <GameContext.Provider
        value={{
          state: { ...mockState, feedback: [4] },
          dispatch: mockDispatch,
        }}
      >
        <Feedback position={0} />
      </GameContext.Provider>
    );
    const dots = screen
      .getByTestId('feedback-container')
      .querySelectorAll('div');
    const greenDots = Array.from(dots).filter(dot =>
      dot.className.includes('bg-green-500')
    );
    expect(greenDots.length).toEqual(COLORS_PER_ROW);
  });
});
