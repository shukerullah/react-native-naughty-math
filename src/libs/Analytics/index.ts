/**
 * @module FirebaseAnalytics
 */

import { FirebaseAnalyticsTypes } from '@react-native-firebase/analytics';

const ENABLE_LOGS = __DEV__;

function log(...params: any[]) {
  if (ENABLE_LOGS) {
    console.log('===ANALYTICS===');
    console.log(...params);
  }
}

/**
 * Logs an event with the given name and optional parameters and options.
 *
 * @function logEvent
 * @param {string} name - The name of the event to log.
 * @param {Object.<string, any>} [params] - Optional parameters to include with the event.
 * @param {FirebaseAnalyticsTypes.AnalyticsCallOptions} [options] - Optional analytics call options.
 * @returns {void}
 * @throws {Error} When `name` is not a string.
 *
 * @example
 * logEvent('basket', {
 *   id: '3745092',
 *   item: 'mens grey t-shirt',
 *   description: ['round neck', 'long sleeved'],
 *   size: 'L',
 * });
 */
export function logEvent(
  name: string,
  params?: undefined | { [key: string]: any },
  options?: FirebaseAnalyticsTypes.AnalyticsCallOptions,
) {
  if (name) {
    log(name, params, options);
    // FIXME: Add your own google-services.json before calling logEvent().
    // analytics().logEvent(name, params, options);
  }
}

export function logScreen(name: string) {
  if (name) {
    logScreenView({ screen_name: name });
  }
}

/**
 * Logs a screen view with the given parameters.
 *
 * @function logScreenView
 * @param {FirebaseAnalyticsTypes.ScreenViewParameters} params - The screen view parameters to log.
 * @returns {void}
 * @throws {Error} When `params` is not an object.
 *
 * @example
 * logScreenView({
 *   screen_name: 'ScreenName',
 *   screen_class: 'currentRouteName',
 * });
 */
function logScreenView(params: FirebaseAnalyticsTypes.ScreenViewParameters) {
  log(params);
  // FIXME: Add your own google-services.json before calling logScreenView().
  // analytics().logScreenView(params);
}
