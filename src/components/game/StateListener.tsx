import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { AppActions } from '@context/reducer';
import { useGameContext } from '@hooks/useGameContext';
import { NUMBER_OF_ATTEMPTS } from '@util/common';
import { useSound } from '@hooks/useSound';

export default function StateListener() {
  const navigate = useNavigate();
  const { stopBg, playBg, playGameOver, playWin } = useSound();
  const { state, dispatch } = useGameContext();
  const { isGameOver, guessNumber } = state;
  const triggeredRef = useRef(false);

  const resetGame = useCallback(() => {
    playBg();
    dispatch({
      type: AppActions.RESET_GAME,
      payload: {
        isOpen: false,
      },
    });
  }, [dispatch, playBg]);

  const exitGame = useCallback(() => {
    resetGame();
    navigate('/');
  }, [resetGame, navigate]);

  const manageSound = useCallback(() => {
    stopBg();
    if (isGameOver) {
      playWin();
    } else {
      playGameOver();
    }
  }, [isGameOver, playGameOver, playWin, stopBg]);

  useEffect(() => {
    if (
      (isGameOver || guessNumber > NUMBER_OF_ATTEMPTS) &&
      !triggeredRef.current
    ) {
      manageSound();
      triggeredRef.current = true;
      dispatch({
        type: AppActions.TOGGLE_MODAL,
        payload: {
          title: isGameOver ? 'Congratulations!' : 'Game Over',
          message: isGameOver
            ? `You guessed the secret code in ${guessNumber} attempts!`
            : 'You have used all your guesses. Better luck next time!',
          yesButtonText: 'Play Again',
          noButtonText: 'Exit',
          yesButtonOnClick: resetGame,
          noButtonOnClick: exitGame,
          isOpen: true,
        },
      });
    }

    if (!isGameOver && guessNumber === 1) {
      triggeredRef.current = false;
    }
  }, [dispatch, exitGame, guessNumber, isGameOver, resetGame, manageSound]);

  return null;
}
