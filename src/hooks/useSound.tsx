import { Howl } from 'howler';

const isProd = process.env.NODE_ENV === 'production';

const base = isProd ? '/thinkdots/' : '/';

const sounds = {
  bg: new Howl({ src: [`${base}sounds/bg.mp3`], loop: true, volume: 0.3 }),
  setColor: new Howl({
    src: [`${base}sounds/pop.mp3`],
    loop: false,
    volume: 0.5,
  }),
  gameOver: new Howl({
    src: [`${base}sounds/game_over.mp3`],
    loop: false,
    volume: 0.5,
  }),
  win: new Howl({ src: [`${base}sounds/win.mp3`], loop: false, volume: 0.5 }),
};

export function useSound() {
  return {
    playBg: () => sounds.bg.play(),
    stopBg: () => sounds.bg.stop(),
    playSetColor: () => sounds.setColor.play(),
    playGameOver: () => sounds.gameOver.play(),
    playWin: () => sounds.win.play(),
  };
}
