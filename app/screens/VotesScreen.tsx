import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VotesScreenProps } from '../types/navigation';

const VotesScreen: React.FC<VotesScreenProps> = ({ navigation, route }) => (
  <View style={styles.content}>
    <Text>Your Votes Page</Text>
  </View>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VotesScreen;
