import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import AchievementScreen from '../screens/AchievementScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SecondScreen from '../screens/SecondScreen';
import WorkoutMenuScreen from '../screens/WorkoutMenuScreen';
import IStoreState from '../types';
import DayAddContainer from './DayAddContainer';
import FeedContainer from './FeedContainer';
import WorkoutAddContainer from './WorkoutAddContainer';
import WorkoutContainer from './WorkoutContainer';

export const registerScreens = (store: Store<IStoreState>) => {
  Navigation.registerComponent('WorkoutMenuScreen', () => WorkoutMenuScreen);
  Navigation.registerComponent('AchievementScreen', () => AchievementScreen);
  Navigation.registerComponent('SecondScreen', () => SecondScreen);
  Navigation.registerComponent('CalendarScreen', () => CalendarScreen);
  Navigation.registerComponentWithRedux('FeedScreen', () => FeedContainer, Provider, store);
  Navigation.registerComponentWithRedux('WorkoutScreen', () => WorkoutContainer, Provider, store);
  Navigation.registerComponentWithRedux('WorkoutScreen.Add', () => WorkoutAddContainer, Provider, store);
  Navigation.registerComponentWithRedux('DayScreen.Add', () => DayAddContainer, Provider, store);
};
