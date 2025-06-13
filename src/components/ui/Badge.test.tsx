import { render, screen } from '@testing-library/react';
import Badge from './Badge';

jest.mock('@heroicons/react/24/solid', () => ({
  TrophyIcon: (props: object) => <svg data-testid="trophy-icon" {...props} />,
}));

describe('Badge', () => {
  it('renders title and description', () => {
    render(<Badge title="Champion" description="Win the game" />);
    expect(screen.getByText('Champion')).toBeInTheDocument();
    expect(screen.getByText('Win the game')).toBeInTheDocument();
  });

  it('renders with inactive styles by default', () => {
    const { container } = render(<Badge title="Inactive" description="Not active" />);
    const badge = container.querySelector('div');
    expect(badge).toHaveClass('bg-gray-800');
    const icon = screen.getByTestId('trophy-icon');
    expect(icon).toHaveClass('text-gray-500');
  });

  it('renders with active styles when active is true', () => {
    const { container } = render(<Badge title="Active" description="Is active" active />);
    const badge = container.querySelector('div');
    expect(badge).toHaveClass('bg-yellow-100/10');
    const icon = screen.getByTestId('trophy-icon');
    expect(icon).toHaveClass('text-yellow-500');
  });
});
