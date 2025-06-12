import { render, screen, fireEvent } from '@testing-library/react';
import Dot from '@components/game/Dot';
import { GameContext } from '@context/GameContext';
import { mockState } from '@test/fixtures';
import { COLORS } from '@util/common';

const onSetColorMock = jest.fn();

function renderComponent({ position = 0, disabled = false } = {}) {
  return render(
    <GameContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
      <Dot position={position} disabled={disabled} onSetColor={onSetColorMock} />
    </GameContext.Provider>
  );
}

describe('Dot', () => {
  beforeEach(() => {
    onSetColorMock.mockClear();
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

  it('shows color panel when clicked and invoke onSetColorMock', () => {
    renderComponent();

    const mainButton = screen.getByRole('button');
    fireEvent.click(mainButton);

    const colorButtons = screen.getAllByRole('button');

    // First button is the PopoverButton
    const colorButton = colorButtons[1];

    fireEvent.click(colorButton);

    expect(onSetColorMock).toHaveBeenCalledWith(COLORS[0], 0);
  });
});
