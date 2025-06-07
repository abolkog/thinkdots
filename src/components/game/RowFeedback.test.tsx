import { render, screen } from '@testing-library/react';
import RowFeedback from '@components/game/RowFeedback';
import { GameContext } from '@context/GameContext';
import { COLORS_PER_ROW } from '@util/common';
import { mockState } from '@test/fixtures';

const mockDispatch = jest.fn();

describe('RowFeedback', () => {
  const baseProps = {
    rowNumber: 0,
    hidden: false,
  };

  it('renders the correct number of feedback dots', () => {
    render(
      <GameContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <RowFeedback {...baseProps} />
      </GameContext.Provider>
    );
    const dots = screen.getAllByRole('presentation');
    expect(dots.length).toEqual(COLORS_PER_ROW);
  });

  it('does renders when no feedback', () => {
    render(
      <GameContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <RowFeedback {...baseProps} rowNumber={1} />
      </GameContext.Provider>
    );
    expect(screen.queryByText('presentation')).not.toBeInTheDocument();
  });

  it('shows green dots for correct guesses', () => {
    render(
      <GameContext.Provider
        value={{
          state: mockState,
          dispatch: mockDispatch,
        }}
      >
        <RowFeedback {...baseProps} />
      </GameContext.Provider>
    );
    const dots = screen.getByTestId('feedback-container').querySelectorAll('div');
    const greenDots = Array.from(dots).filter((dot) => dot.className.includes('bg-green-500'));
    expect(greenDots.length).toEqual(2);
  });

  it('show feedback colors correctly', () => {
    render(
      <GameContext.Provider
        value={{
          state: { ...mockState, feedback: { 0: [1, 0, 0, -1] } },
          dispatch: mockDispatch,
        }}
      >
        <RowFeedback {...baseProps} />
      </GameContext.Provider>
    );
    const dots = screen.getByTestId('feedback-container').querySelectorAll('div');
    const dotsArray = Array.from(dots);

    const greenDots = dotsArray.filter((dot) => dot.className.includes('bg-green-500'));
    expect(greenDots.length).toEqual(1);

    const whiteDots = dotsArray.filter((dot) => dot.className.includes('bg-white'));
    expect(whiteDots.length).toEqual(2);

    const grayDots = dotsArray.filter((dot) => dot.className.includes('bg-gray-500'));
    expect(grayDots.length).toEqual(1);
  });

  it('shows all green dots when all guesses are correct', () => {
    render(
      <GameContext.Provider
        value={{
          state: { ...mockState, feedback: { 0: [1, 1, 1, 1] } },
          dispatch: mockDispatch,
        }}
      >
        <RowFeedback {...baseProps} />
      </GameContext.Provider>
    );
    const dots = screen.getByTestId('feedback-container').querySelectorAll('div');
    const greenDots = Array.from(dots).filter((dot) => dot.className.includes('bg-green-500'));
    expect(greenDots.length).toEqual(COLORS_PER_ROW);
  });
});
