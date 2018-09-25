import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../api/';
import { IDeleteWorkout, IGetWorkoutById, ISaveWorkout } from '../../types/workoutTypes';
import * as constants from '../constants/workoutConstants';

export function* getWorkoutsSaga() {
  try {
    const workouts = yield call(api.realm.workout.getWorkouts);
    yield put({ type: constants.GET_WORKOUTS_SUCCESS, workouts });
  } catch (error) {
    yield put({ type: constants.GET_WORKOUTS_FAILURE, error });
  }
}

export function* getWorkoutByIdSaga(action: IGetWorkoutById) {
  try {
    const workout = yield call(api.realm.workout.getWorkoutById, action.id);
    yield put({ type: constants.GET_WORKOUT_BY_ID_SUCCESS, workout });
  } catch (error) {
    yield put({ type: constants.GET_WORKOUT_BY_ID_FAILURE, error });
  }
}

export function* saveWorkoutSaga(action: ISaveWorkout) {
  try {
    const workout = yield call(api.realm.workout.saveWorkout, action.workout);
    yield put({ type: constants.SAVE_WORKOUT_SUCCESS, workout });
  } catch (error) {
    yield put({ type: constants.SAVE_WORKOUT_FAILURE, error });
  }
}

export function* deleteWorkoutSaga(action: IDeleteWorkout) {
  try {
    const id = yield call(api.realm.workout.deleteWorkout, action.id);
    yield put({ type: constants.DELETE_WORKOUT_SUCCESS, id });
  } catch (error) {
    yield put({ type: constants.DELETE_WORKOUT_FAILURE });
  }
}

export const workoutSagas = [
  takeLatest(constants.GET_WORKOUTS, getWorkoutsSaga),
  takeLatest(constants.GET_WORKOUT_BY_ID, getWorkoutByIdSaga),
  takeLatest(constants.SAVE_WORKOUT, saveWorkoutSaga),
  takeLatest(constants.DELETE_WORKOUT, deleteWorkoutSaga)
];
