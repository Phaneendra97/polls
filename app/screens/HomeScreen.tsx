import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { HomeScreenProps } from "../types/navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { setLoggedInUser } = useAuth();

  const handleLogout = () => {
    setLoggedInUser(null);
    navigation.navigate('Login'); // Ensure 'Login' matches the name in your Stack.Navigator
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Poll Dance" titleStyle={styles.title} />
        <Appbar.Action icon="account-circle-outline" onPress={() => navigation.navigate('Profile')} />
        <Text style={styles.caption}>Profile</Text>
      </Appbar.Header>
      <View style={styles.content}>
        <Text>Welcome to the Home Page!</Text>
        <Button
          icon={() => <Icon name="camera" size={20} color="white" />}
          mode="contained"
          onPress={handleLogout}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },
  caption: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    fontSize: 12,
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
