import { Row } from 'react-table';

export type AutoBonusRequestType = {
  next_update: string,
  autobonus: {
    id: number
    active?: boolean,
    model: string,
    personal_sales: number,
    referral_sales: number,
    reward: number,
  }[],
};

export type AutoBonusType = {
  id: number,
  active?: boolean,
  model: string,
  personalSales: number,
  refSales: number,
  reward: number,
};

export interface AutoBonusRowProps<T extends object = AutoBonusType> {
  row: Row<T>;
  className?: string;
}
