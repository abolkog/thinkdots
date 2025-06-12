import { render, screen, fireEvent } from '@testing-library/react';
import { createRoutesStub } from 'react-router';

import CreateChallenge from './create';

type MockDotProps = {
  position: number;
  disabled?: boolean;
  onSetColor: (color: string) => void;
};

jest.mock('@components/game/Dot', () => (props: MockDotProps) => (
  <button
    data-testid={`dot-${props.position}`}
    disabled={props.disabled}
    onClick={() => props.onSetColor(`color${props.position}`)}
  >
    Dot {props.position}
  </button>
));

describe('CreateChallenge', () => {
  function renderWithRouter() {
    const Stub = createRoutesStub([
      {
        path: '/challenge/create',
        Component: CreateChallenge,
      },
    ]);
    render(<Stub initialEntries={['/challenge/create']} />);
  }

  beforeEach(jest.clearAllMocks);

  it('renders all UI elements', () => {
    renderWithRouter();
    expect(screen.getByText(/Create a Secret Code/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Pick your secret colors! Can your friend crack your code, or will they be left guessing forever?/i
      )
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Dot/)).toHaveLength(4);
    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter a message/i)).toBeInTheDocument();
    expect(screen.getByText(/Generate Challenge Link/i)).toBeInTheDocument();
  });

  it('disables the button if code is not valid', () => {
    renderWithRouter();
    const button = screen.getByText(/Generate Challenge Link/i);
    expect(button).toBeDisabled();
  });

  it('enables the button when all colors are set and unique', () => {
    renderWithRouter();
    for (let i = 0; i < 4; i++) {
      fireEvent.click(screen.getByTestId(`dot-${i}`));
    }
    const button = screen.getByText(/Generate Challenge Link/i);
    expect(button).not.toBeDisabled();
  });

  it('generates a link with code, name, and message', () => {
    renderWithRouter();

    for (let i = 0; i < 4; i++) {
      fireEvent.click(screen.getByTestId(`dot-${i}`));
    }

    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: 'Zool' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter a message/i), {
      target: { value: 'Good luck breaking my code!' },
    });

    fireEvent.click(screen.getByText(/Generate Challenge Link/i));

    expect(screen.getByText(/Share this link with your friend/i)).toBeInTheDocument();
    const linkDiv = screen.getByText((content) => content.includes('#/challenge/validate?'));
    expect(linkDiv).toBeInTheDocument();

    const url = linkDiv.textContent!;
    expect(url).toContain('code=');
    expect(url).toContain('name=');
    expect(url).toContain('message=');
  });

  it('generates a link with only code if name and message are empty', () => {
    renderWithRouter();
    for (let i = 0; i < 4; i++) {
      fireEvent.click(screen.getByTestId(`dot-${i}`));
    }
    fireEvent.click(screen.getByText(/Generate Challenge Link/i));
    const linkDiv = screen.getByText((content) => content.includes('#/challenge/validate?'));
    expect(linkDiv.textContent).toContain('code=');
    expect(linkDiv.textContent).not.toContain('name=');
    expect(linkDiv.textContent).not.toContain('message=');
  });

  it('does not generate link if code is not valid', () => {
    renderWithRouter();
    fireEvent.click(screen.getByTestId('dot-0'));
    fireEvent.click(screen.getByTestId('dot-1'));

    fireEvent.click(screen.getByText(/Generate Challenge Link/i));
    expect(screen.queryByText(/Share this link with your friend/i)).not.toBeInTheDocument();
  });
});
