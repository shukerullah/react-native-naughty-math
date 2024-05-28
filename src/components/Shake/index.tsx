import React from 'react';
import { Animated } from 'react-native';

const maxValue = 10;
const duration = 30;

type Props = {
  children: React.ReactNode;
};

export default class Shake extends React.PureComponent<Props> {
  shakeAnimation = new Animated.Value(0);

  shake = () => {
    Animated.sequence([
      Animated.timing(this.shakeAnimation, {
        toValue: maxValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: -maxValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: maxValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  render() {
    const style = {
      flex: 1,
      transform: [{ translateY: this.shakeAnimation }],
    };
    return <Animated.View style={style}>{this.props.children}</Animated.View>;
  }
}
