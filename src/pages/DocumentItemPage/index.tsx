import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { arrowDownIcon } from 'assets/images';
import { PathName } from 'appConstants';
import { LocaleKey, transformData } from 'utils';
import { documentsSelectors } from 'store/documents/selectors';
import { getDocumentsItemData } from 'store/documents/actionCreators';

import {
  Image,
} from 'components';

import styles from './styles.module.scss';

export const DocumentItemPage = () => {
  const dispatch = useDispatch();
  const { pathname: currentPath } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation('news');
  const trans = useTranslation('main').t;

  const parts = currentPath.split('/');
  const documentsNumber = Number(parts[parts.length - 1]) || 0;
  const documentsItem = useSelector(documentsSelectors.getProp('documentsItem'));

  useEffect(() => {
    dispatch(getDocumentsItemData({ id: documentsNumber }));
  }, [dispatch, documentsNumber]);

  const onClickBlack = useCallback(() => {
    navigate(PathName.Documents);
  }, [navigate]);

  if (!documentsItem) {
    return (
      <div className={styles.news_no}>
        {t('List_documents_no_')}
      </div>
    );
  }

  const transformNews = transformData(documentsItem, localStorage.getItem('lng') || LocaleKey.en);

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
      </div>
      <div
        className={styles.news_view}
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{ __html: transformNews?.text || '' }}
      />
    </div>
  );
};
