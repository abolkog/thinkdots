import { render, screen, act } from '@testing-library/react';
import Counter from './Counter';

jest.useFakeTimers();

describe('Counter', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('renders with initial time 00:00:00.00', () => {
    render(<Counter />);
    expect(screen.getByText(/00:00:00\.\d{2}/)).toBeInTheDocument();
  });

  it('updates elapsed time every 50ms', () => {
    render(<Counter />);

    expect(screen.getByText(/00:00:00\.\d{2}/)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/00:00:01\.\d{2}/)).toBeInTheDocument();
  });

  it('formats time correctly for minutes and hours', () => {
    render(<Counter />);

    act(() => {
      jest.advanceTimersByTime(1 * 3600 * 1000 + 2 * 60 * 1000 + 3 * 1000 + 450);
    });
    expect(screen.getByText(/01:02:03\.45/)).toBeInTheDocument();
  });

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = render(<Counter />);
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
