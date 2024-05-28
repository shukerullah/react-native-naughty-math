import React from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';

import { Button } from '../../base';
import Sound from '../../libs/Sound';
import { Audios } from '../../theme';

type Props = TouchableWithoutFeedbackProps & {
  mute?: boolean;
  delay?: number;
  sound?: any;
};

const duration = 40;

export default class ButtonView extends Button<Props> {
  widthAnimation = new Animated.Value(1);
  heightAnimation = new Animated.Value(1);

  shake = () => {
    Animated.sequence([
      Animated.timing(this.widthAnimation, {
        toValue: 1.1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.heightAnimation, {
        toValue: 0.95,
        duration,
        useNativeDriver: true,
      }),

      Animated.timing(this.widthAnimation, {
        toValue: 0.98,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.heightAnimation, {
        toValue: 1.05,
        duration,
        useNativeDriver: true,
      }),

      Animated.timing(this.widthAnimation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.heightAnimation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  render() {
    const {
      delay = 150,
      mute = false,
      sound = Audios.button,
      onPress,
      children,
      ...rest
    } = this.props;

    return (
      <TouchableWithoutFeedback
        touchSoundDisabled
        {...rest}
        onPress={() =>
          this.onPress(() => {
            if (onPress) {
              if (!mute) {
                Sound(sound);
              }
              this.shake();
              setTimeout(onPress, delay);
            }
          })
        }>
        <Animated.View
          style={{
            transform: [
              {
                scaleX: this.widthAnimation,
              },
              {
                scaleY: this.heightAnimation,
              },
            ],
          }}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
