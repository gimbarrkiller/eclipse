import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getNewsItemData } from 'store/news/actionCreators';
import { newsSelectors } from 'store/news/selectors';
import { LocaleKey, transformData } from 'utils';

import { WithdrawModal } from 'modals';
import { ModalContext } from 'context';
import {
  Button,
  Modal,
} from 'components';

import styles from './styles.module.scss';

export const TermsWithdrawModal = memo(() => {
  const dispatch = useDispatch();
  const { t } = useTranslation('main');
  const { closeJsxModal, openJsxModal } = useContext(ModalContext);
  const termsItem = useSelector(newsSelectors.getProp('newsItem'));

  useEffect(() => {
    dispatch(getNewsItemData({ id: 1 }));
  }, [dispatch]);

  const onCloseJsxModal = useCallback(() => {
    closeJsxModal();
  }, [closeJsxModal]);

  const onTermsAccept = useCallback(() => {
    openJsxModal(<WithdrawModal />);
  }, [openJsxModal]);

  if (!termsItem) {
    return (
      <Modal
        isOpen
        onClose={onCloseJsxModal}
        className={styles.terms_container}
      >
        <div>
          {t('Expectation_')}
        </div>
      </Modal>
    );
  }

  const transformTerms = transformData(termsItem, localStorage.getItem('lng') || LocaleKey.en);

  return (
    <Modal
      isOpen
      onClose={onCloseJsxModal}
      className={styles.terms_container}
    >
      <div
        className={styles.terms_view}
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{ __html: transformTerms?.text || '' }}
      />
      <div className={styles.terms_btns}>
        <Button
          onClick={onCloseJsxModal}
          isFullWidth
          isGrayBg
          isBigHeight
        >
          {t('Reject_')}
        </Button>
        <Button
          onClick={onTermsAccept}
          isFullWidth
          isBigHeight
        >
          {t('Accept_')}
        </Button>
      </div>
    </Modal>
  );
});
