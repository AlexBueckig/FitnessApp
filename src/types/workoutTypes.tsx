import * as constants from '../redux/constants/workoutConstants';

/* WorkoutTypes */
export interface IWorkoutState {
  currentWorkout: number;
  workouts: IWorkouts;
  error?: string;
}

export interface IExercise {
  exerciseId: number;
}

export interface IWorkout {
  comment?: string;
  id: number;
  creation_date?: string;
}

export interface IWorkouts {
  count: number;
  results: IWorkout[];
  comment?: string;
}

/* Action Types */
export interface IGetWorkouts {
  type: constants.GET_WORKOUTS;
}

export interface IGetWorkoutsSuccess {
  type: constants.GET_WORKOUTS_SUCCESS;
  workouts: IWorkouts;
}

export interface IGetWorkoutsFailure {
  type: constants.GET_WORKOUTS_FAILURE;
  error: string;
}

export type IWorkoutsAction = IGetWorkouts | IGetWorkoutsSuccess | IGetWorkoutsFailure;

export interface IGetWorkoutById {
  type: constants.GET_WORKOUT_BY_ID;
  id: number;
}

export interface IGetWorkoutByIdSuccess {
  type: constants.GET_WORKOUT_BY_ID_SUCCESS;
  workout: IWorkout;
}

export interface IGetWorkoutByIdFailure {
  type: constants.GET_WORKOUT_BY_ID_FAILURE;
  error: string;
}

export type IGetWorkoutByIdAction = IGetWorkoutById | IGetWorkoutByIdSuccess | IGetWorkoutByIdFailure;

export interface ISaveWorkout {
  type: constants.SAVE_WORKOUT;
  workout: IWorkout;
}

export interface ISaveWorkoutSuccess {
  type: constants.SAVE_WORKOUT_SUCCESS;
  workout: IWorkout;
}

export interface ISaveWorkoutFailure {
  type: constants.SAVE_WORKOUT_FAILURE;
  error: string;
}

export type ISaveWorkoutAction = ISaveWorkout | ISaveWorkoutSuccess | ISaveWorkoutFailure;
