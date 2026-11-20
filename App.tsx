import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import AuthScreen from './screens/AuthScreen';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  if (!isAuth) {
    return <AuthScreen onLogin={() => setIsAuth(true)} />;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}