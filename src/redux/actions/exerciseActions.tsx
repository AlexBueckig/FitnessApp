import * as types from '../../types/exerciseTypes';
import * as constants from '../constants/exerciseConstants';

export function getExercises(): types.IGetExercises {
  return {
    type: constants.GET_EXERCISES
  };
}

export function getExercisesSuccess(exercises: types.IExercises): types.IGetExercisesSuccess {
  return {
    type: constants.GET_EXERCISES_SUCCESS,
    exercises
  };
}

export function getExercisesFailure(error: string): types.IGetExercisesFailure {
  return {
    type: constants.GET_EXERCISES_FAILURE,
    error
  };
}

export function getExerciseById(id: number): types.IGetExerciseById {
  return {
    type: constants.GET_EXERCISE_BY_ID,
    id
  };
}

export function getExerciseByIdSuccess(exercise: types.IExercise): types.IGetExerciseByIdSuccess {
  return {
    type: constants.GET_EXERCISE_BY_ID_SUCCESS,
    exercise
  };
}

export function getExerciseByIdFailure(error: string): types.IGetExerciseByIdFailure {
  return {
    type: constants.GET_EXERCISE_BY_ID_FAILURE,
    error
  };
}

export function saveExercise(exercise: types.IExercise): types.ISaveExercise {
  return {
    type: constants.SAVE_EXERCISE,
    exercise
  };
}

export function saveExerciseSuccess(exercise: types.IExercise): types.ISaveExerciseSuccess {
  return {
    type: constants.SAVE_EXERCISE_SUCCESS,
    exercise
  };
}

export function saveExerciseFailure(error: string): types.ISaveExerciseFailure {
  return {
    type: constants.SAVE_EXERCISE_FAILURE,
    error
  };
}

export function deleteExercise(id: number): types.IDeleteExercise {
  return {
    type: constants.DELETE_EXERCISE,
    id
  };
}

export function deleteExerciseSuccess(id: number): types.IDeleteExerciseSuccess {
  return {
    type: constants.DELETE_EXERCISE_SUCCESS,
    id
  };
}

export function deleteExerciseFailure(error: string): types.IDeleteExerciseFailure {
  return {
    type: constants.DELETE_EXERCISE_FAILURE,
    error
  };
}
