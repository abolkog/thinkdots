import { fireEvent, render, screen } from '@testing-library/react';
import DifficultySelector from './DifficultySelector';
import { mockState } from '@test/fixtures';
import { GameContext } from '@context/GameContext';
import { AppActions } from '@context/reducer';

const mockDispatch = jest.fn();

describe('DifficultySelector', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <GameContext.Provider value={{ state: { ...mockState, isEasyMode: false }, dispatch: mockDispatch }}>
        <DifficultySelector />
      </GameContext.Provider>
    );

    expect(screen.getByTestId('difficulty-selector')).toBeInTheDocument();
  });

  it('toggles difficulty on button click', () => {
    render(
      <GameContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <DifficultySelector />
      </GameContext.Provider>
    );

    const proButton = screen.getByRole('button', { name: /pro/i });
    fireEvent.click(proButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AppActions.SET_DIFFICULTY,
      payload: { isEasyMode: false },
    });

    const easyButton = screen.getByRole('button', { name: /easy/i });
    fireEvent.click(easyButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AppActions.SET_DIFFICULTY,
      payload: { isEasyMode: true },
    });
  });

  it('applies active class to selected difficulty', () => {
    render(
      <GameContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <DifficultySelector />
      </GameContext.Provider>
    );
    const easyButton = screen.getByRole('button', { name: /easy/i });
    const proButton = screen.getByRole('button', { name: /pro/i });

    expect(easyButton).toHaveClass('bg-gray-400');
    expect(proButton).not.toHaveClass('bg-gray-400');
  });
});
