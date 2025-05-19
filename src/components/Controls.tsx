import { AppActions } from '../context/reducer';
import { useGameContext } from '../hooks/useGameContext';
import { classNames } from '../util/common';
import ColorPalette from './ColorPalette';

export default function Controls() {
  const { state, dispatch } = useGameContext();
  const { isValidGuess } = state;
  return (
    <div className='flex flex-col items-center space-y-4'>
      <ColorPalette />
      <div className='mt-4'>
        <button
          onClick={() => {
            dispatch({
              type: AppActions.VALIDATE_GUESS,
            });
          }}
          disabled={!isValidGuess}
          type='button'
          className={classNames(
            'rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            isValidGuess ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
          )}
        >
          Submit Guess
        </button>
      </div>
    </div>
  );
}
