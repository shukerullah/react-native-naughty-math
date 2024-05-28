import React from 'react';
import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { ButtonView, FastImage } from '..';
import { Images, Metrics } from '../../theme';
import styles from './styles';

type Props = {
  show: boolean;
  score: number;
  bestScore: number;
  onMenu: () => void;
  onPlayAgain: () => void;
  isPracticesMode?: boolean;
  heading: string;
};

export default class Popup extends React.PureComponent<Props> {
  render() {
    const {
      show,
      score,
      bestScore,
      onMenu,
      onPlayAgain,
      isPracticesMode,
      heading,
    } = this.props;

    if (!show) {
      return false;
    }
    return (
      <View style={styles.container}>
        <Animatable.View
          animation={{
            0: {
              translateY: Metrics.screenHeight,
            },
            1: {
              translateY: 0,
            },
          }}
          delay={200}
          duration={1000}
          easing="ease-out-back"
          style={styles.content}>
          <FastImage
            resizeMode="contain"
            style={styles.background}
            source={Images.popupGameOver}
          />

          {!isPracticesMode ? (
            <View style={styles.scoreContent}>
              <Text style={styles.heading}>{heading}</Text>

              <Text style={styles.score}>
                <Text style={styles.title}>New</Text> {score}
              </Text>
              <Text style={styles.bestScore}>
                <Text style={styles.title}>Best</Text> {bestScore}
              </Text>
            </View>
          ) : (
            <View style={styles.scoreContent}>
              <Text style={styles.heading}>{heading}</Text>
              <Text style={styles.practiceModeScore}>
                <Text style={styles.title}>Score</Text> {score}
              </Text>
            </View>
          )}

          <View style={styles.row}>
            <ButtonView onPress={onPlayAgain}>
              <FastImage
                resizeMode="contain"
                style={styles.button}
                source={Images.play}
              />
            </ButtonView>

            <ButtonView onPress={onMenu}>
              <FastImage
                resizeMode="contain"
                style={styles.button}
                source={Images.menu}
              />
            </ButtonView>
          </View>
        </Animatable.View>
      </View>
    );
  }
}
