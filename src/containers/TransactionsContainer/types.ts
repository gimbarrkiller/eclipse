import { Row } from 'react-table';

import { OnlyStatusType } from 'types';
import { CurrencyName } from 'appConstants';

export type TransactionsType = {
  type: 'outgoing' | 'ingoing',
  id: number,
  sum: string,
  currency: CurrencyName,
  date: Date,
  status: OnlyStatusType,
  from_user: number,
};

export interface TransactionsRowProps<T extends object = TransactionsType> {
  row: Row<T>;
  className?: string;
}
