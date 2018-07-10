import { Navigation } from 'react-native-navigation';
import { Store } from 'react-redux';

import AchievementScreen from '../screens/AchievementScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SecondScreen from '../screens/SecondScreen';
import FeedContainer from './FeedContainer';
import WorkoutAddContainer from './WorkoutAddContainer';
import WorkoutContainer from './WorkoutContainer';

// @ts-ignore
import reduxHOC from '../containers/reduxHOC';
import IStoreState from '../types';

const registerScreens = (store: Store<IStoreState>) => {
  Navigation.registerComponent('FeedScreen', () => reduxHOC(FeedContainer, store));
  Navigation.registerComponent('SecondScreen', () => SecondScreen);
  Navigation.registerComponent('CalendarScreen', () => CalendarScreen);
  Navigation.registerComponent('AchievementScreen', () => AchievementScreen);
  Navigation.registerComponent('WorkoutScreen', () => reduxHOC(WorkoutContainer, store));
  Navigation.registerComponent('WorkoutScreen.Add', () => reduxHOC(WorkoutAddContainer, store));
};

export { registerScreens };
