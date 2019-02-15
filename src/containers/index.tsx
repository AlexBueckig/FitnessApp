import React, { ComponentClass, Fragment } from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import AchievementScreen from '../screens/AchievementScreen';
import FeedScreen from '../screens/FeedScreen';
import WorkoutMenuScreen from '../screens/WorkoutMenuScreen';
import IStoreState from '../types';
import DayAddContainer from './DayAddContainer';
import DayContainer from './DayContainer';
import ExerciseAddContainer from './ExerciseAddContainer';
import ExerciseContainer from './ExerciseContainer';
import FeedContainer from './FeedContainer';
import ToastsContainer from './ToastsContainer';
import WorkoutAddContainer from './WorkoutAddContainer';
import WorkoutContainer from './WorkoutContainer';

function WrappedComponent(Screen: ComponentClass<any>, store: Store<IStoreState>) {
  return function inject(props: any) {
    const EnhancedComponent = () => (
      <Provider store={store}>
        <Fragment>
          <Screen {...props} />
          <ToastsContainer />
        </Fragment>
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

export const registerScreens = (store: Store<IStoreState>) => {
  Navigation.registerComponent('WorkoutMenuScreen', () => WorkoutMenuScreen);
  Navigation.registerComponent('AchievementScreen', () => AchievementScreen);
  Navigation.registerComponent('FeedScreen', () => WrappedComponent(FeedContainer, store), () => FeedScreen);
  Navigation.registerComponent(
    'WorkoutScreen',
    () => WrappedComponent(WorkoutContainer, store),
    () => WorkoutContainer
  );
  Navigation.registerComponent(
    'WorkoutScreen.Add',
    () => WrappedComponent(WorkoutAddContainer, store),
    () => WorkoutAddContainer
  );
  Navigation.registerComponent('DayScreen', () => WrappedComponent(DayContainer, store), () => DayContainer);
  Navigation.registerComponent('DayScreen.Add', () => WrappedComponent(DayAddContainer, store), () => DayAddContainer);
  Navigation.registerComponent(
    'ExerciseScreen',
    () => WrappedComponent(ExerciseContainer, store),
    () => ExerciseContainer
  );
  Navigation.registerComponent(
    'ExerciseScreen.Add',
    () => WrappedComponent(ExerciseAddContainer, store),
    () => ExerciseAddContainer
  );
};
