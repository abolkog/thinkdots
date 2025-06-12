import { render } from '@testing-library/react';
import Divider from './Divider';

describe('Divider', () => {
  it('renders without crashing', () => {
    const { container } = render(<Divider label="OR" />);
    expect(container).toBeInTheDocument();
  });

  it('displays the correct label', () => {
    const { getByText } = render(<Divider label="AND" />);
    expect(getByText('AND')).toBeInTheDocument();
  });

  it('has the correct styles', () => {
    const { getByText } = render(<Divider label="OR" />);
    const labelElement = getByText('OR');
    expect(labelElement).toHaveClass('bg-gray-400', 'px-2', 'text-sm', 'font-semibold', 'text-black');
  });
});
