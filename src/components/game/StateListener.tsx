import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { AppActions } from '@context/reducer';
import { useGameContext } from '@hooks/useGameContext';
import { colorClasses, NUMBER_OF_ATTEMPTS } from '@util/common';
import { useSound } from '@hooks/useSound';
import { useTimer } from '@hooks/userTimer';
import { classNames } from '@util/gameUtil';

function SecretCode() {
  const { state } = useGameContext();
  const { secret } = state;
  return (
    <div className="flex flex-col">
      <p className="text-lg font-semibold text-blue-400 my-3">The code was:</p>
      <div className="grid grid-cols-4 gap-1 p-2 justify-items-center items-center mb-3">
        {secret.map((colorName) => (
          <div
            key={colorName}
            className={classNames(
              'w-8 h-8 rounded-full border-2 border-gray-400 hover:ring-2 hover:scale-105 transition-transform cursor-pointer mx-1',
              colorClasses[colorName]
            )}
          />
        ))}
      </div>
    </div>
  );
}

function ModalMessage() {
  const { state } = useGameContext();
  const { elapsed } = useTimer();

  const { isVictory, guessNumber, isCustomChallenge } = state;
  if (!isVictory)
    return (
      <div className="flex flex-col">
        <span>You have used all your guesses. Better luck next time!</span>
        <SecretCode />
      </div>
    );

  const message = `You guessed the secret code in ${guessNumber} attempts!`;
  const subMessage = [];
  const timeInSeconds = (elapsed / 1000).toFixed(2);
  if (isCustomChallenge) {
    const { challengerName, challengeMessage } = state;
    if (challengerName) subMessage.push(<span>This challenge was by {challengerName}</span>);

    if (challengeMessage)
      subMessage.push(
        <>
          Your friend message
          <div className="my-5 rounded-md bg-gray-400/10 p-5 text-s font-medium text-gray-400  ">
            {challengeMessage}
          </div>
        </>
      );
  }

  return (
    <div className="flex flex-col">
      <span>{message}</span>
      <div className="my-2">
        It took you: <span className="font-semibold underline text-yellow-400">{timeInSeconds}</span> seconds to break
        the code.
      </div>
      <div className="my-5">{subMessage}</div>
      <SecretCode />
    </div>
  );
}

export default function StateListener() {
  const navigate = useNavigate();
  const { stopBg, playBg, playGameOver, playWin } = useSound();
  const { state, dispatch } = useGameContext();
  const { stop, reset, start } = useTimer();

  const { isVictory, guessNumber } = state;
  const triggeredRef = useRef(false);

  const resetGame = useCallback(() => {
    playBg();
    reset();
    dispatch({
      type: AppActions.RESET_GAME,
      payload: {
        isOpen: false,
      },
    });
    start();
  }, [dispatch, playBg, reset, start]);

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

  useEffect(() => {
    if ((isVictory || guessNumber > NUMBER_OF_ATTEMPTS) && !triggeredRef.current) {
      manageSound();
      stop();
      triggeredRef.current = true;
      dispatch({
        type: AppActions.TOGGLE_MODAL,
        payload: {
          title: isVictory ? 'Congratulations!' : 'Game Over',
          message: <ModalMessage />,
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
  }, [dispatch, exitGame, guessNumber, isVictory, resetGame, manageSound, stop]);

  return null;
}
