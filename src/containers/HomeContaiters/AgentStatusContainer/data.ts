import { useMemo } from 'react';

export const useData = (t: (s: string) => void) => useMemo(
  () => [
    {
      status: t('seller'),
      turnover: '100',
      teamTurnover: '2 500',
    },
    {
      status: t('advanced_seller'),
      turnover: '100',
      teamTurnover: '5 000',
    },
    {
      status: t('premium_seller'),
      turnover: '100',
      teamTurnover: '7 500',
    },
    {
      status: t('top_seller'),
      turnover: '100',
      teamTurnover: '10 000',
    },
  ],
  [t],
);
