import React, {
  memo,
  useCallback,
  useContext,
} from 'react';
import { Column } from 'react-table';

import { ModalContext } from 'context';

import {
  Modal, Table,
} from 'components';

import { data } from './data';
import { useColumns } from './columns';

import styles from './styles.module.scss';

export const WhatLevelsModal = memo(() => {
  const { closeJsxModal } = useContext(ModalContext);
  const columns = useColumns();

  const onCloseJsxModal = useCallback(() => {
    closeJsxModal();
  }, [closeJsxModal]);

  return (
    <Modal
      isOpen
      onClose={onCloseJsxModal}
    >
      <Table
        columns={columns as Column<object>[]}
        data={data}
        className={styles.what_lvl_table}
      />
    </Modal>
  );
});
