import React from 'react';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import AppNavigator from './src/navigators/AppNavigator';

const App = () => {
  return (
    <AlertNotificationRoot>
      <AppNavigator />
    </AlertNotificationRoot>
  );
};

export default App;
