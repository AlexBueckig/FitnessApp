import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../api/';
import { IDeleteDay, IGetDayById, ISaveDay } from '../../types/dayTypes';
import * as constants from '../constants/dayConstants';

export function* getDaysSaga() {
  try {
    const days = yield call(api.realm.day.getDays);
    yield put({ type: constants.GET_DAYS_SUCCESS, days });
  } catch (error) {
    yield put({ type: constants.GET_DAYS_FAILURE, error });
  }
}

export function* getDayByIdSaga(action: IGetDayById) {
  try {
    const day = yield call(api.realm.day.getDayById, action.id);
    yield put({ type: constants.GET_DAY_BY_ID_SUCCESS, day });
  } catch (error) {
    yield put({ type: constants.GET_DAY_BY_ID_FAILURE, error });
  }
}

export function* saveDaySaga(action: ISaveDay) {
  try {
    const day = yield call(api.realm.day.saveDay, action.day);
    yield put({ type: constants.SAVE_DAY_SUCCESS, day });
  } catch (error) {
    yield put({ type: constants.SAVE_DAY_FAILURE, error });
  }
}

export function* deleteDaySaga(action: IDeleteDay) {
  try {
    const id = yield call(api.realm.day.deleteDay, action.id);
    yield put({ type: constants.DELETE_DAY_SUCCESS, id });
  } catch (error) {
    yield put({ type: constants.DELETE_DAY_FAILURE });
  }
}

export const daySagas = [
  takeLatest(constants.GET_DAYS, getDaysSaga),
  takeLatest(constants.GET_DAY_BY_ID, getDayByIdSaga),
  takeLatest(constants.SAVE_DAY, saveDaySaga),
  takeLatest(constants.DELETE_DAY, deleteDaySaga)
];
