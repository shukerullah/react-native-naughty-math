import { useEffect, useState } from 'react';
import {
  AdEventType,
  InterstitialAd,
  type RequestOptions,
} from 'react-native-google-mobile-ads';

export function useInterstitial(
  adUnitId: string,
  requestOptions?: RequestOptions,
) {
  const [interstitial, setInterstitial] = useState<InterstitialAd | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!adUnitId) {
      return;
    }

    const interstitialAd: InterstitialAd = InterstitialAd.createForAdRequest(
      adUnitId,
      requestOptions,
    );

    const unsubscribe = interstitialAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setIsLoaded(true);
      },
    );

    interstitialAd.load();

    setInterstitial(interstitialAd);

    return unsubscribe;
  }, [adUnitId, requestOptions]);

  const showInterstitial = () => {
    if (interstitial && isLoaded) {
      interstitial.show();
    }
  };

  return showInterstitial;
}
