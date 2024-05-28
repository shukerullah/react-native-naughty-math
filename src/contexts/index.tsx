import React from 'react';

import { Helmet } from '../libs/Helmet';
import { OneSignal } from '../libs/OneSignal';
import { SafeAreaProvider as SafeArea } from '../libs/SafeAreaView';
import { Compose } from './Compose';

interface Props {
  children: React.ReactNode;
}

const HelmetWrapper = (children: React.ReactNode) => (
  <Helmet>{children}</Helmet>
);

const SafeAreaProvider = (children: React.ReactNode) => (
  <SafeArea>{children}</SafeArea>
);

const OneSignalProvider = (child: React.ReactNode) => (
  <OneSignal>{child}</OneSignal>
);

export function Providers(props: Props) {
  return (
    <Compose components={[OneSignalProvider, HelmetWrapper, SafeAreaProvider]}>
      {props.children}
    </Compose>
  );
}
