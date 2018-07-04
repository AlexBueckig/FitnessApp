import * as constants from '../constants/workoutConstants';
import {
  IGetWorkoutById,
  IGetWorkoutByIdFailure,
  IGetWorkoutByIdSuccess,
  IGetWorkouts,
  IGetWorkoutsFailure,
  IGetWorkoutsSuccess,
  IWorkout,
  IWorkouts
} from '../types/workoutTypes';

export function getWorkouts(): IGetWorkouts {
  return {
    type: constants.GET_WORKOUTS
  };
}

export function getWorkoutsSuccess(workouts: IWorkouts): IGetWorkoutsSuccess {
  return {
    type: constants.GET_WORKOUTS_SUCCESS,
    workouts
  };
}

export function getWorkoutsFailure(error: string): IGetWorkoutsFailure {
  return {
    type: constants.GET_WORKOUTS_FAILURE,
    error
  };
}

export function getWorkoutById(id: number): IGetWorkoutById {
  return {
    type: constants.GET_WORKOUT_BY_ID,
    id
  };
}

export function getWorkoutByIdSuccess(workout: IWorkout): IGetWorkoutByIdSuccess {
  return {
    type: constants.GET_WORKOUT_BY_ID_SUCCESS,
    workout
  };
}

export function getWorkoutByIdFailure(error: string): IGetWorkoutByIdFailure {
  return {
    type: constants.GET_WORKOUT_BY_ID_FAILURE,
    error
  };
}
