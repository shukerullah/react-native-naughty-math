import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import { logScreen } from '../libs/Analytics';
import { Game, Home } from '../screens';

type StackParamList = {
  Home: undefined;
  Game:
    | {
        isPracticesMode?: boolean;
      }
    | undefined;
};

export type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;
export type GameProps = NativeStackScreenProps<StackParamList, 'Game'>;
const Stack = createNativeStackNavigator<StackParamList>();

const trackScreenView = (screenName?: string) => {
  if (!screenName) {
    console.warn('.:: No Screen Name Found ::.');
    return;
  }
  logScreen(screenName);
};

export function Navigation() {
  const navigationRef = useNavigationContainerRef<StackParamList>();
  const routeNameRef = useRef<string | undefined>();

  const handleStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      // Save the current route name for later comparison
      routeNameRef.current = currentRouteName;
      trackScreenView(currentRouteName);
    }
  };

  useEffect(() => {
    handleStateChange();
  });

  useEffect(() => {
    StatusBar.setHidden(true);
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={handleStateChange}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
