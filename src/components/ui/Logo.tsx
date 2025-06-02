import AppLogo from '@assets/think-dots-light.svg';
import { classNames } from '@util/common';

type LogoProps = {
  cssClass?: string;
};

export default function Logo({ cssClass = '' }: LogoProps) {
  return (
    <div>
      <div
        className={classNames(
          'rounded-full w-40 mx-auto flex items-center justify-center',
          cssClass
        )}
      >
        <img src={AppLogo} alt='think-dots' />
      </div>
    </div>
  );
}
