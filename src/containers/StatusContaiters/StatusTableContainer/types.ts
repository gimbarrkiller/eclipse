import { Row } from 'react-table';

export type StatusType = {
  id: number,
  referral: string,
  avatar: string,
  active: boolean,
  numberLicensesSold: number,
  numberActiveLicenses: number,
  turnover: number,
};

export type StatusRequestType = {
  referrals: {
    id: number,
    first_name: string,
    last_name: string,
    avatar: string,
    active: true,
    licenses_sold: number,
    active_referrals_count: number,
    total_sales: number,
  }[],
};

export interface StatusRowProps<T extends object = StatusType> {
  row: Row<T>;
  className?: string;
}
