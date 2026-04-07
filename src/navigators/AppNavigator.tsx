import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Mainstack from './MainStack/Mainstack';
import AuthStack from './AuthStack';

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default AppNavigator;
