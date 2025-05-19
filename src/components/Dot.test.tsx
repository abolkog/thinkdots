import { render, screen, fireEvent } from '@testing-library/react';
import Dot from './Dot';
import { GameContext } from '../context/GameContext';
import { COLORS } from '../util/gameUtil';
import { mockState } from '../../test/fixtures';

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
        <Dot position={0} />
      </GameContext.Provider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('cycles through colors on click and dispatches SET_GUESS', () => {
    render(
      <GameContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <Dot position={1} />
      </GameContext.Provider>
    );
    const button = screen.getByRole('button');
    COLORS.forEach(color => {
      fireEvent.click(button);
      expect(mockDispatch).toHaveBeenLastCalledWith({
        type: 'SET_GUESS',
        payload: { position: 1, color },
      });
      expect(button.className).toContain(`bg-${color}-500`);
    });
  });
});
