import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  GettingStarted: undefined;
  Profile: undefined;
  NewPoll: undefined;
  Polls: undefined;
  Votes: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type GettingStartedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GettingStarted'>;
export type GettingStartedScreenRouteProp = RouteProp<RootStackParamList, 'GettingStarted'>;

export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

export type PollsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Polls'>;
export type PollsScreenRouteProp = RouteProp<RootStackParamList, 'Polls'>;

export type VotesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Votes'>;
export type VotesScreenRouteProp = RouteProp<RootStackParamList, 'Votes'>;

export type NewPollScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewPoll'>;
export type NewPollScreenRouteProp = RouteProp<RootStackParamList, 'NewPoll'>;


export type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export type GettingStartedScreenProps = {
  navigation: GettingStartedScreenNavigationProp;
  route: GettingStartedScreenRouteProp;
};

export type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};
export type PollsScreenProps = {
  navigation: PollsScreenNavigationProp;
  route: PollsScreenRouteProp;
};

export type VotesScreenProps = {
  navigation: VotesScreenNavigationProp;
  route: VotesScreenRouteProp;
};

export type NewPollScreenProps = {
  navigation: NewPollScreenNavigationProp;
  route: NewPollScreenRouteProp;
};
