import { IExercise, IExerciseAction, IExerciseState } from '../../types/exerciseTypes';
import * as constants from '../constants/exerciseConstants';

const initialState = {
  exercises: { count: 0, results: [] },
  currentExercise: { id: 0, description: '', name: '', category: '', muscles: [] },
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
      let count = 0;
      const results = state.exercises.results.map(element => {
        const index = element.data.findIndex((ex: IExercise) => ex.id === action.id);
        const exercises = element.data;
        if (index !== -1) {
          exercises.splice(index, 1);
        }
        count += exercises.length;
        return { title: element.title, data: exercises };
      });
      return { ...state, exercises: { count, results } };
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
