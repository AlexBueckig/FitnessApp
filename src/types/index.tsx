import { IFeedState } from './feedTypes';
import { IWorkoutState } from './workoutTypes';

export default interface IStoreState {
  feedState: IFeedState;
  workoutsState: IWorkoutState;
}
