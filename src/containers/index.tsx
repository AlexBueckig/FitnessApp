import React, { FC } from 'react';
import { Navigation } from 'react-native-navigation';
import Modal from '../modals/Modal';
import WorkoutAddModal from '../modals/WorkoutAdd/WorkoutAddModal';
import AchievementScreen from '../screens/AchievementScreen';
import WorkoutMenuScreen from '../screens/WorkoutMenuScreen';
import DBProvider from '../watermelondb/DBProvider';
import EnhancedDayAddContainer, { DayAddContainer } from './DayAddContainer';
import ExerciseAddContainer from './ExerciseAddContainer';
import EnhancedExerciseContainer, { ExerciseContainer } from './ExerciseContainer';
import EnhancedExerciseEditContainer, { ExerciseEditContainer } from './ExerciseEditContainer';
import WorkoutAddContainer from './WorkoutAddContainer';
import EnhancedWorkoutContainer, { WorkoutContainer } from './WorkoutContainer';
import EnhancedWorkoutEditContainer, { WorkoutEditContainer } from './WorkoutEditContainer';

const DBWrapper = (Screen: any) => {
  const EnhancedComponent: FC<any> = props => (
    <DBProvider>
      <Screen {...props} />
    </DBProvider>
  );

  return EnhancedComponent;
};

const ModalWrapper = (Screen: any) => {
  const EnhancedComponent: FC<any> = props => <Modal render={() => <Screen {...props} />} />;

  return EnhancedComponent;
};

export const registerScreens = () => {
  Navigation.registerComponent('WorkoutMenuScreen', () => WorkoutMenuScreen);
  Navigation.registerComponent('AchievementScreen', () => AchievementScreen);
  Navigation.registerComponent('FeedScreen', () => WorkoutMenuScreen);
  Navigation.registerComponent('WorkoutScreen', () => DBWrapper(EnhancedWorkoutContainer), () => WorkoutContainer);
  Navigation.registerComponent('WorkoutScreen.Add', () => WorkoutAddContainer);
  Navigation.registerComponent(
    'WorkoutScreen.Edit',
    () => DBWrapper(EnhancedWorkoutEditContainer),
    () => WorkoutEditContainer
  );
  Navigation.registerComponent('DayScreen', () => WorkoutMenuScreen);
  Navigation.registerComponent('DayScreen.Add', () => WorkoutMenuScreen);
  Navigation.registerComponent('ExerciseScreen', () => DBWrapper(EnhancedExerciseContainer), () => ExerciseContainer);
  Navigation.registerComponent(
    'ExerciseScreen.Edit',
    () => DBWrapper(EnhancedExerciseEditContainer),
    () => ExerciseEditContainer
  );
  Navigation.registerComponent('ExerciseScreen.Add', () => ExerciseAddContainer);
  Navigation.registerComponent(
    'DayAddModal',
    () => ModalWrapper(DBWrapper(EnhancedDayAddContainer)),
    () => DayAddContainer
  );
  Navigation.registerComponent('WorkoutAddModal', () => WorkoutAddModal);
};
