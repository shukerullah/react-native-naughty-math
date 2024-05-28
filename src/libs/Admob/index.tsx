import React, { useState } from 'react';
import { View } from 'react-native';
import mobileAds, {
  BannerAd,
  BannerAdSize,
  MaxAdContentRating,
  TestIds,
} from 'react-native-google-mobile-ads';
import { Metrics } from '../../theme';
import { logEvent } from '../Analytics';

const ENABLE_LOGS = __DEV__;

function log(...params: any[]) {
  if (ENABLE_LOGS) {
    console.log('===ADMOB===');
    console.log(...params);
  }
}

// FIXME: Add your own BANNER_ID
export const HOME_BANNER_UNIT_ID = TestIds.ADAPTIVE_BANNER;

// FIXME: Add your own BANNER_ID
export const GAME_PLAY_BANNER_UNIT_ID = TestIds.ADAPTIVE_BANNER;

// FIXME: Add your own INTERSTITIAL_ID
export const GAME_PLAY_INTERSTITIAL_UNIT_ID = TestIds.INTERSTITIAL;

export function init() {
  mobileAds()
    .initialize()
    .then(adapterStatuses => {
      adapterStatuses.map(adapterStatus => {
        logEvent('admob_adapter_status', adapterStatus);
      });
      log(adapterStatuses);
      mobileAds().setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,

        // An array of test device IDs to allow.
        testDeviceIdentifiers: ['EMULATOR'],
      });
    });
}

export async function openAdInspector() {
  try {
    await mobileAds().openAdInspector();
    // The promise will resolve when the inspector is closed.
  } catch (error) {
    // The promise will reject if ad inspector is closed due to an error.
    console.log(error);
  }
}

export function Banner({
  forwardKey,
  adUnitId = HOME_BANNER_UNIT_ID,
}: {
  forwardKey: string;
  adUnitId: string;
}) {
  const [adLoaded, setAdLoaded] = useState(false);

  const styles: any = [
    {
      width: Metrics.screenWidth,
      height: adLoaded ? 'auto' : 0,
    },
  ];

  const onAdLoaded = () => {
    setAdLoaded(true);
  };

  return (
    <View style={styles}>
      <BannerAd
        key={forwardKey}
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={onAdLoaded}
        onAdFailedToLoad={e => log(e)}
        requestOptions={{
          networkExtras: {
            collapsible: 'bottom',
          },
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}
