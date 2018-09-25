import { all } from 'redux-saga/effects';

import { feedSagas } from './feedSagas';
import { workoutSagas } from './workoutSagas';

export default function* rootSaga() {
  yield all([...feedSagas, ...workoutSagas]);
}