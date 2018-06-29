import { Navigation } from 'react-native-navigation';
import { Store } from 'react-redux';

import FeedContainer from '../containers/FeedContainer';
import AchievementScreen from './AchievementScreen';
import CalendarScreen from './CalendarScreen';
import SecondScreen from './SecondScreen';
import WorkoutScreen from './WorkoutScreen';

// @ts-ignore
import reduxHOC from '../containers/reduxHOC';
import IStoreState from '../types';

const registerScreens = (store: Store<IStoreState>) => {
  Navigation.registerComponent('FeedScreen', () => reduxHOC(FeedContainer, store));
  Navigation.registerComponent('SecondScreen', () => SecondScreen);
  Navigation.registerComponent('CalendarScreen', () => CalendarScreen);
  Navigation.registerComponent('AchievementScreen', () => AchievementScreen);
  Navigation.registerComponent('WorkoutScreen', () => WorkoutScreen);
};

export { registerScreens };
