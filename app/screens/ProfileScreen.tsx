// ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

const ProfileScreen: React.FC = () => {
  const { loggedInUser, setLoggedInUser } = useAuth();

  const handleLogout = () => {
    setLoggedInUser(null);
    // Navigate to Login screen or any other screen after logout
    // Example: navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text>Welcome, {loggedInUser?.displayName || 'User'}</Text>
      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    marginTop: 32,
  },
});

export default ProfileScreen;
