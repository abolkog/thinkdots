import { render, screen, fireEvent } from '@testing-library/react';
import GuessRow from './GuessRow';
import { GameContext } from '@context/GameContext';
import { AppActions } from '@context/reducer';
import { COLORS_PER_ROW } from '@util/common';
import { mockState } from '@test/fixtures';

const mockDispatch = jest.fn();

function renderGuessRow(stateOverrides = {}, rowNumber = 1) {
  render(
    <GameContext.Provider value={{ state: { ...mockState, ...stateOverrides }, dispatch: mockDispatch }}>
      <GuessRow rowNumber={rowNumber} />
    </GameContext.Provider>
  );
}

describe('GuessRow', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders the correct number of Dot components', () => {
    renderGuessRow();
    expect(screen.getAllByRole('button').length).toBe(COLORS_PER_ROW);
  });

  it('dispatches SET_GUESS when a Dot is clicked', async () => {
    renderGuessRow({ guessNumber: 1 }, 1);

    const popOverButton = screen.getAllByRole('button')[0];
    fireEvent.click(popOverButton);

    const colorButtons = await screen.findAllByRole('button');

    // The first COLORS_PER_ROW buttons are the main Dots, the next are color buttons
    const colorButton = colorButtons[COLORS_PER_ROW];
    fireEvent.click(colorButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: AppActions.SET_GUESS,
        payload: expect.objectContaining({ position: 0, color: 'red' }),
      })
    );
  });
});
