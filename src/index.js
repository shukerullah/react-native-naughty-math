/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import { Providers } from './contexts';
import { init as initAdmob } from './libs/Admob';
import { ErrorBoundary } from './libs/ErrorBoundary';
import { Helmet } from './libs/Helmet';
import { Navigation } from './navigation';

initAdmob();
SystemNavigationBar.fullScreen();

function App() {
  return (
    <Helmet>
      <ErrorBoundary>
        <Providers>
          <Navigation />
        </Providers>
      </ErrorBoundary>
    </Helmet>
  );
}

export default App;
