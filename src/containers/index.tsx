import React, { ComponentClass, SFC } from 'react';
import { Navigation } from 'react-native-navigation';
import AchievementScreen from '../screens/AchievementScreen';
import WorkoutMenuScreen from '../screens/WorkoutMenuScreen';
import DBProvider from '../watermelondb/DBProvider';
import ExerciseAddContainer from './ExerciseAddContainer';
import EnhancedExerciseContainer, { ExerciseContainer } from './ExerciseContainer';
import EnhancedExerciseEditContainer, { ExerciseEditContainer } from './ExerciseEditContainer';

function DBWrapper<P = {}>(Screen: ComponentClass<P>) {
  const EnhancedComponent: SFC<P> = props => (
    <DBProvider>
      <Screen {...props} />
    </DBProvider>
  );

  return EnhancedComponent;
}

export const registerScreens = () => {
  Navigation.registerComponent('WorkoutMenuScreen', () => WorkoutMenuScreen);
  Navigation.registerComponent('AchievementScreen', () => AchievementScreen);
  Navigation.registerComponent('FeedScreen', () => WorkoutMenuScreen);
  Navigation.registerComponent('WorkoutScreen', () => WorkoutMenuScreen);
  Navigation.registerComponent('WorkoutScreen.Add', () => WorkoutMenuScreen);
  Navigation.registerComponent('DayScreen', () => WorkoutMenuScreen);
  Navigation.registerComponent('DayScreen.Add', () => WorkoutMenuScreen);
  Navigation.registerComponent('ExerciseScreen', () => DBWrapper(EnhancedExerciseContainer), () => ExerciseContainer);
  Navigation.registerComponent(
    'ExerciseScreen.Edit',
    () => DBWrapper(EnhancedExerciseEditContainer),
    () => ExerciseEditContainer
  );
  Navigation.registerComponent('ExerciseScreen.Add', () => ExerciseAddContainer);
};
