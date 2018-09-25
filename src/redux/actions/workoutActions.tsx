import * as types from '../../types/workoutTypes';
import * as constants from '../constants/workoutConstants';

export function getWorkouts(): types.IGetWorkouts {
  return {
    type: constants.GET_WORKOUTS
  };
}

export function getWorkoutsSuccess(workouts: types.IWorkouts): types.IGetWorkoutsSuccess {
  return {
    type: constants.GET_WORKOUTS_SUCCESS,
    workouts
  };
}

export function getWorkoutsFailure(error: string): types.IGetWorkoutsFailure {
  return {
    type: constants.GET_WORKOUTS_FAILURE,
    error
  };
}

export function getWorkoutById(id: number): types.IGetWorkoutById {
  return {
    type: constants.GET_WORKOUT_BY_ID,
    id
  };
}

export function getWorkoutByIdSuccess(workout: types.IWorkout): types.IGetWorkoutByIdSuccess {
  return {
    type: constants.GET_WORKOUT_BY_ID_SUCCESS,
    workout
  };
}

export function getWorkoutByIdFailure(error: string): types.IGetWorkoutByIdFailure {
  return {
    type: constants.GET_WORKOUT_BY_ID_FAILURE,
    error
  };
}

export function saveWorkout(workout: types.IWorkout): types.ISaveWorkout {
  return {
    type: constants.SAVE_WORKOUT,
    workout
  };
}

export function saveWorkoutSuccess(workout: types.IWorkout): types.ISaveWorkoutSuccess {
  return {
    type: constants.SAVE_WORKOUT_SUCCESS,
    workout
  };
}

export function saveWorkoutFailure(error: string): types.ISaveWorkoutFailure {
  return {
    type: constants.SAVE_WORKOUT_FAILURE,
    error
  };
}

export function deleteWorkout(id: number): types.IDeleteWorkout {
  return {
    type: constants.DELETE_WORKOUT,
    id
  };
}

export function deleteWorkoutSuccess(id: number): types.IDeleteWorkoutSuccess {
  return {
    type: constants.DELETE_WORKOUT_SUCCESS,
    id
  };
}

export function deleteWorkoutFailure(error: string): types.IDeleteWorkoutFailure {
  return {
    type: constants.DELETE_WORKOUT_FAILURE,
    error
  };
}
