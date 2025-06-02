import Button from '@components/ui/Button';
import RestartIcon from '@assets/icon-restart.svg';
import { useGameContext } from '@hooks/useGameContext';
import Logo from '@components/ui/Logo';
import { AppActions } from '@context/reducer';

const SectionItem = ({ children }: { children: React.ReactNode }) => (
  <div className='flex items-center justify-center w-32 h-12'>{children}</div>
);
export default function Header() {
  const { state, dispatch } = useGameContext();

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

  return (
    <section className='flex justify-between items-center mb-10 w-[95%] md:w-full'>
      <SectionItem>
        <Logo />
      </SectionItem>

      <SectionItem>
        <div className='bg-black-500 pb-[0.2rem] rounded-[0.2rem]'>
          <div className='flex bg-black-300 rounded-[0.2rem] gap-2 py-[0.4rem] uppercase text-black-400  px-3 cursor-default'>
            <span className='block text-sm text-gray-400'>
              Guess #{state.guessNumber}
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
            <img src={RestartIcon} alt='' className='w-4' />
          </Button>
        </div>
      </SectionItem>
    </section>
  );
}
