// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
// import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
    {/* <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Home" component={HomeScreen} /> */}
  </Stack.Navigator>
);

export default AppNavigator;
