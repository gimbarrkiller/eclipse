import React, {
  FC,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import {
  avatarImage,
  infoIcon,
  infoActiveIcon,
  InfoUserActiveIcon,
} from 'assets/images';
import { ReferralType } from 'types';
import { dateFormat } from 'utils';

import { WhiteContainer } from 'containers';
import { ButtonIcon, Image } from 'components';

import styles from './styles.module.scss';

interface IUserItem {
  data: ReferralType,
  isOpen: boolean,
  onOpen: () => void,
  clickInId: () => void,
  activeUser: boolean,
  activeUserParent: boolean,
  isFirst: boolean,
}

export const UserItem: FC<IUserItem> = ({
  data,
  isOpen,
  onOpen,
  clickInId,
  activeUser,
  activeUserParent,
  isFirst,
}) => {
  const { t } = useTranslation('partner');
  const handleIsOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const handleId = useCallback(() => {
    if (!isFirst) {
      clickInId();
    }
  }, [clickInId, isFirst]);

  const iconInfo =
    (activeUser && !isOpen && InfoUserActiveIcon)
    || (isOpen ? infoActiveIcon : infoIcon);

  return (
    <div className={styles.structure_lvl_users_item}>
      {!isFirst && (
        <ButtonIcon
          imageURL={iconInfo}
          classNameImage={styles.structure_lvl_users_item_info}
          onClick={handleIsOpen}
        />
      )}
      <button
        onClick={handleId}
        className={cn({
          [styles.structure_lvl_users_item_active]: activeUser && !isFirst,
          [styles.structure_lvl_users_item_active_parent]: activeUserParent && !isFirst,
        })}
      >
        <Image
          className={styles.structure_lvl_users_item_img}
          url={data.avatar || avatarImage}
        />
        <div className={styles.structure_lvl_users_item_name}>
          {data.referral}
        </div>
      </button>
      <div className={styles.structure_line} />
      {isOpen && !isFirst && (
        <WhiteContainer className={cn(styles.structure_lvl_modal)}>
          <div className={styles.structure_lvl_modal_name_id}>
            <div className={styles.structure_lvl_modal_name}>
              {data.referral}
            </div>
            <div className={styles.structure_lvl_modal_id}>
              ID:
              {' '}
              {data.id - 1}
            </div>
          </div>
          <div className={cn(styles.structure_lvl_modal_line, styles.structure_line)} />
          <div className={styles.structure_lvl_modal_second_data}>
            {data?.country && (
              <div className={styles.structure_lvl_modal_top_info}>
                <div className={styles.structure_lvl_modal_top_info_label}>
                  {t('Country_')}
                </div>
                <div className={styles.structure_lvl_modal_top_info_value}>
                  {data.country}
                </div>
              </div>
            )}
            {data?.joined_at && (
              <div className={styles.structure_lvl_modal_top_info}>
                <div className={styles.structure_lvl_modal_top_info_label}>
                  {t('Date_of_registration_')}
                </div>
                <div className={styles.structure_lvl_modal_top_info_value}>
                  {dateFormat(data.joined_at, 'dd.MM.yy')}
                </div>
              </div>
            )}
            {data?.last_login && (
              <div className={styles.structure_lvl_modal_top_info}>
                <div className={styles.structure_lvl_modal_top_info_label}>
                  {t('Was_online_')}
                </div>
                <div className={styles.structure_lvl_modal_top_info_value}>
                  {dateFormat(data.last_login, 'dd.MM.yy')}
                </div>
              </div>
            )}
            {data?.purchase_time && (
              <div className={styles.structure_lvl_modal_top_info}>
                <div className={styles.structure_lvl_modal_top_info_label}>
                  {t('Last_purchase_')}
                </div>
                <div className={styles.structure_lvl_modal_top_info_value}>
                  {dateFormat(data.purchase_time, 'dd.MM.yy')}
                </div>
              </div>
            )}
            <div className={styles.structure_lvl_modal_top_info}>
              <div className={styles.structure_lvl_modal_top_info_label}>
                {t('Total_licenses_purchased_')}
              </div>
              <div className={styles.structure_lvl_modal_top_info_value}>
                {data?.count_active_licenses}
              </div>
            </div>
          </div>
        </WhiteContainer>
      )}
    </div>
  );
};
