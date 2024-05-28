import React, { useEffect, useRef, useState } from 'react';
import { AppState, View } from 'react-native';

import { ButtonView, FastImage } from '../../components';
import { Banner, HOME_BANNER_UNIT_ID } from '../../libs/Admob';
import { logEvent } from '../../libs/Analytics';
import {
  isSignedIn,
  showAchievements,
  showLeaderboard,
  signIn,
} from '../../libs/GameServices';
import type { HomeProps } from '../../navigation';
import { Images } from '../../theme';
import { moreGames, openAppStore } from '../../utils';
import styles from './styles';

function Home({ navigation }: HomeProps) {
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

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    isSignedIn(setIsLoggedIn);
  }, []);

  const renderSignedInUI = () => (
    <>
      <View style={styles.row}>
        <ButtonView onPress={showLeaderboard}>
          <FastImage
            resizeMode="contain"
            style={styles.smallButton}
            source={Images.rank}
          />
        </ButtonView>

        <ButtonView onPress={showAchievements}>
          <FastImage
            resizeMode="contain"
            style={styles.smallButton}
            source={Images.achievement}
          />
        </ButtonView>
      </View>

      <ButtonView onPress={() => openAppStore()}>
        <FastImage
          resizeMode="contain"
          style={styles.smallButton}
          source={Images.rate}
        />
      </ButtonView>
    </>
  );

  const renderSignedOutUI = () => (
    <View style={styles.row}>
      <ButtonView onPress={() => signIn(setIsLoggedIn)}>
        <FastImage
          resizeMode="contain"
          style={styles.smallButton}
          source={Images.gplus}
        />
      </ButtonView>

      <ButtonView onPress={() => openAppStore()}>
        <FastImage
          resizeMode="contain"
          style={styles.smallButton}
          source={Images.rate}
        />
      </ButtonView>
    </View>
  );

  return (
    <>
      <Banner forwardKey={key} adUnitId={HOME_BANNER_UNIT_ID} />
      <View style={styles.container}>
        <FastImage
          resizeMode="contain"
          style={styles.logo}
          source={Images.logo}
        />

        <ButtonView onPress={() => navigation.navigate('Game')}>
          <FastImage
            resizeMode="contain"
            style={styles.button}
            source={Images.play}
          />
        </ButtonView>

        {isLoggedIn ? renderSignedInUI() : renderSignedOutUI()}

        <View style={styles.footer}>
          <ButtonView onPress={moreGames}>
            <FastImage
              resizeMode="contain"
              style={styles.button}
              source={Images.moreGames}
            />
          </ButtonView>

          <ButtonView
            onPress={() => {
              logEvent('practice_mode');
              navigation.navigate('Game', { isPracticesMode: true });
            }}>
            <FastImage
              resizeMode="contain"
              style={styles.button}
              source={Images.playPracticeMode}
            />
          </ButtonView>
        </View>
      </View>
    </>
  );
}

export default Home;
