import { all } from 'redux-saga/effects';

import { ConnectUsEffects } from './connectUs/sagas';
import { ProfileEffects } from './profile/sagas';
import { PartnerEffects } from './partner/sagas';
import { TransactionsEffects } from './transactions/sagas';
import { TicketEffects } from './ticket/sagas';
import { StatusEffects } from './status/sagas';
import { PoolEffects } from './pool/sagas';
import { AuthEffects } from './auth/sagas';
import { NewsEffects } from './news/sagas';
import { DocumentsEffects } from './documents/sagas';

export default function* rootSaga() {
  yield all([
    ...ConnectUsEffects,
    ...ProfileEffects,
    ...PartnerEffects,
    ...TransactionsEffects,
    ...TicketEffects,
    ...StatusEffects,
    ...PoolEffects,
    ...AuthEffects,
    ...NewsEffects,
    ...DocumentsEffects,
  ]);
}
