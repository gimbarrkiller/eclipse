import { all } from 'redux-saga/effects';
import { FullListEffects } from './fullList/sagas';

export default function* rootSaga() {
  yield all([
    ...FullListEffects,
  ]);
}
