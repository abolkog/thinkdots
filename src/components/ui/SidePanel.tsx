import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import XMarkIcon from '@assets/close-x.svg';
import { useGameContext } from '@hooks/useGameContext';
import { AppActions } from '@context/reducer';

export default function SidePanel() {
  const { state, dispatch } = useGameContext();
  const { sidePanelOpen, playerState } = state;

  const handleClose = () => {
    dispatch({ type: AppActions.CLOSE_SIDE_PANEL });
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
                    <img src={XMarkIcon} alt="Close" className="size-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="h-full overflow-y-auto bg-black-300 p-8">
                <div className="space-y-6 pb-16">
                  <div>
                    <h3 className="font-medium text-white">Your Statistics</h3>
                    <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">Total Game Played</dt>
                        <dd className="text-blue-400 font-semibold">{playerState.totalGames}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">Wins</dt>
                        <dd className="text-blue-400 font-semibold">{playerState.wins}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">Losses</dt>
                        <dd className="text-blue-400 font-semibold">{playerState.losses}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">Current Win Streak</dt>
                        <dd className="text-blue-400 font-semibold">{playerState.currentStreak}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">Longest Wining Streak</dt>
                        <dd className="text-blue-400 font-semibold">{playerState.maxStreak}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">Fastest Solve</dt>
                        <dd className="text-blue-400 font-semibold">{playerState.fastestSolve}</dd>
                      </div>
                      <div className="flex justify-between py-3 text-sm font-medium">
                        <dt className="text-white">Average Guesses</dt>
                        <dd className="text-blue-400 font-semibold">{playerState.averageGuesses}</dd>
                      </div>
                    </dl>
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
