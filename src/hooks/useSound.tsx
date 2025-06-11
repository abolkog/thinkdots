import { Howl } from 'howler';
import { BASE_URL } from '@util/envHelper';

const base = BASE_URL;

const sounds = {
  bg: new Howl({ src: [`${base}sounds/bg.mp3`], loop: true, volume: 0.3, mute: false }),
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
    toggleBgMute: () => {
      sounds.bg.mute(!sounds.bg.mute());
    },
    isMuted: () => {
      const value = sounds.bg.mute();
      return typeof value === 'boolean' ? value : false;
    },
  };
}
