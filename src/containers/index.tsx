import { Navigation } from 'react-native-navigation';
import DayAddModal from '../modals/DayAdd/DayAddModal';
import DayAddExerciseModal from '../modals/DayAddExercise/DayAddExerciseModal';
import WorkoutAddModal from '../modals/WorkoutAdd/WorkoutAddModal';
import WorkoutEditModal from '../modals/WorkoutEdit/WorkoutEditModal';
import DBWrapper from '../watermelondb/DBProvider';
import EnhancedCurrentWorkoutDayContainer, { CurrentWorkoutDayContainer } from './CurrentWorkoutDayContainer';
import CurrentWorkoutExerciseContainer from './CurrentWorkoutExerciseContainer';
import EnhancedDayEditContainer, { DayEditContainer } from './DayEditContainer';
import ExerciseAddContainer from './ExerciseAddContainer';
import EnhancedExerciseContainer, { ExerciseContainer } from './ExerciseContainer';
import EnhancedExerciseEditContainer, { ExerciseEditContainer } from './ExerciseEditContainer';
import HomeContainer from './HomeContainer';
import AchievementScreen from './screens/AchievementScreen';
import DayScreen from './screens/DayScreen';
import WorkoutMenuScreen from './screens/WorkoutMenuScreen';
import EnhancedWorkoutContainer, { WorkoutContainer } from './WorkoutContainer';
import EnhancedWorkoutEditContainer, { WorkoutEditContainer } from './WorkoutEditContainer';
import WorkoutLogContainer from './WorkoutLogContainer';

export const registerScreens = () => {
  Navigation.registerComponent('WorkoutMenuScreen', () => WorkoutMenuScreen);
  Navigation.registerComponent('AchievementScreen', () => AchievementScreen);
  Navigation.registerComponent('FeedScreen', () => DBWrapper(HomeContainer), () => HomeContainer);
  Navigation.registerComponent('WorkoutLogScreen', () => DBWrapper(WorkoutLogContainer), () => WorkoutLogContainer);
  Navigation.registerComponent(
    'CurrentWorkoutDayScreen',
    () => DBWrapper(EnhancedCurrentWorkoutDayContainer),
    () => CurrentWorkoutDayContainer
  );
  Navigation.registerComponent(
    'CurrentWorkoutExerciseScreen',
    () => DBWrapper(CurrentWorkoutExerciseContainer),
    () => CurrentWorkoutExerciseContainer
  );
  Navigation.registerComponent('WorkoutScreen', () => DBWrapper(EnhancedWorkoutContainer), () => WorkoutContainer);
  Navigation.registerComponent(
    'WorkoutScreen.Edit',
    () => DBWrapper(EnhancedWorkoutEditContainer),
    () => WorkoutEditContainer
  );
  Navigation.registerComponent('DayScreen', () => DayScreen);
  Navigation.registerComponent('DayScreen.Edit', () => DBWrapper(EnhancedDayEditContainer), () => DayEditContainer);
  Navigation.registerComponent('ExerciseScreen', () => DBWrapper(EnhancedExerciseContainer), () => ExerciseContainer);
  Navigation.registerComponent(
    'ExerciseScreen.Edit',
    () => DBWrapper(EnhancedExerciseEditContainer),
    () => ExerciseEditContainer
  );
  Navigation.registerComponent('ExerciseScreen.Add', () => ExerciseAddContainer);
  Navigation.registerComponent('DayAddModal', () => DBWrapper(DayAddModal), () => DayAddModal);
  Navigation.registerComponent('WorkoutAddModal', () => WorkoutAddModal);
  Navigation.registerComponent('WorkoutEditModal', () => DBWrapper(WorkoutEditModal), () => WorkoutEditModal);
  Navigation.registerComponent('DayAddExerciseModal', () => DBWrapper(DayAddExerciseModal), () => DayAddExerciseModal);
};
