import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext';
import { PollsScreenProps } from '../types/navigation';

const PollsScreen: React.FC<PollsScreenProps> = ({ navigation, route }) => { // Ensure both navigation and route are received
  const theme = useTheme();
  const { loggedInUser } = useAuth();
  const [polls, setPolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedInUser) {
      return;
    }

    const fetchPolls = async () => {
      try {
        const userPollsCollection = `uuid_${loggedInUser.uid}_polls`;
        const querySnapshot = await getDocs(collection(firestore, userPollsCollection));
        if (querySnapshot.empty) {
          setPolls([]);
        } else {
          const pollsList: any[] = [];
          querySnapshot.forEach((doc) => {
            pollsList.push({ id: doc.id, ...doc.data() });
          });
          setPolls(pollsList);
        }
      } catch (error) {
        console.error('Error fetching polls: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, [loggedInUser]);

  const renderPollItem = ({ item }: { item: any }) => (
    <View style={styles.pollItem}>
      <Text>{item.title}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.content}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {polls.length === 0 ? (
        <Text>No polls exist</Text>
      ) : (
        <FlatList
          data={polls}
          renderItem={renderPollItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <FAB
        style={styles.fab}
        icon={() => <Icon name="add-circle-outline" size={24} color={theme.colors.primary} />}
        label="New Poll"
        onPress={() => navigation.navigate('NewPoll')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pollItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default PollsScreen;
