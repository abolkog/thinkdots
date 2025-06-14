import { useContext } from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { TimerProvider } from './TimerProvider';
import { TimerContext } from './TimerContext';

jest.useFakeTimers();

function TestComponent() {
  const { elapsed, start, stop, reset } = useContext(TimerContext);
  return (
    <div>
      <span data-testid="elapsed">{elapsed}</span>
      <button onClick={start}>start</button>
      <button onClick={stop}>stop</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

describe('TimerProvider', () => {
  it('should provide initial elapsed as 0', () => {
    const { getByTestId } = render(
      <TimerProvider>
        <TestComponent />
      </TimerProvider>
    );
    expect(getByTestId('elapsed').textContent).toBe('0');
  });

  it('should start timer and update elapsed', () => {
    const { getByText, getByTestId } = render(
      <TimerProvider>
        <TestComponent />
      </TimerProvider>
    );

    act(() => {
      const startButton = getByText('start');
      fireEvent.click(startButton);
      jest.advanceTimersByTime(150);
    });
    expect(Number(getByTestId('elapsed').textContent)).toBeGreaterThanOrEqual(100);
  });

  it('should stop timer and not update elapsed further', () => {
    const { getByText, getByTestId } = render(
      <TimerProvider>
        <TestComponent />
      </TimerProvider>
    );
    act(() => {
      const startButton = getByText('start');
      fireEvent.click(startButton);
      jest.advanceTimersByTime(100);

      const stopButton = getByText('stop');
      fireEvent.click(stopButton);

      const elapsed = Number(getByTestId('elapsed').textContent);
      jest.advanceTimersByTime(200);
      expect(getByTestId('elapsed').textContent).toBe(elapsed.toString());
    });
  });

  it('should reset timer to 0', () => {
    const { getByText, getByTestId } = render(
      <TimerProvider>
        <TestComponent />
      </TimerProvider>
    );
    act(() => {
      const startButton = getByText('start');
      fireEvent.click(startButton);
      jest.advanceTimersByTime(100);

      const resetButton = getByText('reset');
      fireEvent.click(resetButton);
    });
    expect(getByTestId('elapsed').textContent).toBe('0');
  });

  it('should not start multiple intervals if start is called repeatedly', () => {
    const { getByText, getByTestId } = render(
      <TimerProvider>
        <TestComponent />
      </TimerProvider>
    );
    act(() => {
      const startButton = getByText('start');
      fireEvent.click(startButton);

      jest.advanceTimersByTime(100);

      fireEvent.click(startButton);
      jest.advanceTimersByTime(100);
    });

    expect(Number(getByTestId('elapsed').textContent)).toBeGreaterThanOrEqual(150);
    expect(Number(getByTestId('elapsed').textContent)).toBeLessThan(250);
  });
});
