// App.tsx
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import { theme } from './theme';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native'; 

export default function App() {
  return (
    <AuthProvider>
    <PaperProvider theme={theme}>
    <NavigationContainer>
      <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
    </AuthProvider>
  );
}