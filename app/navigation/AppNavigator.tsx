// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import GettingStartedScreen from '../screens/GettingStartedScreen';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types/navigation';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { loggedInUser } = useAuth();

  return (
    <Stack.Navigator>
      {loggedInUser ? (
        <>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="GettingStarted" options={{ headerShown: false }} component={GettingStartedScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
