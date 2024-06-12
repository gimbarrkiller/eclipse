import { CurrencyName } from 'appConstants';
import { TransactionsState } from 'types';

import { TransactionsActionType } from './actionsTypes';

export const transactionsSetState = (payload: Partial<TransactionsState>) => ({
  type: TransactionsActionType.SetState,
  payload,
});

export const getTransactionsData = () => ({
  type: TransactionsActionType.GET_TRANSACTIONS,
});

export const getTransactionsRatesData = () => ({
  type: TransactionsActionType.GET_TRANSACTIONS_RATES,
});

export const withdrawTransactions = (
  payload: {
    currency: CurrencyName,
    amount?: string,
    description?: string,
    payment_details?: string,
    receiving_country?: string,
    name?: string,
    address?: string,
    city?: string,
    country?: string,
    iban?: string,
    swift?: string,
    bank_account_name?: string,
    swift_code?: string,
    bank_account_correspondent_account?: string,
    bank_account_address?: string,
    bank_account_city?: string,
    onCallback: () => void,
  },
) => ({
  type: TransactionsActionType.WITHDRAW_DEPOSIT,
  payload,
});
