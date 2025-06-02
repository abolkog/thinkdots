import { GameContext } from '@context/GameContext';
import { AppActions } from '@context/reducer';
import { classNames } from '@util/common';
import { useContext } from 'react';

export default function DifficultySelector() {
  const { state, dispatch } = useContext(GameContext);
  const { isEasyMode, showPalette } = state;
  const baseClass =
    'w-1/2 mx-auto flex justify-center items-center uppercase cursor-pointer';
  const activeClass =
    'bg-gray-400 rounded-lg px-3 py-3 ml-3 font-bold text-lg text-black';

  const handleDifficultyChange = (easyMode: boolean) => {
    let shouldShowPalette = showPalette;
    if (!easyMode) {
      shouldShowPalette = false;
    }

    dispatch({
      type: AppActions.SET_DIFFICULTY,
      payload: { isEasyMode: easyMode, showPalette: shouldShowPalette },
    });
  };

  const handleShowPaletteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    dispatch({
      type: AppActions.TOGGLE_PALETTE,
      payload: value,
    });
  };

  return (
    <article
      className='bg-black-300 rounded-lg p-5 text-center'
      data-testid='difficulty-selector'
    >
      <h1 className='font-bold mb-5 text-lg'>Select Game Difficulty</h1>

      <article className='bg-black-400 py-3 rounded-lg flex w-full mb-5'>
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

      <div
        className={classNames(
          'flex items-center justify-center mb-5',
          !isEasyMode ? 'hidden' : ''
        )}
      >
        <input
          id='show-palette'
          type='checkbox'
          checked={showPalette}
          onChange={handleShowPaletteChange}
          className='form-checkbox h-5 w-5 accent-blue-400 bg-black-400 border-gray-500 rounded focus:ring-2 focus:ring-gray-400'
        />
        <label
          htmlFor='show-palette'
          className='ml-2 text-blue-400 select-none text-lg font-bold'
        >
          Show Color Palette
        </label>
      </div>
    </article>
  );
}
