import React, { useMemo } from 'react';

export const useColumns = () => {
  return useMemo(() => [
    {
      Header: 'Статус',
      accessor: 'bets',
    },
    {
      Header: 'Личный оборот',
      accessor: 'wins',
    },
    {
      Header: 'Командный оборот',
      accessor: 'wagered',
    },
  ], []);
};
