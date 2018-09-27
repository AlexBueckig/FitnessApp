import { all } from 'redux-saga/effects';

import { daySagas } from './daySagas';
import { exerciseSagas } from './exerciseSagas';
import { feedSagas } from './feedSagas';
import { workoutSagas } from './workoutSagas';

export default function* rootSaga() {
  yield all([...feedSagas, ...workoutSagas, ...daySagas, ...exerciseSagas]);
}
