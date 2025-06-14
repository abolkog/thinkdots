import { useNavigate, NavLink } from 'react-router';
import DifficultySelector from '@components/home/DifficultySelector';
import Button from '@components/ui/Button';
import Logo from '@components/ui/Logo';
import MuteToggle from '@components/home/MuteToggle';
import { useSound } from '@hooks/useSound';
import { useGameContext } from '@hooks/useGameContext';
import { AppActions } from '@context/reducer';

function Home() {
  const { dispatch } = useGameContext();
  const navigate = useNavigate();
  const { stopBg, playBg } = useSound();

  const handleNewGame = () => {
    stopBg();
    playBg();
    navigate('/game');
  };

  return (
    <>
      <article className="bg-black-300 w-[90%] rounded-lg p-5 text-center">
        <Logo cssClass="bg-black-500 mb-5 p-4" />

        <h1 className="font-bold mb-5 text-lg">Welcome to ThinkDots</h1>
        <button
          className="text-blue-300 hover:text-blue-50 mb-5 cursor-pointer font-semibold text-lg"
          onClick={() => {
            dispatch({ type: AppActions.OPEN_SIDE_PANEL });
          }}
        >
          Your Statistics
        </button>

        <DifficultySelector />
        <MuteToggle />

        <h3 className="text-gray-500">
          <NavLink to="/help">New Player? Learn How To play</NavLink>
        </h3>
      </article>

      <article className="flex flex-col gap-3 w-[90%]">
        <div className="w-full rounded-2xl pb-2">
          <Button onClick={handleNewGame} cssClass="rounded-2xl w-full font-bold text-lg">
            new game
          </Button>
        </div>
      </article>
    </>
  );
}

export default Home;
