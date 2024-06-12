import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { arrowDownIcon, illustrationNoTickets, newsBannerImage } from 'assets/images';
import { itemsOnPageQuantity, PathName } from 'appConstants';
import { usePageCount, useTransformData } from 'hooks';
import { dateFormat, LocaleKey } from 'utils';
import { getNewsData } from 'store/news/actionCreators';
import { newsSelectors } from 'store/news/selectors';

import { Image, Pagination, TitleText } from 'components';
import { WhiteContainer } from 'containers';

import styles from './styles.module.scss';

export const NewsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('news');
  const trans = useTranslation('sidebar').t;

  const list = useSelector(newsSelectors.getProp('news'));
  const pageCount = usePageCount(list.length, 12);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    dispatch(getNewsData());
  }, [dispatch]);

  const onClickNewsItem = useCallback((id: number) => {
    navigate(`${PathName.NewsItem}/${id}`);
  }, [navigate]);

  const tableData = useMemo(() => {
    const sliceStart = currentPageIndex * itemsOnPageQuantity;
    const sliceEnd = sliceStart + itemsOnPageQuantity;

    return list.slice(sliceStart, sliceEnd);
  }, [list, currentPageIndex]);

  const transformData = useTransformData(tableData, localStorage.getItem('lng') || LocaleKey.en);

  const newsCards = useMemo(() => {
    if (!transformData.length) {
      return (
        <div className={styles.no_data}>
          <div className={styles.no_data_div}>
            <Image url={illustrationNoTickets} />
            <div>
              {t('List_news_no_')}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.news_cards}>
        {transformData.map(({
          id,
          created_at,
          description,
          title,
          image,
        }) => (
          <WhiteContainer
            className={styles.news_card}
            key={id}
          >
            <button
              onClick={() => onClickNewsItem(id)}
              className={styles.news_card_content}
            >
              <Image
                url={image || newsBannerImage}
                className={styles.news_card_img}
              />
              <div className={styles.news_card_title}>
                {title}
              </div>
              <div className={styles.news_card_description}>
                {description}
              </div>
            </button>
            <div className={styles.news_card_bottom}>
              <div className={styles.news_card_date}>
                {dateFormat(created_at, 'dd-MM-yyyy')}
              </div>
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
        <TitleText text={trans('News_')} />
        {newsCards}
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
