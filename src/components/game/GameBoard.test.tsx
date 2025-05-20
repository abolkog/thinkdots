import { render, screen } from '@testing-library/react';
import GameBoard from '@components/game/GameBoard';
import { GameContext } from '@context/GameContext';
import { mockState } from '@test/fixtures';

describe('GameBoard', () => {
  it('renders a row for each guess', () => {
    render(
      <GameContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <GameBoard />
      </GameContext.Provider>
    );

    const gameBoard = screen.getByTestId('gameBoard');
    expect(gameBoard.children.length).toEqual(mockState.guessNumber);
  });

  it('renders the correct colors for each guess', () => {
    render(
      <GameContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <GameBoard />
      </GameContext.Provider>
    );
    mockState.guesses.forEach(color => {
      if (color) {
        expect(screen.getAllByTestId(`dot-${color}`).length).toBeGreaterThan(0);
      }
    });
  });

  it('renders feedback for each row', () => {
    render(
      <GameContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
        <GameBoard />
      </GameContext.Provider>
    );
    mockState.feedback.forEach((_, idx) => {
      expect(screen.getByTestId(`feedback-${idx}`)).toBeInTheDocument();
    });
  });

  //   it('shows game over message if isGameOver is true', () => {
  //     render(
  //       <GameContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
  //         <GameBoard />
  //       </GameContext.Provider>
  //     );
  //     expect(screen.getByText(/game over/i)).toBeInTheDocument();
  //   });
});
