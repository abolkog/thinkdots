import { render, screen, fireEvent } from '@testing-library/react';
import Dot from '@components/game/Dot';
import { GameContext } from '@context/GameContext';
import { mockState } from '@test/fixtures';
import { COLORS } from '@util/common';

const mockDispatch = jest.fn();

describe('Dot', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders a button', () => {
    render(
      <GameContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <Dot position={0} disabled={false} />
      </GameContext.Provider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('cycles through colors on click and dispatches SET_GUESS', () => {
    render(
      <GameContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <Dot position={1} disabled={false} />
      </GameContext.Provider>
    );
    const button = screen.getByRole('button');
    COLORS.forEach((color) => {
      fireEvent.click(button);
      expect(mockDispatch).toHaveBeenLastCalledWith({
        type: 'SET_GUESS',
        payload: { position: 1, color },
      });
      expect(button.className).toContain(`bg-${color}-500`);
    });
  });
});
