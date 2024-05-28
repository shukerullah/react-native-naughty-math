import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: 'white',
  },
});

const ProgressBar = ({ progress }: { progress: Animated.Value }) => {
  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progress,
          {
            width,
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;
