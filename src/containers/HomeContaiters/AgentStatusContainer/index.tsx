import React, { memo } from 'react';
import { Column } from 'react-table';

import { agentIcon } from 'assets/images';

import { Image, Table, TitleBorderBottom } from 'components';

import { data } from './data';

import styles from './styles.module.scss';
import { useColumns } from './columns';

export const AgentStatusContainer = memo(() => {
  const columns = useColumns();

  return (
    <div className={styles.agent_container}>
      <Image
        url={agentIcon}
        className={styles.agent_title_bg}
      />
      <div className={styles.agent_container_first}>
        <div className={styles.agent_title}>
          Агент статус
          <TitleBorderBottom />
        </div>
        <div className={styles.agent_percent}>
          <div className={styles.agent_percent_item}>
            <div className={styles.agent_percent_item_title}>
              2%
            </div>
            <div className={styles.agent_percent_item_subtitle}>
              Advanced seller
            </div>
          </div>
          <div className={styles.agent_percent_border} />
          <div className={styles.agent_percent_item}>
            <div className={styles.agent_percent_item_title}>
              2%
            </div>
            <div className={styles.agent_percent_item_subtitle}>
              Top seller
            </div>
          </div>
        </div>
        <div className={styles.agent_container_first_text}>
          Выплачивается каждый месяц от мирового Т/О
          <br />
          Top seller учавствует в 2 пулах
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
