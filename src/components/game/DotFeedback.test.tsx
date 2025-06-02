import { render } from '@testing-library/react';
import { GameContext } from '@context/GameContext';
import { GUESS_STATUS } from '@util/common';
import DotFeedback from './DotFeedback';
import { mockState } from '@test/fixtures';

const mockDispatch = jest.fn();

describe('DotFeedback', () => {
  const baseProps = {
    rowNumber: 0,
    hidden: false,
  };

  it('does not render when hidden', () => {
    const { queryByTestId } = render(
      <GameContext.Provider
        value={{ state: mockState, dispatch: mockDispatch }}
      >
        <DotFeedback position={0} {...baseProps} hidden={true} />
      </GameContext.Provider>
    );

    expect(queryByTestId('dotFeedback-0')).toBeNull();
  });

  it('should render correctly with correct feedback', () => {
    const { getByTestId } = render(
      <GameContext.Provider
        value={{
          state: {
            ...mockState,
            feedback: [
              [GUESS_STATUS.CORRECT, GUESS_STATUS.ABSENT, GUESS_STATUS.PRESENT],
            ],
          },
          dispatch: mockDispatch,
        }}
      >
        <DotFeedback position={0} {...baseProps} />
        <DotFeedback position={1} {...baseProps} />
        <DotFeedback position={2} {...baseProps} />
      </GameContext.Provider>
    );

    const dot0 = getByTestId('dotFeedback-0');
    expect(dot0).toHaveClass('bg-green-500');

    const dot1 = getByTestId('dotFeedback-1');
    expect(dot1).toHaveClass('bg-gray-500');

    const dot2 = getByTestId('dotFeedback-2');
    expect(dot2).toHaveClass('bg-white');
  });
});
