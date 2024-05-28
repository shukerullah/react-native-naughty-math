import React, { useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Sound, { isSoundMuted, toggleSoundMute } from '../../libs/Sound';
import { Audios, Images, Metrics } from '../../theme';

const styles = StyleSheet.create({
  sound: {
    width: Metrics.ratio(40),
    height: Metrics.ratio(40),
  },
});

const ButtonSoundToggle = () => {
  const [isMuted, setIsMuted] = useState(isSoundMuted());

  const toggleAudio = () => {
    toggleSoundMute();

    setIsMuted(prevMuted => !prevMuted);

    // Play sound if the current state is muted, because setIsMuted updates the state asynchronously (not immediately).
    // Technically, the sound is played when its unmuted.
    if (isMuted) {
      Sound(Audios.button);
    }
  };

  return (
    <TouchableWithoutFeedback touchSoundDisabled onPress={toggleAudio}>
      <Image
        resizeMode="contain"
        style={styles.sound}
        source={isMuted ? Images.soundOff : Images.soundOn}
      />
    </TouchableWithoutFeedback>
  );
};

export default ButtonSoundToggle;
