import Button from '@components/ui/Button';
import { AppActions } from '@context/reducer';
import { useGameContext } from '@hooks/useGameContext';
import ColorPalette from '@components/game/ColorPalette';

export default function Controls() {
  const { state, dispatch } = useGameContext();
  const { isValidGuess } = state;
  return (
    <div className='flex flex-col items-center space-y-4'>
      <ColorPalette />
      <div className='mt-4'>
        <Button
          onClick={() => {
            dispatch({
              type: AppActions.VALIDATE_GUESS,
            });
          }}
          disabled={!isValidGuess}
          type='button'
          cssClass='rounded-lg px-4 font-bold py-2'
        >
          Submit Guess
        </Button>
      </div>
    </div>
  );
}
