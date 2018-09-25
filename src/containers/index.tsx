import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import FeedContainer from '../containers/FeedContainer';
import WorkoutAddContainer from '../containers/WorkoutAddContainer';
import WorkoutContainer from '../containers/WorkoutContainer';
import AchievementScreen from '../screens/AchievementScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SecondScreen from '../screens/SecondScreen';

// @ts-ignore
import IStoreState from '../types';

const registerScreens = (store: Store<IStoreState>) => {
  Navigation.registerComponentWithRedux('FeedScreen', () => FeedContainer, Provider, store);
  Navigation.registerComponentWithRedux('SecondScreen', () => SecondScreen, Provider, store);
  Navigation.registerComponentWithRedux('CalendarScreen', () => CalendarScreen, Provider, store);
  Navigation.registerComponentWithRedux('AchievementScreen', () => AchievementScreen, Provider, store);
  Navigation.registerComponentWithRedux('WorkoutScreen', () => WorkoutContainer, Provider, store);
  Navigation.registerComponentWithRedux('WorkoutScreen.Add', () => WorkoutAddContainer, Provider, store);
};

export { registerScreens };
