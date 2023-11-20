import { useMemo } from 'react';

export const useColumns = () => (
  useMemo(() => [
    {
      Header: 'Статус',
      accessor: 'status',
    },
    {
      Header: 'Личный оборот',
      accessor: 'turnover',
    },
    {
      Header: 'Командный оборот',
      accessor: 'teamTurnover',
    },
  ], [])
);
