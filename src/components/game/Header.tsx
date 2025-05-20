import Button from '@components/ui/Button';
import RestartIcon from '@assets/icon-restart.svg';
import { useGameContext } from '@hooks/useGameContext';

export default function Header() {
  const { state } = useGameContext();
  return (
    <section className='flex justify-between items-center py-4 mb-10 w-[85%] mx-auto'>
      <h1 className='text-2xl font-bold text-gray-400'>ThinkDots</h1>

      <div className='bg-black-500 pb-[0.2rem] rounded-[0.2rem]'>
        <div className='flex bg-black-300 rounded-[0.2rem] gap-2 py-[0.4rem] uppercase text-black-400  px-3 cursor-default'>
          <span className='block text-sm text-gray-400'>
            Guess #{state.guessNumber}
          </span>
        </div>
      </div>

      <div className='rounded-md bg-gray-500 pb-1'>
        <Button onClick={() => {}} cssClass='bg-gray-400 rounded-md pb-2'>
          <img src={RestartIcon} alt='' className='w-4' />
        </Button>
      </div>
    </section>
  );
}
