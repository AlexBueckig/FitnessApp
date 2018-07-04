import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from '../api/';
import * as constants from '../constants/workoutConstants';
import { IGetWorkoutById, ISaveWorkout } from '../types/workoutTypes';

export function* getWorkoutsSaga() {
  try {
    const workouts = yield call(api.feed.posts);
    yield put({ type: constants.GET_WORKOUTS_SUCCESS, workouts });
  } catch (error) {
    yield put({ type: constants.GET_WORKOUTS_FAILURE, error });
  }
}

export function* getWorkoutByIdSaga(action: IGetWorkoutById) {
  try {
    const workout = yield call(api.feed.posts, action.id);
    yield put({ type: constants.GET_WORKOUT_BY_ID_SUCCESS, workout });
  } catch (error) {
    yield put({ type: constants.GET_WORKOUT_BY_ID_FAILURE, error });
  }
}

export function* saveWorkoutSaga(action: ISaveWorkout) {
  try {
    const workout = yield call(api.feed.posts, action.workout);
    yield put({ type: constants.SAVE_WORKOUT_SUCCESS, workout });
  } catch (error) {
    yield put({ type: constants.SAVE_WORKOUT_FAILURE, error });
  }
}

export const workoutSagas = [
  takeLatest(constants.GET_WORKOUTS, getWorkoutsSaga),
  takeLatest(constants.GET_WORKOUT_BY_ID, getWorkoutByIdSaga),
  takeLatest(constants.SAVE_WORKOUT, saveWorkoutSaga)
];
