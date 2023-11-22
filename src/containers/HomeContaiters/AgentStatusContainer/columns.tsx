import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useColumns = () => {
  const { t } = useTranslation('welcome');
  return (
    useMemo(() => [
      {
        Header: t('Agent_status_'),
        accessor: 'status',
      },
      {
        Header: t('Agent_turnover_'),
        accessor: 'turnover',
      },
      {
        Header: t('Agent_team_turnover_'),
        accessor: 'teamTurnover',
      },
    ], [t])
  );
};
