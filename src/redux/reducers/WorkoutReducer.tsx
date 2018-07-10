import { IWorkoutsAction, IWorkoutState } from '../../types/workoutTypes';
import * as constants from '../constants/workoutConstants';

export default (
  state: IWorkoutState = { workouts: { count: 0, results: [] }, currentWorkout: 0, error: '' },
  action: IWorkoutsAction
): IWorkoutState => {
  switch (action.type) {
    case constants.GET_WORKOUTS_SUCCESS:
      return { ...state, workouts: action.workouts };
    case constants.GET_WORKOUTS_FAILURE:
      return { ...state, workouts: { count: 0, results: [] }, error: action.error };
    default:
      return state;
  }
};
