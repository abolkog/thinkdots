import { useNavigate } from 'react-router';
import Button from '@components/ui/Button';
import RestartIcon from '@assets/icon-restart.svg';
import ExitIcon from '@assets/close-x.svg';
import { useGameContext } from '@hooks/useGameContext';
import Logo from '@components/ui/Logo';
import { AppActions } from '@context/reducer';
import { NUMBER_OF_ATTEMPTS } from '@util/common';

const SectionItem = ({ children }: { children: React.ReactNode }) => (
  <div className='flex items-center justify-center h-12'>{children}</div>
);
export default function Header() {
  const { state, dispatch } = useGameContext();
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
        message:
          'Are you sure you want to reset the game? All progress will be lost.',
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
      <section className='mb-10'>
        <SectionItem>
          <Logo />
        </SectionItem>
      </section>
      <section className='flex justify-between items-center mb-10 w-[95%] md:w-full'>
        <SectionItem>
          <div className='bg-black-500 pb-[0.2rem] rounded-[0.2rem]'>
            <div className='flex bg-black-300 rounded-[0.2rem] gap-2 py-[0.4rem] uppercase text-black-400  px-3 cursor-default'>
              <span className='block text-sm text-gray-400'>
                Guess #{state.guessNumber} out of {NUMBER_OF_ATTEMPTS}
              </span>
            </div>
          </div>
        </SectionItem>

        <SectionItem>
          <div className='rounded-md bg-gray-500 pb-1'>
            <Button
              onClick={handleResetClick}
              cssClass='bg-gray-400 rounded-md pb-2'
            >
              <img src={RestartIcon} alt='Restart Game' className='w-4' />
            </Button>
          </div>
          <div className='rounded-md bg-gray-500 pb-1 ml-5'>
            <Button
              onClick={handleExitClick}
              cssClass='bg-gray-400 rounded-md pb-2'
            >
              <img src={ExitIcon} alt='Exit Game' className='w-4' />
            </Button>
          </div>
        </SectionItem>
      </section>
    </>
  );
}
