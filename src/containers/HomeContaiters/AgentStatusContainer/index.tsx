import React, { memo } from 'react';
import { Column } from 'react-table';
import { useTranslation } from 'react-i18next';

import { agentIcon } from 'assets/images';

import { Image, Table, TitleBorderBottom } from 'components';

import { data } from './data';

import styles from './styles.module.scss';
import { useColumns } from './columns';

export const AgentStatusContainer = memo(() => {
  const { t } = useTranslation('welcome');
  const columns = useColumns();

  return (
    <div className={styles.agent_container}>
      <Image
        url={agentIcon}
        className={styles.agent_title_bg}
      />
      <div className={styles.agent_container_first}>
        <div className={styles.agent_title}>
          {t('Agent_title_')}
          <TitleBorderBottom />
        </div>
        <div className={styles.agent_percent}>
          <div className={styles.agent_percent_item}>
            <div className={styles.agent_percent_item_title}>
              2%
            </div>
            <div className={styles.agent_percent_item_subtitle}>
              {t('Referral_advanced_seller_')}
            </div>
          </div>
          <div className={styles.agent_percent_border} />
          <div className={styles.agent_percent_item}>
            <div className={styles.agent_percent_item_title}>
              2%
            </div>
            <div className={styles.agent_percent_item_subtitle}>
              {t('Referral_top_seller_')}
            </div>
          </div>
        </div>
        <div className={styles.agent_container_first_text}>
          {t('Agent_subtitle_')}
        </div>
      </div>

      <div className={styles.agent_container_second}>
        <Table
          columns={columns as Column<object>[]}
          data={data}
          className={styles.statistics_table}
        />
      </div>
    </div>
  );
});
