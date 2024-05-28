import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import ProgressBar from '../ProgressBar';

type Props = {
  start: any;
  isPaused: boolean;
  time: number;
  onTimeOver: () => void;
  readyToStart: boolean;
};

const Timer = memo(
  ({ start, isPaused, time, onTimeOver, readyToStart }: Props) => {
    const [animation] = useState(new Animated.Value(1));
    const animationRef = useRef(animation);

    useEffect(() => {
      if (isPaused) {
        animationRef.current.stopAnimation();
      }
    }, [isPaused]);

    useEffect(() => {
      const startTimer = () => {
        animationRef.current.setValue(1);
        Animated.timing(animationRef.current, {
          toValue: 0,
          duration: time * 1000,
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (finished && onTimeOver) {
            onTimeOver();
          }
        });
      };
      if (start) {
        startTimer();
      }
      if (readyToStart) {
        animationRef.current.setValue(1);
      }
    }, [start, isPaused, time, onTimeOver, readyToStart]);

    return <ProgressBar progress={animationRef.current} />;
  },
);

export default Timer;
