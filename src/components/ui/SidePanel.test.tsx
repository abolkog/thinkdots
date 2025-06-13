import { render, screen, act, fireEvent } from '@testing-library/react';
import SidePanel from '@components/ui/SidePanel';
import { GameContext } from '@context/GameContext';

import { mockState } from '@test/fixtures';
import { AppActions } from '@context/reducer';
import Modal from './Modal';

const mockDispatch = jest.fn();

jest.mock('@components/ui/Badge', () => ({
  __esModule: true,
  default: () => <div>achievement badge</div>,
}));

describe('SidePanel', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders statistics when open', async () => {
    await act(async () => {
      render(
        <GameContext.Provider value={{ state: { ...mockState, sidePanelOpen: true }, dispatch: mockDispatch }}>
          <SidePanel />
        </GameContext.Provider>
      );
    });
    expect(screen.getByText('Your Statistics')).toBeInTheDocument();
    expect(screen.getByText('Total Games Played')).toBeInTheDocument();
    expect(screen.getByText('Wins')).toBeInTheDocument();
    expect(screen.getByText('Losses')).toBeInTheDocument();
    expect(screen.getByText('Current Win Streak')).toBeInTheDocument();
    expect(screen.getByText('Longest Wining Streak')).toBeInTheDocument();
    expect(screen.getByText('Fastest Solve')).toBeInTheDocument();
    expect(screen.getByText('Fewest Guesses')).toBeInTheDocument();
  });

  it('does not renders statistics when open', async () => {
    await act(async () => {
      render(
        <GameContext.Provider value={{ state: { ...mockState, sidePanelOpen: false }, dispatch: mockDispatch }}>
          <SidePanel />
        </GameContext.Provider>
      );
    });
    expect(screen.queryByText('Your Statistics')).not.toBeInTheDocument();
  });

  it('dispatch close action when close button is click', async () => {
    await act(async () => {
      render(
        <GameContext.Provider value={{ state: { ...mockState, sidePanelOpen: true }, dispatch: mockDispatch }}>
          <SidePanel />
        </GameContext.Provider>
      );
    });

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AppActions.CLOSE_SIDE_PANEL,
    });
  });

  it('dispatch TOGGLE_MODAL action when reset button is click', async () => {
    await act(async () => {
      render(
        <GameContext.Provider value={{ state: { ...mockState, sidePanelOpen: true }, dispatch: mockDispatch }}>
          <SidePanel />
        </GameContext.Provider>
      );
    });

    const closeButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(closeButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AppActions.TOGGLE_MODAL,
      payload: {
        isOpen: true,
        title: 'Reset Progress',
        message:
          'This will reset your game progress, including all statistics and achievements. This action cannot be undone.',
        yesButtonText: 'Reset',
        noButtonText: 'Cancel',
        yesButtonOnClick: expect.any(Function),
        noButtonOnClick: expect.any(Function),
      },
    });
  });

  it('calls RESET_PLAYER_STATE and closes modal when confirming reset', async () => {
    render(
      <GameContext.Provider value={{ state: { ...mockState, sidePanelOpen: true }, dispatch: mockDispatch }}>
        <Modal />
        <SidePanel />
      </GameContext.Provider>
    );

    const resetButton = screen.getByRole('button', { name: /reset my progress/i });
    fireEvent.click(resetButton);

    const modalPayload = mockDispatch.mock.calls.find(([action]) => action.type === AppActions.TOGGLE_MODAL)[0].payload;

    render(
      <GameContext.Provider
        value={{ state: { ...mockState, sidePanelOpen: true, modal: { ...modalPayload } }, dispatch: mockDispatch }}
      >
        <Modal />
        <SidePanel />
      </GameContext.Provider>
    );

    const confirmResetButton = await screen.findByRole('button', { name: /^reset$/i });
    fireEvent.click(confirmResetButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: AppActions.RESET_PLAYER_STATE });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AppActions.TOGGLE_MODAL,
      payload: { isOpen: false },
    });
  });

  it('render achievements badges', async () => {
    const { playerState } = mockState;
    await act(async () => {
      render(
        <GameContext.Provider
          value={{
            state: {
              ...mockState,
              sidePanelOpen: true,
              playerState: {
                ...playerState,
                totalGames: 10,
                wins: 5,
              },
            },
            dispatch: mockDispatch,
          }}
        >
          <SidePanel />
        </GameContext.Provider>
      );
    });

    const badges = screen.getAllByText(/achievement badge/i);
    expect(badges.length).toBeGreaterThan(0);
  });
});
