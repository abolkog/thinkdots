import { render } from '@testing-library/react';
import { GameContext } from '@context/GameContext';
import StateListener from './StateListener';
import { mockState } from '@test/fixtures';
import { AppActions } from '@context/reducer';

const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('StateListener', () => {
  const mockDispatch = jest.fn();

  beforeEach(jest.clearAllMocks);

  it('renders without crashing', () => {
    const { container } = render(
      <GameContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <StateListener />
      </GameContext.Provider>
    );

    expect(container).toBeInTheDocument();
  });

  it('show congratulation modal when user guess correctly', () => {
    render(
      <GameContext.Provider
        value={{
          state: { ...mockState, isGameOver: true },
          dispatch: mockDispatch,
        }}
      >
        <StateListener />
      </GameContext.Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      type: AppActions.TOGGLE_MODAL,
      payload: expect.objectContaining({
        isOpen: true,
        title: 'Congratulations!',
      }),
    });
  });

  it('show modal when all attempts are used', () => {
    render(
      <GameContext.Provider
        value={{
          state: { ...mockState, guessNumber: 8 },
          dispatch: mockDispatch,
        }}
      >
        <StateListener />
      </GameContext.Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      type: AppActions.TOGGLE_MODAL,
      payload: expect.objectContaining({
        isOpen: true,
        title: 'Game Over',
      }),
    });
  });
});
