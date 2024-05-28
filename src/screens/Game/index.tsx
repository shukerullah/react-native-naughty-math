import React, { useEffect, useRef, useState } from 'react';
import { AppState, Text, View } from 'react-native';

import {
  ButtonSoundToggle,
  ButtonView,
  FastImage,
  GamePlay,
  Timer,
} from '../../components';
import {
  Banner,
  GAME_PLAY_BANNER_UNIT_ID,
  GAME_PLAY_INTERSTITIAL_UNIT_ID,
} from '../../libs/Admob';
import { useInterstitial } from '../../libs/Admob/Interstitial';
import { Images } from '../../theme';
import styles from './styles';

import { GameProps } from '../../navigation';

let interstitialCounter = 0;

function Home({ navigation, route }: GameProps) {
  const appState = useRef(AppState.currentState);
  const [key, setKey] = useState(`banner-${Date.now()}`);

  // WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
  // A Google Mobile Ads Advisor suggests requesting a new ad when the app is foregrounded.
  // For more details, see: [https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8]
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/background/) && nextAppState === 'active') {
        setKey(`banner-${Date.now()}`);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const showInterstitial = useInterstitial(GAME_PLAY_INTERSTITIAL_UNIT_ID);

  const isPracticesMode = route.params?.isPracticesMode || false;

  const onButtonPress = (
    userAnswer: boolean,
    isEquationCorrect: boolean,
    onCorrectAnswer: () => void,
    onGameOver: () => void,
  ) => {
    if (userAnswer === isEquationCorrect) {
      onCorrectAnswer();
    } else {
      onGameOver();
    }
  };

  return (
    <GamePlay
      isPracticesMode={isPracticesMode}
      navigation={navigation}
      onGameOver={() => {
        if (++interstitialCounter % 2 === 0) {
          showInterstitial();
        }
      }}>
      {({
        isEquationCorrect,
        score,
        time,
        equation,
        backgroundColor,
        isGameStarted,
        isGameReadyToStart,
        onCorrectAnswer,
        onGameOver,
        isGameOver,
      }) => {
        return (
          <View style={[{ backgroundColor }, styles.container]}>
            <Banner forwardKey={key} adUnitId={GAME_PLAY_BANNER_UNIT_ID} />
            {!isPracticesMode ? (
              <Timer
                time={time}
                isPaused={isGameOver}
                start={isGameStarted}
                readyToStart={isGameReadyToStart}
                onTimeOver={() => onGameOver(true)}
              />
            ) : null}

            <View style={styles.header}>
              <ButtonSoundToggle />
              <Text style={styles.score}>{score}</Text>
            </View>

            <View style={styles.board}>
              <Text style={styles.title}>{equation}</Text>
            </View>

            <View style={styles.row}>
              <ButtonView
                delay={0}
                mute
                disabled={isGameOver}
                onPress={() => {
                  onButtonPress(
                    true,
                    isEquationCorrect,
                    onCorrectAnswer,
                    onGameOver,
                  );
                }}>
                <FastImage
                  resizeMode="contain"
                  style={styles.button}
                  source={Images.trueButton}
                />
              </ButtonView>
              <ButtonView
                delay={0}
                mute
                disabled={isGameOver}
                onPress={() =>
                  onButtonPress(
                    false,
                    isEquationCorrect,
                    onCorrectAnswer,
                    onGameOver,
                  )
                }>
                <FastImage
                  resizeMode="contain"
                  style={styles.button}
                  source={Images.falseButton}
                />
              </ButtonView>
            </View>
          </View>
        );
      }}
    </GamePlay>
  );
}

export default Home;
