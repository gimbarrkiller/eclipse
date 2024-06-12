import React, {
  memo,
  useCallback,
} from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import cn from 'classnames';

import { ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';

import { Image } from 'components';
import { arrowDownIcon } from 'assets/images';

import styles from './styles.module.scss';

interface PaginationProps {
  page?: number
  pageCount?: number
  className?: string
  classNameDisabled?: string
  onChange?: (page: number) => void
}

export const Pagination = memo<PaginationProps>(({
  page = 0,
  pageCount = 12,
  className,
  onChange,
  classNameDisabled,
}) => {
  const isLaptop = useScreenWidth(ScreenWidth.laptop);
  const handleChange = useCallback<Required<ReactPaginateProps>['onClick']>(({ nextSelectedPage, selected, isBreak }) => {
    let next = nextSelectedPage;

    if (isBreak && nextSelectedPage !== undefined) {
      if (nextSelectedPage > selected) {
        next = Math.floor((pageCount - 1 - selected) / 2 + selected);
      } else {
        next = Math.floor(selected / 2);
      }
    }

    if (onChange && next !== undefined) {
      onChange(next);
    }
  }, [onChange, pageCount]);

  return (
    <ReactPaginate
      forcePage={page}
      onClick={handleChange}
      pageCount={pageCount || 0}
      pageRangeDisplayed={isLaptop ? 2 : 3}
      marginPagesDisplayed={isLaptop ? 0 : 2}
      className={cn(styles.pagination, className)}
      breakClassName={styles.break}
      breakLinkClassName={styles.break_line}
      activeLinkClassName={styles.page_active}
      pageLinkClassName={styles.page}
      nextLinkClassName={cn(styles.arrow_button, styles.arrow_button_next)}
      previousLinkClassName={cn(styles.arrow_button, styles.arrow_button_prev)}
      disabledLinkClassName={cn(styles.disabled, classNameDisabled)}
      renderOnZeroPageCount={() => null}
      nextLabel={(
        <Image
          className={styles.next_arrow}
          url={arrowDownIcon}
        />
      )}
      previousLabel={(
        <Image
          className={styles.prev_arrow}
          url={arrowDownIcon}
        />
      )}
    />
  );
});
