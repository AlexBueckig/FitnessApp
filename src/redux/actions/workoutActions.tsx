import {
  IGetWorkoutById,
  IGetWorkoutByIdFailure,
  IGetWorkoutByIdSuccess,
  IGetWorkouts,
  IGetWorkoutsFailure,
  IGetWorkoutsSuccess,
  ISaveWorkout,
  ISaveWorkoutFailure,
  ISaveWorkoutSuccess,
  IWorkout,
  IWorkouts
} from '../../types/workoutTypes';
import * as constants from '../constants/workoutConstants';

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

export function saveWorkout(workout: IWorkout): ISaveWorkout {
  return {
    type: constants.SAVE_WORKOUT,
    workout
  };
}

export function saveWorkoutSuccess(workout: IWorkout): ISaveWorkoutSuccess {
  return {
    type: constants.SAVE_WORKOUT_SUCCESS,
    workout
  };
}

export function saveWorkoutFailure(error: string): ISaveWorkoutFailure {
  return {
    type: constants.SAVE_WORKOUT_FAILURE,
    error
  };
}
