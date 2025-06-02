import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AppActions } from '@context/reducer';
import { useGameContext } from '@hooks/useGameContext';
import { NUMBER_OF_ATTEMPTS } from '@util/common';

export default function StateListener() {
  const navigate = useNavigate();

  const { state, dispatch } = useGameContext();
  const { isGameOver, guessNumber } = state;

  const resetGame = useCallback(() => {
    dispatch({
      type: AppActions.RESET_GAME,
      payload: {
        isOpen: false,
      },
    });
  }, [dispatch]);

  const exitGame = useCallback(() => {
    resetGame();
    navigate('/');
  }, [resetGame, navigate]);

  useEffect(() => {
    if (isGameOver) {
      dispatch({
        type: AppActions.TOGGLE_MODAL,
        payload: {
          title: 'Congratulations!',
          message: `You guessed the secret code in ${guessNumber} attempts!`,
          yesButtonText: 'Play Again',
          noButtonText: 'Exit',
          yesButtonOnClick: resetGame,
          noButtonOnClick: exitGame,
          isOpen: true,
        },
      });
    }

    if (guessNumber > NUMBER_OF_ATTEMPTS) {
      dispatch({
        type: AppActions.TOGGLE_MODAL,
        payload: {
          title: 'Game Over',
          message: 'You have used all your guesses. Better luck next time!',
          yesButtonText: 'Play Again',
          noButtonText: 'Exit',
          yesButtonOnClick: resetGame,
          noButtonOnClick: exitGame,
          isOpen: true,
        },
      });
    }
  }, [dispatch, exitGame, guessNumber, isGameOver, resetGame]);

  return null;
}
