import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bottomtab from '../Bottomtab';

export type MainStackParamList = {
  BottomTab: undefined;
  // Add other screens here as needed
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const Mainstack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTab" component={Bottomtab} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
};

export default Mainstack;