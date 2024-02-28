/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { memo, ReactNode } from 'react';
import cn from 'classnames';
import {
  Column,
  useExpanded,
  useTable,
} from 'react-table';

import { ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';

import styles from './styles.module.scss';
import { Image } from '../Image';

interface TableProps {
  columns: Column<object>[];
  data: object[];
  className?: string;
  isHome?: boolean;
  renderRowSubComponent?: (row: any) => ReactNode;
  mobileTable?: (row: any) => ReactNode;
  imageNotData?: string;
  textNotData?: string;
}

export const Table = memo<TableProps>(({
  columns,
  data,
  className,
  isHome,
  renderRowSubComponent,
  mobileTable,
  imageNotData,
  textNotData,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable({
    columns,
    data,
  }, useExpanded);
  const isTablet = useScreenWidth(ScreenWidth.tablet);

  return (
    <table
      {...getTableProps()}
      className={cn(styles.table, {
        [styles.table_home]: isHome,
      }, className)}
    >
      {(!isTablet || !mobileTable) && (
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
      )}
      <tbody {...getTableBodyProps()}>

        {!data.length && (

          <tr>
            <td
              className={styles.td_no_data}
              colSpan={visibleColumns.length}
            >
              <div className={styles.td_no_data_div}>
                {imageNotData && <Image url={imageNotData} />}
                <div>
                  {textNotData}
                </div>
              </div>
            </td>
          </tr>
        )}
        {rows.map((row, i) => {
          prepareRow(row);
          return (!isTablet || !mobileTable) ? (
            <>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    className={cn({ [styles.td_gray]: row.isExpanded })}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>

              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                !!renderRowSubComponent && row.isExpanded ? (
                  <tr>
                    <td
                      className={styles.td_black}
                      colSpan={visibleColumns.length}
                    >
                      {renderRowSubComponent(data[i])}
                    </td>
                  </tr>
                ) : null
              }
            </>
          ) : (
            !!mobileTable && (
              <tr>
                <td colSpan={visibleColumns.length}>
                  {mobileTable(data[i])}
                </td>
              </tr>
            )
          );
        })}
      </tbody>
    </table>
  );
});
