import { IWorkout, IWorkoutAction, IWorkoutState } from '../../types/workoutTypes';
import * as constants from '../constants/workoutConstants';

const initialState = {
  workouts: { count: 0, results: [] },
  currentWorkout: { id: 0, days: [], comment: '', creation_date: new Date() },
  error: '',
  isFetching: false
};

export default (state: IWorkoutState = initialState, action: IWorkoutAction): IWorkoutState => {
  switch (action.type) {
    case constants.GET_WORKOUTS:
    case constants.GET_WORKOUT_BY_ID:
      return { ...state, isFetching: true };
    case constants.GET_WORKOUTS_SUCCESS:
      return { ...state, workouts: action.workouts, isFetching: false };
    case constants.GET_WORKOUTS_FAILURE:
      return { ...state, workouts: { count: 0, results: [] }, error: action.error, isFetching: false };
    case constants.DELETE_WORKOUT_SUCCESS:
      const index = state.workouts.results.findIndex((element: IWorkout) => element.id === action.id);
      const results = state.workouts.results;
      results.splice(index, 1);
      return { ...state, workouts: { count: results.length, results } };
    case constants.GET_WORKOUT_BY_ID_SUCCESS:
      return { ...state, currentWorkout: action.workout, isFetching: false };
    case constants.GET_WORKOUT_BY_ID_FAILURE:
      return {
        ...state,
        currentWorkout: { id: 0, comment: '', creation_date: new Date(), days: [] },
        isFetching: false
      };
    default:
      return state;
  }
};
