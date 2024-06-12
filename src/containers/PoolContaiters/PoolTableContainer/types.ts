import { Row } from 'react-table';

export type PoolType = {
  id: number,
  referral: string,
  avatar: string,
  active: boolean,
  numberLicensesSold: string | number,
  numberActiveLicenses: string | number,
  turnover: string | number,
};

export interface PoolRowProps<T extends object = PoolType> {
  row: Row<T>;
  className?: string;
}
