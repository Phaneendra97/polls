import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  GettingStarted: undefined;  // Add this line
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type GettingStartedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GettingStarted'>;
export type GettingStartedScreenRouteProp = RouteProp<RootStackParamList, 'GettingStarted'>;

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