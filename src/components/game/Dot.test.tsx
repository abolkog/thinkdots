import { render, screen, fireEvent } from '@testing-library/react';
import Dot from '@components/game/Dot';
import { GameContext } from '@context/GameContext';
import { mockState } from '@test/fixtures';
import { COLORS } from '@util/common';

const mockDispatch = jest.fn();

function renderComponent({ position = 0, disabled = false } = {}) {
  return render(
    <GameContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
      <Dot position={position} disabled={disabled} />
    </GameContext.Provider>
  );
}

describe('Dot', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders a button', () => {
    renderComponent();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('disables the button if disabled is true', () => {
    renderComponent({ disabled: true });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows color panel when clicked and dispatches on color select', () => {
    renderComponent();

    const mainButton = screen.getByRole('button');
    fireEvent.click(mainButton);

    const colorButtons = screen.getAllByRole('button');

    // First button is the PopoverButton
    const colorButton = colorButtons[1];

    fireEvent.click(colorButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_GUESS',
      payload: {
        position: 0,
        color: COLORS[0],
      },
    });
  });
});
