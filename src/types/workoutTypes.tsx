import * as constants from '../redux/constants/workoutConstants';

/* WorkoutTypes */
export interface IWorkoutState {
  currentWorkout: IWorkout;
  workouts: IWorkouts;
  error?: string;
  isFetching: boolean;
}

export interface IExercise {
  exerciseId: number;
}

export interface IWorkout {
  comment: string;
  id: number;
  creation_date: Date;
  days: IDay[];
}

export interface IDay {
  id: number;
  description: string;
  day?: number[];
  sets?: ISet[];
}

export interface ISet {
  id: number;
  order: number;
  sets: number;
  exercises: number[];
  settings: ISetting[];
}

export interface ISetting {
  id: number;
  exercise: number;
  repetition_unit: string;
  weight_unit: string;
  comment: string;
  order: number;
  reps: number;
  weight: number;
}

export interface IWorkouts {
  count: number;
  results: IWorkout[];
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

export type IGetWorkoutsAction = IGetWorkouts | IGetWorkoutsSuccess | IGetWorkoutsFailure;

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

export interface IDeleteWorkout {
  type: constants.DELETE_WORKOUT;
  id: number;
}

export interface IDeleteWorkoutSuccess {
  type: constants.DELETE_WORKOUT_SUCCESS;
  id: number;
}

export interface IDeleteWorkoutFailure {
  type: constants.DELETE_WORKOUT_FAILURE;
  error: string;
}

export type IDeleteWorkoutAction = IDeleteWorkout | IDeleteWorkoutSuccess | IDeleteWorkoutFailure;

export type IWorkoutAction = IGetWorkoutsAction | IGetWorkoutByIdAction | ISaveWorkoutAction | IDeleteWorkoutAction;
