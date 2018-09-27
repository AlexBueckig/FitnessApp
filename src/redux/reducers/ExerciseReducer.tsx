import { IExercise, IExerciseAction, IExerciseState } from '../../types/exerciseTypes';
import * as constants from '../constants/exerciseConstants';

const initialState = {
  exercises: { count: 0, results: [] },
  currentExercise: { id: 0, description: '', name: '' },
  error: '',
  isFetching: false
};

export default (state: IExerciseState = initialState, action: IExerciseAction): IExerciseState => {
  switch (action.type) {
    case constants.GET_EXERCISES:
    case constants.GET_EXERCISE_BY_ID:
      return { ...state, isFetching: true };
    case constants.GET_EXERCISES_SUCCESS:
      return { ...state, exercises: action.exercises, isFetching: false };
    case constants.GET_EXERCISES_FAILURE:
      return { ...state, exercises: { count: 0, results: [] }, error: action.error, isFetching: false };
    case constants.DELETE_EXERCISE_SUCCESS:
      const index = state.exercises.results.findIndex((element: IExercise) => element.id === action.id);
      const results = state.exercises.results;
      results.splice(index, 1);
      return { ...state, exercises: { count: results.length, results } };
    case constants.GET_EXERCISE_BY_ID_SUCCESS:
      return { ...state, currentExercise: action.exercise, isFetching: false };
    case constants.GET_EXERCISE_BY_ID_FAILURE:
      return {
        ...state,
        currentExercise: { id: 0, description: '', name: '' },
        isFetching: false
      };
    default:
      return state;
  }
};
