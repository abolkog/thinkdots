import { render, screen } from '@testing-library/react';
import GameBoard from '@components/game/GameBoard';
import { GameContext } from '@context/GameContext';
import { mockState } from '@test/fixtures';
import { NUMBER_OF_ATTEMPTS } from '@util/common';

describe('GameBoard', () => {
  it('renders correct number of row ', () => {
    render(
      <GameContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <GameBoard />
      </GameContext.Provider>
    );

    const gameBoard = screen.getByTestId('gameBoard');
    expect(gameBoard.children.length).toEqual(NUMBER_OF_ATTEMPTS);
  });
});
