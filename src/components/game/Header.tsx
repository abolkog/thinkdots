import { useNavigate } from 'react-router';
import { ArrowUturnLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';

import Button from '@components/ui/Button';
import { useGameContext } from '@hooks/useGameContext';
import Logo from '@components/ui/Logo';
import { AppActions } from '@context/reducer';
import { NUMBER_OF_ATTEMPTS } from '@util/common';

const SectionItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center h-12">{children}</div>
);
export default function Header() {
  const { state, dispatch } = useGameContext();
  const { playerState } = state;

  const navigate = useNavigate();

  const dismissModal = () => {
    dispatch({
      type: AppActions.TOGGLE_MODAL,
      payload: {
        isOpen: false,
      },
    });
  };

  const resetGame = () => {
    dispatch({
      type: AppActions.RESET_GAME,
      payload: {
        isOpen: false,
      },
    });
  };

  const exitGame = () => {
    resetGame();
    navigate('/');
  };

  const handleResetClick = () => {
    dispatch({
      type: AppActions.TOGGLE_MODAL,
      payload: {
        title: 'Reset Game',
        message: 'Are you sure you want to reset the game?',
        yesButtonText: 'Yes',
        noButtonText: 'No',
        yesButtonOnClick: () => resetGame(),
        noButtonOnClick: () => dismissModal(),
        isOpen: true,
      },
    });
  };

  const handleExitClick = () => {
    dispatch({
      type: AppActions.TOGGLE_MODAL,
      payload: {
        title: 'Exit Game',
        message: 'Are you sure you want to reset the game? All progress will be lost.',
        yesButtonText: 'Yes',
        noButtonText: 'No',
        yesButtonOnClick: () => exitGame(),
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
      </section>
      <section className="flex justify-between items-center mb-10 w-[95%] md:w-full">
        <SectionItem>
          <span className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-s font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20 ">
            Attempts: {state.guessNumber}/{NUMBER_OF_ATTEMPTS}
          </span>
        </SectionItem>

        <SectionItem>
          <button
            onClick={() => dispatch({ type: AppActions.OPEN_SIDE_PANEL })}
            className="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-s font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20 cursor-pointer"
          >
            Win Streak: {playerState.currentStreak}
          </button>
        </SectionItem>
        <SectionItem>
          <div className="rounded-md bg-gray-500 pb-1">
            <Button onClick={handleResetClick} cssClass="bg-gray-400 rounded-md pb-2">
              <ArrowUturnLeftIcon className="w-4" />
            </Button>
          </div>
          <div className="rounded-md bg-gray-500 pb-1 ml-5">
            <Button onClick={handleExitClick} cssClass="bg-gray-400 rounded-md pb-2">
              <XMarkIcon className="w-4" />
            </Button>
          </div>
        </SectionItem>
      </section>
    </>
  );
}
