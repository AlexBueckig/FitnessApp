import { call, put, takeLatest } from 'redux-saga/effects';

import api from '../../api/';
import * as constants from '../constants/feedConstants';

export function* getFeedSaga() {
  try {
    const posts = yield call(api.feed.posts);
    yield put({ type: constants.GET_FEED_SUCCESS, posts });
  } catch (error) {
    yield put({ type: constants.GET_FEED_FAILURE, error });
  }
}

export const feedSagas = [takeLatest('GET_FEED', getFeedSaga)];