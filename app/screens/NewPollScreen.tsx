import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, TextInput, Button, useTheme } from 'react-native-paper';
import { NewPollScreenProps } from '../types/navigation';

const NewPollScreen: React.FC<NewPollScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const handleCreatePoll = () => {
    // Logic to create a new poll
    console.log('Create Poll');
    navigation.goBack(); // Navigate back to the PollsScreen after creating a poll
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="New Poll" />
      </Appbar.Header>
      <View style={styles.content}>
        <TextInput label="Poll Title" style={styles.input} />
        <TextInput label="Poll Description" style={styles.input} multiline />
        <Button mode="contained" onPress={handleCreatePoll}>
          Create Poll
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
});

export default NewPollScreen;
