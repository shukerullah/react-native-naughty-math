import { Linking, Platform } from 'react-native';
import { logEvent } from '../libs/Analytics';

import { APP_STORE_DEVELOPER, APP_STORE_ID, GOOGLE_PLAY_ID } from '../constants';

export async function openURL(url: string) {
  await Linking.openURL(url);
}

export async function moreGames() {
  logEvent('more_games');
  try {
    if (Platform.OS === 'android') {
      let storeUrl = `market://search?q=pub:${APP_STORE_DEVELOPER}`;

      if (await Linking.canOpenURL(storeUrl)) {
        if (__DEV__) {
          console.log(`Requested to open Play Store: ${storeUrl}`);
        }
        await openURL(storeUrl);
        return true;
      }

      storeUrl = `https://play.google.com/store/apps/developer?id=${APP_STORE_DEVELOPER}`;
      if (__DEV__) {
        console.log(`Requested to open Play Store: ${storeUrl}`);
      }
      await openURL(storeUrl);
      return true;
    }

    if (Platform.OS === 'ios') {
      console.error('More games is not setup for iOS');
      return false;
    }

    throw new Error(`Invalid platform: ${Platform.OS}`);
  } catch (error) {
    if (__DEV__) {
      console.error(`Failed to open App Store: ${error}`);
    }
    return false;
  }
}

export async function openAppStore(showReviewModal = true) {
  logEvent('rate_app');
  try {
    if (Platform.OS === 'android') {
      let storeUrl = `market://details?id=${GOOGLE_PLAY_ID}`;

      if (await Linking.canOpenURL(storeUrl)) {
        if (__DEV__) {
          console.log(`Requested to open Play Store: ${storeUrl}`);
        }
        await openURL(storeUrl);
        return true;
      }

      storeUrl = `https://play.google.com/store/apps/details?id=${GOOGLE_PLAY_ID}`;
      if (__DEV__) {
        console.log(`Requested to open Play Store: ${storeUrl}`);
      }
      await openURL(storeUrl);
      return true;
    }

    if (Platform.OS === 'ios') {
      let storeUrl = `itms-apps://itunes.apple.com/app/id${APP_STORE_ID}`;

      if (await Linking.canOpenURL(storeUrl)) {
        if (__DEV__) {
          console.log(`Requested to open App Store: ${storeUrl}`);
        }
        await openURL(storeUrl);
        return true;
      }

      storeUrl = showReviewModal
        ? `https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=${APP_STORE_ID}&pageNumber=0&sortOrdering=2&mt=8`
        : `https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=${APP_STORE_ID}&pageNumber=0&sortOrdering=2&mt=8`;
      if (__DEV__) {
        console.log(`Requested to open App Store: ${storeUrl}`);
      }
      await openURL(storeUrl);
      return true;
    }

    throw new Error(`Invalid platform: ${Platform.OS}`);
  } catch (error) {
    if (__DEV__) {
      console.error(`Failed to open App Store: ${error}`);
    }
    return false;
  }
}
