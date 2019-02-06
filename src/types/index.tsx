import { IDayState } from './dayTypes';
import { IExerciseState } from './exerciseTypes';
import { IFeedState } from './feedTypes';
import { IToastState } from './toastTypes';
import { IWorkoutState } from './workoutTypes';

export default interface IStoreState {
  feedState: IFeedState;
  workoutsState: IWorkoutState;
  daysState: IDayState;
  exercisesState: IExerciseState;
  toastState: IToastState;
}
