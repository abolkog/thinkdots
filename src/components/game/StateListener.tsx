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
  const { isVictory, guessNumber, isCustomChallenge, challengeMessage, challengerName } = state;
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
    if (isVictory) {
      playWin();
    } else {
      playGameOver();
    }
  }, [isVictory, playGameOver, playWin, stopBg]);

  const formatVictoryMessage = useCallback(() => {
    if (!isCustomChallenge) return `You guessed the secret code in ${guessNumber} attempts!`;

    const name = challengerName ? `by ${challengerName}` : '';
    const message = challengeMessage ? ` Your friend message: "${challengeMessage}"` : '';

    const victoryMessage = `You solved the challenge ${name} in ${guessNumber} attempts! ${message}`;

    return victoryMessage;
  }, [isCustomChallenge, guessNumber, challengerName, challengeMessage]);

  useEffect(() => {
    if ((isVictory || guessNumber > NUMBER_OF_ATTEMPTS) && !triggeredRef.current) {
      manageSound();
      triggeredRef.current = true;
      dispatch({
        type: AppActions.TOGGLE_MODAL,
        payload: {
          title: isVictory ? 'Congratulations!' : 'Game Over',
          message: isVictory ? formatVictoryMessage() : 'You have used all your guesses. Better luck next time!',
          yesButtonText: 'Play Again',
          noButtonText: 'Exit',
          yesButtonOnClick: resetGame,
          noButtonOnClick: exitGame,
          isOpen: true,
        },
      });
    }

    if (!isVictory && guessNumber === 1) {
      triggeredRef.current = false;
    }
  }, [dispatch, exitGame, guessNumber, isVictory, resetGame, manageSound, formatVictoryMessage]);

  return null;
}
