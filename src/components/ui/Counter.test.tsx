import { render, screen } from '@testing-library/react';
import Counter from './Counter';
import { useTimer } from '@hooks/userTimer';

jest.mock('@hooks/userTimer');

const mockedUseTimer = useTimer as jest.MockedFunction<typeof useTimer>;

const baseExpectedValue = {
  elapsed: 0,
  start: jest.fn(),
  stop: jest.fn(),
  reset: jest.fn(),
};

describe('Counter', () => {
  beforeEach(jest.clearAllMocks);

  it('renders formatted time correctly for 0 ms', () => {
    mockedUseTimer.mockReturnValue(baseExpectedValue);

    render(<Counter />);
    expect(screen.getByText('00:00:00.00')).toBeInTheDocument();
  });

  it('renders formatted time for 1 hour, 2 minutes, 3 seconds, 450 ms', () => {
    mockedUseTimer.mockReturnValue({
      ...baseExpectedValue,
      elapsed: 3723450,
    });

    render(<Counter />);
    expect(screen.getByText('01:02:03.45')).toBeInTheDocument();
  });

  it('updates when elapsed changes', () => {
    mockedUseTimer.mockReturnValue(baseExpectedValue);
    const { rerender } = render(<Counter />);
    expect(screen.getByText('00:00:00.00')).toBeInTheDocument();

    baseExpectedValue.elapsed = 12345;
    rerender(<Counter />);
    expect(screen.getByText('00:00:12.34')).toBeInTheDocument();
  });
});
