import * as constants from '../redux/constants/exerciseConstants';

export interface IExerciseState {
  exercises: IExercises;
  currentExercise: IExercise;
  error?: string;
  isFetching: boolean;
}

export interface IExercises {
  count: number;
  results: IExercise[];
}

export interface IExercise {
  id: number;
  name: string;
  description?: string;
  muscles?: number[];
  muscles_secondary?: number[];
  category?: string; // ICategory
}

/* Exercise Actions */
export interface IGetExercises {
  type: constants.GET_EXERCISES;
}

export interface IGetExercisesSuccess {
  type: constants.GET_EXERCISES_SUCCESS;
  exercises: IExercises;
}

export interface IGetExercisesFailure {
  type: constants.GET_EXERCISES_FAILURE;
  error: string;
}

export type IGetExercisesAction = IGetExercises | IGetExercisesSuccess | IGetExercisesFailure;

export interface IGetExerciseById {
  type: constants.GET_EXERCISE_BY_ID;
  id: number;
}

export interface IGetExerciseByIdSuccess {
  type: constants.GET_EXERCISE_BY_ID_SUCCESS;
  exercise: IExercise;
}

export interface IGetExerciseByIdFailure {
  type: constants.GET_EXERCISE_BY_ID_FAILURE;
  error: string;
}

export type IGetExerciseByIdAction = IGetExerciseById | IGetExerciseByIdSuccess | IGetExerciseByIdFailure;

export interface ISaveExercise {
  type: constants.SAVE_EXERCISE;
  exercise: IExercise;
}

export interface ISaveExerciseSuccess {
  type: constants.SAVE_EXERCISE_SUCCESS;
  exercise: IExercise;
}

export interface ISaveExerciseFailure {
  type: constants.SAVE_EXERCISE_FAILURE;
  error: string;
}

export type ISaveExerciseAction = ISaveExercise | ISaveExerciseSuccess | ISaveExerciseFailure;

export interface IDeleteExercise {
  type: constants.DELETE_EXERCISE;
  id: number;
}

export interface IDeleteExerciseSuccess {
  type: constants.DELETE_EXERCISE_SUCCESS;
  id: number;
}

export interface IDeleteExerciseFailure {
  type: constants.DELETE_EXERCISE_FAILURE;
  error: string;
}

export type IDeleteExerciseAction = IDeleteExercise | IDeleteExerciseSuccess | IDeleteExerciseFailure;

export type IExerciseAction =
  | IGetExercisesAction
  | IGetExerciseByIdAction
  | ISaveExerciseAction
  | IDeleteExerciseAction;
