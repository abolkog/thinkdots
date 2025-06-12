import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useGameContext } from '@hooks/useGameContext';
import { validateCode } from '@util/gameUtil';
import { AppActions } from '@context/reducer';
import Loader from '@components/ui/Loader';

export default function ValidateChallenge() {
  const { dispatch } = useGameContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encodedCode = params.get('code');
    if (!encodedCode) {
      navigate('/');
      return;
    }

    const codeFromParam = atob(encodedCode);
    const { isValid, code } = validateCode(codeFromParam);
    if (!isValid) {
      navigate('/');
      return;
    }

    const challengerName = params.get('name') ? atob(params.get('name')!) : '';
    const challengeMessage = params.get('message') ? atob(params.get('message')!) : '';

    dispatch({
      type: AppActions.SET_CUSTOM_CHALLENGE,
      payload: {
        secret: code,
        challengerName,
        challengeMessage,
      },
    });

    navigate('/game');
  }, [navigate, dispatch, location.search]);

  return (
    <section className="w-full sm:w-[60%] lg:w-[90%] flex flex-col justify-center items-center">
      <p className="text-2xl font-semibold text-blue-400">Validating data, please wait</p>
      <p className="text-lg">You will be redirected when done</p>
      <Loader active={true} />
    </section>
  );
}
