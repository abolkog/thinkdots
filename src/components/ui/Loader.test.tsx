import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('renders children when not active', () => {
    render(
      <Loader>
        <div>Test Content</div>
      </Loader>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders loader when active', () => {
    render(
      <Loader active>
        <div>Test Content</div>
      </Loader>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('renders children when active is false explicitly', () => {
    render(
      <Loader active={false}>
        <span>Child</span>
      </Loader>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders correct number of bouncing dots when active', () => {
    render(<Loader active />);
    const dots = document.querySelectorAll('.animate-bounce');
    expect(dots.length).toBe(3);
  });
});
