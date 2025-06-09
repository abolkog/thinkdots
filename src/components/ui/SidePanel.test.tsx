import { render, screen, act, fireEvent } from '@testing-library/react';
import SidePanel from '@components/ui/SidePanel';
import { GameContext } from '@context/GameContext';

import { mockState } from '@test/fixtures';
import { AppActions } from '@context/reducer';

const mockDispatch = jest.fn();

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

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: AppActions.CLOSE_SIDE_PANEL,
    });
  });
});
