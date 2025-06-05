import { useContext } from 'react';
import { GameContext } from '@context/GameContext';
import { AppActions } from '@context/reducer';
import { classNames } from '@util/gameUtil';

export default function DifficultySelector() {
  const { state, dispatch } = useContext(GameContext);
  const { isEasyMode } = state;
  const baseClass =
    'w-1/2 mx-auto flex justify-center items-center uppercase cursor-pointer';
  const activeClass =
    'bg-gray-400 rounded-lg px-3 py-3 ml-3 font-bold text-lg text-black';

  const handleDifficultyChange = (easyMode: boolean) => {
    dispatch({
      type: AppActions.SET_DIFFICULTY,
      payload: { isEasyMode: easyMode },
    });
  };

  return (
    <article
      className="bg-black-300 rounded-lg p-5 text-center"
      data-testid="difficulty-selector"
    >
      <h1 className="font-bold mb-5 text-lg">Select Game Difficulty</h1>

      <article className="bg-black-400 py-3 rounded-lg flex w-full mb-5">
        <button
          onClick={() => handleDifficultyChange(true)}
          className={classNames(baseClass, isEasyMode ? activeClass : '')}
        >
          Easy
        </button>
        <button
          onClick={() => handleDifficultyChange(false)}
          className={classNames(baseClass, !isEasyMode ? activeClass : '')}
        >
          Pro
        </button>
      </article>
    </article>
  );
}
