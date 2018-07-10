import { IFeedState } from './feedTypes';
import { IWorkoutState } from './workoutTypes';

export default interface IStoreState {
  feed: IFeedState;
  workouts: IWorkoutState;
}
