import { render, screen, waitFor } from '@testing-library/react';
import ValidateChallenge from './validate';
import { useLocation, useNavigate } from 'react-router';

import { validateCode } from '@util/gameUtil';
import { GameContext } from '@context/GameContext';
import { mockState } from '@test/fixtures';

jest.mock('react-router');

jest.mock('@util/gameUtil');

jest.mock('@components/ui/Loader', () => () => <div data-testid="loader" />);

const mockedUseLocation = useLocation as jest.Mock;
const mockedValidateCode = validateCode as jest.Mock;
const mockedUseNavigate = jest.fn();

describe('ValidateChallenge', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockedUseNavigate);
  });

  function setupSearch(search: string) {
    mockedUseLocation.mockReturnValue({ search });
  }

  function renderComponent() {
    return render(
      <GameContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
        <ValidateChallenge />
      </GameContext.Provider>
    );
  }

  it('renders loader and validation message', () => {
    setupSearch('?code=Zm9v');
    mockedValidateCode.mockReturnValue({ isValid: true, code: 'foo' });

    renderComponent();
    expect(screen.getByText(/Validating data, please wait/i)).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('redirects to home if code param is missing', async () => {
    setupSearch('');
    renderComponent();
    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('redirects to home if code is invalid', async () => {
    setupSearch('?code=Zm9v');
    mockedValidateCode.mockReturnValue({ isValid: false, code: '' });

    renderComponent();
    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('dispatches SET_CUSTOM_CHALLENGE and navigates to /game on valid code', async () => {
    const code = btoa('secretCode');
    const name = btoa('Its Me');
    const message = btoa('Good luck!');
    setupSearch(`?code=${code}&name=${name}&message=${message}`);
    mockedValidateCode.mockReturnValue({ isValid: true, code: 'secretCode' });

    renderComponent();
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: expect.any(String),
        payload: {
          secret: 'secretCode',
          challengerName: 'Its Me',
          challengeMessage: 'Good luck!',
        },
      });
      expect(mockedUseNavigate).toHaveBeenCalledWith('/game');
    });
  });

  it('handles missing name and message gracefully', async () => {
    const code = btoa('secretCode');
    setupSearch(`?code=${code}`);
    mockedValidateCode.mockReturnValue({ isValid: true, code: 'secretCode' });

    renderComponent();
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            challengerName: '',
            challengeMessage: '',
          }),
        })
      );
      expect(mockedUseNavigate).toHaveBeenCalledWith('/game');
    });
  });
});
