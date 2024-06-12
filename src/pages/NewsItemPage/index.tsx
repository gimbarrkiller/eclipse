import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { arrowDownIcon, newsBannerImage } from 'assets/images';
import { PathName } from 'appConstants';
import { dateFormat, LocaleKey, transformData } from 'utils';
import { getNewsItemData } from 'store/news/actionCreators';
import { newsSelectors } from 'store/news/selectors';

import {
  Image,
} from 'components';

import { socials } from './socials';

import styles from './styles.module.scss';

export const NewsItemPage = () => {
  const dispatch = useDispatch();
  const { pathname: currentPath } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('news');
  const trans = useTranslation('main').t;

  const parts = currentPath.split('/');
  const newsNumber = Number(parts[parts.length - 1]) || 0;
  const newsItem = useSelector(newsSelectors.getProp('newsItem'));

  useEffect(() => {
    dispatch(getNewsItemData({ id: newsNumber }));
  }, [dispatch, newsNumber]);

  const onClickBlack = useCallback(() => {
    navigate(PathName.News);
  }, [navigate]);

  if (!newsItem) {
    return (
      <div className={styles.news_no}>
        {t('News_no_')}
      </div>
    );
  }

  const transformNews = transformData(newsItem, localStorage.getItem('lng') || LocaleKey.en);

  return (
    <div className={styles.news_container}>
      <div className={styles.news_top}>
        <button
          onClick={onClickBlack}
          className={styles.news_back}
        >
          <Image
            url={arrowDownIcon}
            className={styles.news_back_img}
          />
          <div className={styles.news_back_text}>
            {trans('Go_back_')}
          </div>
        </button>
        <div className={styles.news_card_date}>
          {dateFormat(transformNews.created_at, 'dd-MM-yyyy')}
        </div>
      </div>
      <Image
        url={transformNews?.image || newsBannerImage}
        className={styles.news_card_img}
      />

      <div
        className={styles.news_view}
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{ __html: transformNews?.text || '' }}
      />
      <div className={styles.share}>
        {t('News_share_')}
        <div className={styles.socials}>
          {socials.map(({ icon, title, link }) => (
            <a
              className={styles.socials_icon}
              target="_blank"
              rel="noreferrer"
              title={title}
              href={link}
            >
              <Image url={icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
