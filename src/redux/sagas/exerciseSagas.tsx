import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../api/';
import { IDeleteExercise, IGetExerciseById, ISaveExercise } from '../../types/exerciseTypes';
import * as constants from '../constants/exerciseConstants';

export function* getExercisesSaga() {
  try {
    const exercises = yield call(api.realm.exercise.getExercises);
    yield put({ type: constants.GET_EXERCISES_SUCCESS, exercises });
  } catch (error) {
    yield put({ type: constants.GET_EXERCISES_FAILURE, error });
  }
}

export function* getExerciseByIdSaga(action: IGetExerciseById) {
  try {
    const exercise = yield call(api.realm.exercise.getExerciseById, action.id);
    yield put({ type: constants.GET_EXERCISE_BY_ID_SUCCESS, exercise });
  } catch (error) {
    console.log(error);
    yield put({ type: constants.GET_EXERCISE_BY_ID_FAILURE, error });
  }
}

export function* saveExerciseSaga(action: ISaveExercise) {
  try {
    const exercise = yield call(api.realm.exercise.saveExercise, action.exercise);
    yield put({ type: constants.SAVE_EXERCISE_SUCCESS, exercise });
  } catch (error) {
    yield put({ type: constants.SAVE_EXERCISE_FAILURE, error });
  }
}

export function* deleteExerciseSaga(action: IDeleteExercise) {
  try {
    const id = yield call(api.realm.exercise.deleteExercise, action.id);
    yield put({ type: constants.DELETE_EXERCISE_SUCCESS, id });
  } catch (error) {
    yield put({ type: constants.DELETE_EXERCISE_FAILURE });
  }
}

export const exerciseSagas = [
  takeLatest(constants.GET_EXERCISES, getExercisesSaga),
  takeLatest(constants.GET_EXERCISE_BY_ID, getExerciseByIdSaga),
  takeLatest(constants.SAVE_EXERCISE, saveExerciseSaga),
  takeLatest(constants.DELETE_EXERCISE, deleteExerciseSaga)
];
