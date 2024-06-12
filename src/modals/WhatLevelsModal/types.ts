import { Row } from 'react-table';

export type WhatLvlType = {
  licensesSold: string | number,
  percent: string | number,
};

export interface WhatLvlTypeRowProps<T extends object = WhatLvlType> {
  row: Row<T>;
  className?: string;
}
