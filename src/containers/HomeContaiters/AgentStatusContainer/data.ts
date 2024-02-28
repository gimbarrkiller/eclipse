import { useMemo } from 'react';

export const useData = (t: (s: string) => void) => useMemo(
  () => [
    {
      status: t('Seller_'),
      turnover: '100',
      teamTurnover: '2 500',
    },
    {
      status: t('Advanced_Seller_'),
      turnover: '100',
      teamTurnover: '5 000',
    },
    {
      status: t('Premium_Seller_'),
      turnover: '100',
      teamTurnover: '7 500',
    },
    {
      status: t('Top_Seller_'),
      turnover: '100',
      teamTurnover: '10 000',
    },
  ],
  [t],
);
