import Button from '@components/ui/Button';
import { useGameContext } from '@hooks/useGameContext';

export default function Modal() {
  const { state } = useGameContext();
  const { modal } = state;

  if (!modal?.isOpen) return null;

  const showNoButton = modal?.noButtonText && modal?.noButtonOnClick;
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-[black] opacity-40" />
      <div className="flex items-center min-h-screen py-8">
        <div className="relative w-full  px-4 py-7 md:py-12 mx-auto bg-black-300 shadow-lg">
          <div className="mt-3 md:w-2/3 mx-auto">
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <h4 className="text-lg uppercase text-center font-medium ">
                {modal?.title}
              </h4>

              <p className="my-7 uppercase text-2xl flex items-center justify-center gap-2 ">
                {modal?.message}
              </p>

              <div className="flex justify-center items-center gap-10 mt-3">
                <Button
                  cssClass="rounded-2xl font-bold text-lg"
                  onClick={modal?.yesButtonOnClick}
                >
                  {modal?.yesButtonText}
                </Button>

                {showNoButton && (
                  <Button
                    cssClass="bg-red-400 rounded-2xl font-bold text-lg active:bg-red-500 hover:bg-red-500"
                    onClick={modal?.noButtonOnClick}
                  >
                    {modal?.noButtonText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
