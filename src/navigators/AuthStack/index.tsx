import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from '../../screens/AuthScreens/LoginScreen';
import Register from '../../screens/AuthScreens/Register';
import Forgetpassword from '../../screens/AuthScreens/Forgetpassword';
import VerifyOtp from '../../screens/AuthScreens/VerifyOtp';
import ResetPassword from '../../screens/AuthScreens/ResetPassword';


export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  VerifyOtp: undefined;
  ResetPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={Forgetpassword} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
