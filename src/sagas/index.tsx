import { all } from 'redux-saga/effects';

import { feedSagas } from './feedSagas';

export default function* rootSaga() {
  // [...feedSagas, ...barSagas]
  yield all([...feedSagas]);
}
