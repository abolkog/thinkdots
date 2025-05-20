import AppLogo from '@assets/think-dots-light.svg';

export default function Logo() {
  return (
    <article className='flex gap-2'>
      <img src={AppLogo} alt='think-dots' />
    </article>
  );
}
