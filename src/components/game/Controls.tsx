import Button from '@components/ui/Button';
import { AppActions } from '@context/reducer';
import { useGameContext } from '@hooks/useGameContext';

export default function Controls() {
  const { state, dispatch } = useGameContext();
  const { isValidGuess } = state;
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="mt-4">
        <Button
          onClick={() => {
            dispatch({
              type: AppActions.VALIDATE_GUESS,
            });
          }}
          disabled={!isValidGuess}
          type="button"
          cssClass="rounded-lg px-4 font-bold py-2"
        >
          Submit Guess
        </Button>
      </div>
    </div>
  );
}
