import { render, screen, fireEvent } from '@testing-library/react';
import MuteToggle from './MuteToggle';
import { useSound } from '@hooks/useSound';

const mockedUseSound = useSound as jest.Mock;

describe('MuteToggle', () => {
  it('renders with initial checked state from isMuted()', () => {
    mockedUseSound.mockReturnValue({
      isMuted: () => true,
    });

    render(<MuteToggle />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
  });

  it('calls toggleBgMute when switch is clicked', () => {
    const toggleBgMuteMock = jest.fn();
    mockedUseSound.mockReturnValue({
      isMuted: () => false,
      toggleBgMute: toggleBgMuteMock,
    });

    render(<MuteToggle />);
    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);
    expect(toggleBgMuteMock).toHaveBeenCalled();
  });
});
