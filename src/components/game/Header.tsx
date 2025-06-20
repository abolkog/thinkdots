import { useNavigate } from 'react-router';
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';

import Button from '@components/ui/Button';
import { useGameContext } from '@hooks/useGameContext';
import Logo from '@components/ui/Logo';
import { AppActions } from '@context/reducer';
import { NUMBER_OF_ATTEMPTS } from '@util/common';
import Counter from '@components/ui/Counter';

const SectionItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center h-12">{children}</div>
);
export default function Header() {
  const { state, dispatch } = useGameContext();
  const { playerState, isCustomChallenge, challengerName } = state;

  const navigate = useNavigate();

  const dismissModal = () => {
    dispatch({
      type: AppActions.TOGGLE_MODAL,
      payload: {
        isOpen: false,
      },
    });
  };

  const handleConfirmationButton = (isExit: boolean) => {
    dispatch({
      type: AppActions.RESET_GAME,
      payload: {
        isOpen: false,
      },
    });

    if (isExit) navigate('/');
  };

  const handleButtonClick = (isExit = false) => {
    const title = isExit ? 'Exit Game' : 'Reset Game';
    const message = isExit
      ? 'Are you sure you want to exit the game? All progress will be lost.'
      : 'Are you sure you want to reset the game?';

    dispatch({
      type: AppActions.TOGGLE_MODAL,
      payload: {
        title,
        message,
        yesButtonText: 'Yes',
        noButtonText: 'No',
        yesButtonOnClick: () => handleConfirmationButton(isExit),
        noButtonOnClick: () => dismissModal(),
        isOpen: true,
      },
    });
  };

  return (
    <>
      <section className="mb-10">
        <SectionItem>
          <Logo />
        </SectionItem>
        {isCustomChallenge && challengerName && (
          <SectionItem>
            <span className="text-yellow-500 font-semibold text-lg">Challenge from {challengerName}</span>
          </SectionItem>
        )}
      </section>
      <section className="flex justify-between items-center mb-10 w-[95%] md:w-full">
        <SectionItem>
          <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-s font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20 ">
            Attempts: {state.guessNumber}/{NUMBER_OF_ATTEMPTS}
          </span>
        </SectionItem>

        <SectionItem>
          {isCustomChallenge ? (
            <Counter />
          ) : (
            <button
              onClick={() => dispatch({ type: AppActions.OPEN_SIDE_PANEL })}
              className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-s font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20 cursor-pointer"
            >
              Win Streak: {playerState.currentStreak}
            </button>
          )}
        </SectionItem>

        <SectionItem>
          <div className="rounded-md bg-gray-500 pb-1">
            <Button onClick={() => handleButtonClick()} cssClass="bg-gray-400 rounded-md pb-2">
              <ArrowUturnLeftIcon className="w-4" />
            </Button>
          </div>
          <div className="rounded-md bg-gray-500 pb-1 ml-5">
            <Button onClick={() => handleButtonClick(true)} cssClass="bg-gray-400 rounded-md pb-2">
              <XMarkIcon className="w-4" />
            </Button>
          </div>
        </SectionItem>
      </section>
    </>
  );
}
