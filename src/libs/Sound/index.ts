import Sound from 'react-native-sound';
import { getSoundMuted, setSoundMuted } from '../AsyncStorage';

Sound.setCategory('Playback', false);

let mute = false;

export async function initMute() {
  mute = await getSoundMuted();
}

initMute();

export function isSoundMuted() {
  return mute;
}

export async function toggleSoundMute() {
  mute = !mute;
  await setSoundMuted(mute);
}

export default function Play(source: any) {
  const callback = (error: any, sound: any) => {
    if (error) {
      console.error('Error playing audio', error);
      return;
    }

    sound.setVolume(mute ? 0 : 1);

    sound.play(() => {
      sound.release();
    });
  };

  const sound: any = new Sound(source, error => callback(error, sound));
}
