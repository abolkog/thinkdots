import { classNames } from '@util/gameUtil';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  cssClass?: string;
};

export default function Button({
  children,
  onClick,
  cssClass = '',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        'uppercase text-black-400 py-3 px-3 bg-blue-400 transition-all duration-200 ease-in-out',
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer active:bg-blue-500 active:text-gray-400 hover:bg-blue-300',
        cssClass
      )}
    >
      {children}
    </button>
  );
}
