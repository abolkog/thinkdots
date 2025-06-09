import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useGameContext } from '@hooks/useGameContext';
import { AppActions } from '@context/reducer';
import Badge from './Badge';
import { getUnlockedAchievements } from '@util/gameUtil';

export default function SidePanel() {
  const { state, dispatch } = useGameContext();
  const { sidePanelOpen, playerState } = state;
  const { unlocked, remaining } = getUnlockedAchievements(playerState);

  const handleClose = () => {
    dispatch({ type: AppActions.CLOSE_SIDE_PANEL });
  };

  const dismissModal = () => {
    dispatch({
      type: AppActions.TOGGLE_MODAL,
      payload: {
        isOpen: false,
      },
    });
  };

  const resetProgress = () => {
    dispatch({ type: AppActions.RESET_PLAYER_STATE });
    dismissModal();
  };

  const onResetButtonClick = () => {
    dispatch({ type: AppActions.CLOSE_SIDE_PANEL });
    dispatch({
      type: AppActions.TOGGLE_MODAL,
      payload: {
        title: 'Reset Progress',
        message:
          'This will reset your game progress, including all statistics and achievements. This action cannot be undone.',
        yesButtonText: 'Reset',
        noButtonText: 'Cancel',
        yesButtonOnClick: resetProgress,
        noButtonOnClick: dismissModal,
        isOpen: true,
      },
    });
  };

  return (
    <Dialog open={sidePanelOpen} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-96 transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="relative rounded-md bg-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden cursor-pointer"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-6 w-6 text-gray-700 hover:text-white" />
                  </button>
                </div>
              </TransitionChild>
              <div className="h-full overflow-y-auto bg-black-300 p-8">
                <div className="space-y-6 pb-16">
                  <div>
                    <h3 className="font-medium text-white">Your Statistics</h3>

                    <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">
                          Total Games Played
                          <br />
                          <span className="text-gray-400 text-xs ml-1">(Total number of games you played)</span>
                        </dt>
                        <dd className="text-blue-400 font-semibold">{playerState.totalGames}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">
                          Wins
                          <br />
                          <span className="text-gray-400 text-xs ml-1">(Number of times you won)</span>
                        </dt>
                        <dd className="text-blue-400 font-semibold">{playerState.wins}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">
                          Losses
                          <br />
                          <span className="text-gray-400 text-xs ml-1">(Number of times you lost)</span>
                        </dt>
                        <dd className="text-blue-400 font-semibold">{playerState.losses}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">
                          Current Win Streak
                          <br />
                          <span className="text-gray-400 text-xs ml-1">(Your current wining streak)</span>
                        </dt>
                        <dd className="text-blue-400 font-semibold">{playerState.currentStreak}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">
                          Longest Wining Streak
                          <br />
                          <span className="text-gray-400 text-xs ml-1">(The longest winning streak you ever had)</span>
                        </dt>
                        <dd className="text-blue-400 font-semibold">{playerState.maxStreak}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">
                          Fastest Solve
                          <br />
                          <span className="text-gray-400 text-xs ml-1">
                            (Fastest time you solved a game - in seconds)
                          </span>
                        </dt>
                        <dd className="text-blue-400 font-semibold">{playerState.fastestSolve}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">
                          Fewest Guesses
                          <br />
                          <span className="text-gray-400 text-xs ml-1">(Fewest number of guesses to win a game)</span>
                        </dt>
                        <dd className="text-blue-400 font-semibold">{playerState.fewestGuesses}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Your Achievements</h3>
                    <div className="mt-2 grid grid-cols-1 gap-3">
                      {unlocked.map((unlockedAchievement) => (
                        <Badge
                          key={unlockedAchievement.id}
                          title={unlockedAchievement.name}
                          description={unlockedAchievement.description}
                          active
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-white">Available Achievements</h3>
                    <div className="mt-2 grid grid-cols-1 gap-3">
                      {remaining.map((remainingAchievement) => (
                        <Badge
                          key={remainingAchievement.id}
                          title={remainingAchievement.name}
                          description={remainingAchievement.description}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      className="ml-3 flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer"
                      onClick={onResetButtonClick}
                    >
                      Reset My Progress
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
