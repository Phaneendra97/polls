import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import { theme } from './theme';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native'; // Ensure this import is correct

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

//phaneendra1997@gmail.com
//phani@1997