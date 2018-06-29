import { Navigation } from 'react-native-navigation';

import AchievementScreen from './AchievementScreen';
import CalendarScreen from './CalendarScreen';
import FeedScreen from './FeedScreen';
import SecondScreen from './SecondScreen';
import WorkoutScreen from './WorkoutScreen';

const registerScreens = () => {
  Navigation.registerComponent('FeedScreen', () => FeedScreen);
  Navigation.registerComponent('SecondScreen', () => SecondScreen);
  Navigation.registerComponent('CalendarScreen', () => CalendarScreen);
  Navigation.registerComponent('AchievementScreen', () => AchievementScreen);
  Navigation.registerComponent('WorkoutScreen', () => WorkoutScreen);
};

export { registerScreens };
