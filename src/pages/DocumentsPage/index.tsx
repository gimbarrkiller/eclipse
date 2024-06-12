import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { arrowDownIcon, docsItemIcon, illustrationNoTickets } from 'assets/images';
import { itemsOnPageQuantity, PathName } from 'appConstants';
import { usePageCount, useTransformData } from 'hooks';
import { LocaleKey } from 'utils';
import { getDocumentsData } from 'store/documents/actionCreators';
import { documentsSelectors } from 'store/documents/selectors';

import { Image, Pagination, TitleText } from 'components';
import { WhiteContainer } from 'containers';

import styles from './styles.module.scss';

export const DocumentsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('news');
  const trans = useTranslation('sidebar').t;

  const list = useSelector(documentsSelectors.getProp('documents'));
  const pageCount = usePageCount(list.length, 12);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    dispatch(getDocumentsData());
  }, [dispatch]);

  const onClickNewsItem = useCallback((id: number) => {
    navigate(`${PathName.DocumentsItem}/${id}`);
  }, [navigate]);

  const tableData = useMemo(() => {
    const sliceStart = currentPageIndex * itemsOnPageQuantity;
    const sliceEnd = sliceStart + itemsOnPageQuantity;

    return list.slice(sliceStart, sliceEnd);
  }, [list, currentPageIndex]);

  const transformData = useTransformData(tableData, localStorage.getItem('lng') || LocaleKey.en);

  const documentCards = useMemo(() => {
    if (!transformData.length) {
      return (
        <div className={styles.no_data}>
          <div className={styles.no_data_div}>
            <Image url={illustrationNoTickets} />
            <div>
              {t('List_documents_no_')}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.news_cards}>
        {transformData.map(({
          id,
          description,
          title,
        }) => (
          <WhiteContainer
            className={styles.news_card}
            key={id}
          >
            <button
              onClick={() => onClickNewsItem(id)}
              className={styles.news_card_content}
            >
              <div className={styles.news_card_img_container}>
                <Image
                  url={docsItemIcon}
                  className={styles.news_card_img}
                />
              </div>
              <div className={styles.news_card_title}>
                {title}
              </div>
              <div className={styles.news_card_description}>
                {description}
              </div>
            </button>
            <div className={styles.news_card_bottom}>
              <div />
              <button
                onClick={() => onClickNewsItem(id)}
                className={styles.news_card_btn}
              >
                <Image
                  url={arrowDownIcon}
                />
              </button>
            </div>
          </WhiteContainer>
        ))}
      </div>
    );
  }, [
    t,
    onClickNewsItem,
    transformData,
  ]);

  return (
    <div>
      <div className={styles.news_container}>
        <TitleText text={trans('Documents_')} />
        {documentCards}
      </div>
      {pageCount > 1 && (
        <Pagination
          page={currentPageIndex}
          onChange={setCurrentPageIndex}
          pageCount={pageCount}
          className={styles.pagination}
        />
      )}
    </div>
  );
};
