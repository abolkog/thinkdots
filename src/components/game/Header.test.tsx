import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { useNavigate } from 'react-router';
import { AppActions } from '@context/reducer';
import { GameContext } from '@context/GameContext';
import { mockState } from '@test/fixtures';
import Modal from '@components/ui/Modal';

jest.mock('react-router');

jest.mock('@components/ui/Logo', () => () => <div data-testid="logo" />);
jest.mock('@components/ui/Counter', () => () => <div data-testid="counter" />);

jest.mock('@heroicons/react/24/solid', () => ({
  XMarkIcon: () => 'exit game',
  ArrowUturnLeftIcon: () => 'reset game',
}));

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

type RerenderWithStateProps = {
  rerender: (ui: React.ReactElement) => void;
  updatedState: typeof mockState;
};

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders logo', () => {
    render(
      <GameContext.Provider value={{ state: { ...mockState }, dispatch: mockDispatch }}>
        <Header />
      </GameContext.Provider>
    );
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('shows attempts count', () => {
    render(
      <GameContext.Provider value={{ state: { ...mockState, guessNumber: 2 }, dispatch: mockDispatch }}>
        <Header />
      </GameContext.Provider>
    );
    expect(screen.getByText(/Attempts:/)).toHaveTextContent('Attempts: 2/7');
  });

  it('shows win streak button when not custom challenge', () => {
    const { playerState } = mockState;
    render(
      <GameContext.Provider
        value={{ state: { ...mockState, playerState: { ...playerState, currentStreak: 3 } }, dispatch: mockDispatch }}
      >
        <Header />
      </GameContext.Provider>
    );
    expect(screen.getByText(/Win Streak:/)).toHaveTextContent('Win Streak: 3');
  });

  it('dispatches OPEN_SIDE_PANEL when win streak button clicked', () => {
    render(
      <GameContext.Provider value={{ state: { ...mockState }, dispatch: mockDispatch }}>
        <Header />
      </GameContext.Provider>
    );
    fireEvent.click(screen.getByText(/Win Streak:/));
    expect(mockDispatch).toHaveBeenCalledWith({ type: AppActions.OPEN_SIDE_PANEL });
  });

  it('shows Counter when isCustomChallenge is true', () => {
    render(
      <GameContext.Provider value={{ state: { ...mockState, isCustomChallenge: true }, dispatch: mockDispatch }}>
        <Header />
      </GameContext.Provider>
    );
    expect(screen.getByTestId('counter')).toBeInTheDocument();
  });

  it('shows challenger name when isCustomChallenge and challengerName are set', () => {
    render(
      <GameContext.Provider
        value={{ state: { ...mockState, isCustomChallenge: true, challengerName: 'Sami' }, dispatch: mockDispatch }}
      >
        <Header />
      </GameContext.Provider>
    );
    expect(screen.getByText(/Challenge from Sami/)).toBeInTheDocument();
  });

  describe('header action buttons', () => {
    function renderComponent() {
      const { rerender } = render(
        <GameContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
          <Header />
        </GameContext.Provider>
      );
      return { rerender };
    }

    function rerenderWithState({ rerender, updatedState }: RerenderWithStateProps) {
      return rerender(
        <GameContext.Provider value={{ state: updatedState, dispatch: mockDispatch }}>
          <Modal />
          <Header />
        </GameContext.Provider>
      );
    }

    function getUpdatedState() {
      const modalPayload = mockDispatch.mock.calls.find(([action]) => action.type === AppActions.TOGGLE_MODAL)[0]
        .payload;
      const updatedState = { ...mockState, sidePanelOpen: true, modal: { ...modalPayload } };
      return updatedState;
    }

    beforeEach(jest.clearAllMocks);

    it('dismiss modal when user click on No button', async () => {
      const { rerender } = renderComponent();
      const resetBtn = screen.getByRole('button', { name: /reset game/i });
      fireEvent.click(resetBtn);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: AppActions.TOGGLE_MODAL,
        payload: expect.objectContaining({
          title: 'Reset Game',
          message: 'Are you sure you want to reset the game?',
          isOpen: true,
        }),
      });

      rerenderWithState({ rerender, updatedState: getUpdatedState() });

      const confirmResetButton = await screen.findByRole('button', { name: /^no$/i });
      fireEvent.click(confirmResetButton);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: AppActions.TOGGLE_MODAL,
        payload: { isOpen: false },
      });
    });

    describe('reset button', () => {
      it('reset game on modal confirmation', async () => {
        const { rerender } = renderComponent();
        const resetBtn = screen.getByRole('button', { name: /reset game/i });
        fireEvent.click(resetBtn);

        expect(mockDispatch).toHaveBeenCalledWith({
          type: AppActions.TOGGLE_MODAL,
          payload: expect.objectContaining({
            title: 'Reset Game',
            message: 'Are you sure you want to reset the game?',
            isOpen: true,
          }),
        });

        rerenderWithState({ rerender, updatedState: getUpdatedState() });

        const confirmResetButton = await screen.findByRole('button', { name: /^yes$/i });
        fireEvent.click(confirmResetButton);

        expect(mockDispatch).toHaveBeenCalledWith({
          type: AppActions.RESET_GAME,
          payload: { isOpen: false },
        });
      });
    });

    describe('exit button', () => {
      it('exit game on modal confirmation', async () => {
        const { rerender } = renderComponent();
        const exitButton = screen.getByRole('button', { name: /exit game/i });
        fireEvent.click(exitButton);

        expect(mockDispatch).toHaveBeenCalledWith({
          type: AppActions.TOGGLE_MODAL,
          payload: expect.objectContaining({
            title: 'Exit Game',
            message: 'Are you sure you want to exit the game? All progress will be lost.',
            isOpen: true,
          }),
        });

        rerenderWithState({ rerender, updatedState: getUpdatedState() });

        const confirmResetButton = await screen.findByRole('button', { name: /^yes$/i });
        fireEvent.click(confirmResetButton);

        expect(mockDispatch).toHaveBeenCalledWith({
          type: AppActions.RESET_GAME,
          payload: { isOpen: false },
        });

        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });
  });
});
