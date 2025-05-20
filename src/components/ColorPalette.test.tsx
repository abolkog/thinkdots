import { render, screen } from '@testing-library/react';
import { GameContext } from '../context/GameContext';
import ColorPalette from './ColorPalette';
import { mockState } from '../../test/fixtures';

const dispatch = jest.fn();
describe('ColorPalette', () => {
  it('renders a button for each color in the secret', () => {
    render(
      <GameContext.Provider value={{ state: mockState, dispatch }}>
        <ColorPalette />
      </GameContext.Provider>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(mockState.secret.length);
  });

  it('renders buttons with correct color classes', () => {
    render(
      <GameContext.Provider value={{ state: mockState, dispatch }}>
        <ColorPalette />
      </GameContext.Provider>
    );
    mockState.secret.forEach(color => {
      const colorClass = `bg-${color}-500`;
      const found = screen
        .getAllByRole('button')
        .some(btn => btn.className.includes(colorClass));
      expect(found).toEqual(true);
    });
  });
});
