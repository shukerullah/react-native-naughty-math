import throttle from 'lodash/throttle';
import React from 'react';

const throttleTime = 300;

const _throttle = throttle(onPress => {
  onPress();
}, throttleTime);

export default class Button<T> extends React.PureComponent<T> {
  onPress(onPress: () => void) {
    if (onPress) {
      _throttle(onPress);
    }
  }
}
