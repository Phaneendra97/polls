import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { HomeScreenProps } from "../types/navigation";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { setLoggedInUser } = useAuth();

  const handleLogout = () => {
    setLoggedInUser(null);
    navigation.navigate('Login'); // Ensure 'Login' matches the name in your Stack.Navigator
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Page!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
