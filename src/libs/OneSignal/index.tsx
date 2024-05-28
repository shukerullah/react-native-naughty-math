import React, { useEffect } from 'react';
import { LogLevel, OneSignal as OneSignalRN } from 'react-native-onesignal';

// FIXME: Add your own OneSignal App ID
const APP_ID = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

interface OneSignalProps {
  children?: React.ReactNode;
}

let iInitialized = false;
export const OneSignal: React.FunctionComponent<OneSignalProps> = ({
  children,
}) => {
  useEffect(() => {
    if (!iInitialized) {
      iInitialized = true;

      // Remove this method to stop OneSignal Debugging
      OneSignalRN.Debug.setLogLevel(LogLevel.Verbose);

      // OneSignal Initialization
      OneSignalRN.initialize(APP_ID);

      // requestPermission will show the native iOS or Android notification permission prompt.
      // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
      OneSignalRN.Notifications.requestPermission(true);
    }
    return () => {
      OneSignalRN.Notifications.clearAll();
    };
  }, []);

  return <>{children}</>;
};
