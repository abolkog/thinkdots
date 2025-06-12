import { useNavigate, NavLink } from 'react-router';
import DifficultySelector from '@components/home/DifficultySelector';
import Button from '@components/ui/Button';
import Logo from '@components/ui/Logo';
import MuteToggle from '@components/home/MuteToggle';
import Divider from '@components/ui/Divider';
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
            play new game
          </Button>
        </div>
        <Divider label="OR" />

        <div className="w-full rounded-2xl pb-2 flex items-center justify-center">
          <NavLink
            to="/challenge/create"
            className="uppercase text-black-400 py-3 px-3 bg-yellow-400 transition-all duration-200 ease-in-out rounded-2xl  font-bold text-lg"
          >
            challenge a friend
          </NavLink>
        </div>
      </article>
    </>
  );
}

export default Home;
