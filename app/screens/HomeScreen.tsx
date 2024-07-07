import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, BottomNavigation, useTheme } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { HomeScreenProps, PollsScreenNavigationProp, PollsScreenRouteProp, VotesScreenNavigationProp, VotesScreenRouteProp } from '../types/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PollsScreen from './PollsScreen';
import VotesScreen from './VotesScreen';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { setLoggedInUser } = useAuth();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'polls', title: 'Your Polls', icon: 'poll' },
    { key: 'votes', title: 'Your Votes', icon: 'how-to-vote' },
  ]);

  const theme = useTheme();

  const renderPollsScreen = () => (
    <PollsScreen
      navigation={navigation as PollsScreenNavigationProp}
      route={{ key: 'polls', name: 'Polls' } as PollsScreenRouteProp}
    />
  );

  const renderVotesScreen = () => <VotesScreen navigation={navigation as VotesScreenNavigationProp}
  route={{ key: 'votes', name: 'Votes' } as VotesScreenRouteProp} />;

  const renderScene = BottomNavigation.SceneMap({
    polls: renderPollsScreen,
    votes: renderVotesScreen,
  });

  const renderIcon = (props: { route: { key: string; icon: string } }) => (
    <Icon name={props.route.icon} size={24} color={theme.colors.primary} />
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Poll Dance" titleStyle={styles.title} />
        <Appbar.Action
          icon="account-circle-outline"
          onPress={() => navigation.navigate('Profile')}
        />
        <Text style={styles.caption}>Profile</Text>
      </Appbar.Header>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={renderIcon}
      />
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
});

export default HomeScreen;
