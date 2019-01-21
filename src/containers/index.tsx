import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import AchievementScreen from '../screens/AchievementScreen';
import WorkoutMenuScreen from '../screens/WorkoutMenuScreen';
import IStoreState from '../types';
import DayAddContainer from './DayAddContainer';
import DayContainer from './DayContainer';
import ExerciseAddContainer from './ExerciseAddContainer';
import ExerciseContainer from './ExerciseContainer';
import FeedContainer from './FeedContainer';
import WorkoutAddContainer from './WorkoutAddContainer';
import WorkoutContainer from './WorkoutContainer';

export const registerScreens = (store: Store<IStoreState>) => {
  Navigation.registerComponent('WorkoutMenuScreen', () => WorkoutMenuScreen);
  Navigation.registerComponent('AchievementScreen', () => AchievementScreen);
  // Navigation.registerComponent('SecondScreen', () => SecondScreen);
  // Navigation.registerComponent('CalendarScreen', () => CalendarScreen);
  // Navigation.registerComponent('buttons.delete', () => DeleteButton);
  Navigation.registerComponentWithRedux('FeedScreen', () => FeedContainer, Provider, store);
  Navigation.registerComponentWithRedux('WorkoutScreen', () => WorkoutContainer, Provider, store);
  Navigation.registerComponentWithRedux('WorkoutScreen.Add', () => WorkoutAddContainer, Provider, store);
  Navigation.registerComponentWithRedux('DayScreen', () => DayContainer, Provider, store);
  Navigation.registerComponentWithRedux('DayScreen.Add', () => DayAddContainer, Provider, store);
  Navigation.registerComponentWithRedux('ExerciseScreen', () => ExerciseContainer, Provider, store);
  Navigation.registerComponentWithRedux('ExerciseScreen.Add', () => ExerciseAddContainer, Provider, store);
};
