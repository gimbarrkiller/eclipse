import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { illustrationNoRef } from 'assets/images';
import { ReferralData } from 'types';

import { WhiteContainer } from 'containers';
import { Button, Image } from 'components';

import { UserItem } from './item';

import styles from './styles.module.scss';

const MAX_VIEW_USERS = 10;
const FIRST_LVL_COPY = '0';
const FIRST_LVL = '1';
const PERCENT_LVL = ['', '16%/8%', '5%', '5%', '6%', '7%'];

const status = [
  {
    title: 'seller',
    id: 2,
    name: 'seller',
    sales: 2500,
  },
  {
    title: 'advanced_seller',
    id: 3,
    name: 'advanced_seller',
    sales: 5000,
  },
  {
    title: 'premium_seller',
    id: 4,
    name: 'premium_seller',
    sales: 7500,
  },
  {
    title: 'top_seller',
    id: 5,
    name: 'top_seller',
    sales: 10000,
  },
];

export const LevelsContainer = ({ list }: { list?: ReferralData }) => {
  const { t } = useTranslation('partner');
  const trans = useTranslation('welcome').t;
  const tStatus = useTranslation('main').t;

  const [maxReferrals, setMaxReferrals] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(MAX_VIEW_USERS);
  const [activeUser, setActiveUser] = useState(0);
  const [childrenUser, setChildrenUser] = useState<number[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [allTeamSales, setAllTeamSales] = useState(0);

  const handleOpen = useCallback((index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  }, [setOpenIndex, openIndex]);

  const handleInId = useCallback((level: number, userId: number) => {
    setActiveUser(userId);
    if (!list) {
      return;
    }

    const ancestors = [];
    let currentUserId = userId;

    const currentAncestors: number[] = [];
    list[level + 1].referrals.forEach((user) => {
      if (user.parent_id === currentUserId) {
        currentAncestors.push(user.id);
      }
    });
    ancestors.push(...currentAncestors);
    [currentUserId] = currentAncestors;

    setChildrenUser(ancestors);
  }, [setActiveUser, list, setChildrenUser]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleClickOutside = useCallback((event) => {
    const isModalClick = event.target.className.indexOf('structure_lvl_modal') !== -1;
    const isIconClick = event.target.className.indexOf('structure_lvl_users_item_info') !== -1;
    if (!(isModalClick || isIconClick)) {
      handleOpen(1.1);
    }
  }, [handleOpen]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleShowMore = useCallback(() => {
    setDisplayedCount((prevCount) => Math.min(prevCount + 6, maxReferrals));
  }, [setDisplayedCount, maxReferrals]);

  useEffect(() => {
    if (list) {
      const countsRefs: number[] = [];
      for (let i = 0; i < Object.keys(list).length; i += 1) {
        if (i !== Number(FIRST_LVL_COPY)) {
          setAllTeamSales((prevState) => prevState + (list[i]?.licenses || 0));
        }
        if (list[i]?.referrals) {
          countsRefs.push(list[i]?.referrals.length);
        }
      }
      setMaxReferrals(Math.max(...countsRefs));
    }
  }, [list, setMaxReferrals]);

  const users = useCallback((level: string, isFirst: boolean) => {
    if (!list || !list[level]?.referrals) {
      return (
        <div className={styles.structure_lvl_none}>
          {t('No_referrals_')}
        </div>
      );
    }

    return list[level]?.referrals.slice(0, displayedCount).map((i) => (
      <UserItem
        key={i.id}
        data={i}
        isOpen={openIndex === i.id}
        onOpen={() => handleOpen(i.id)}
        clickInId={() => handleInId(Number(level), i.id)}
        activeUser={i.id === activeUser}
        activeUserParent={childrenUser.includes(i.id)}
        isFirst={isFirst}
      />
    ));
  }, [
    t,
    list,
    displayedCount,
    openIndex,
    handleOpen,
    handleInId,
    activeUser,
    childrenUser,
  ]);

  const statusMain = useMemo(() => (
    status.find(({ sales }) => sales <= (allTeamSales || 0))
  ), [allTeamSales]);

  if (!list) {
    return (
      <div className={styles.td_no_data_div}>
        <Image
          url={illustrationNoRef}
          className={styles.td_no_data_div_icon}
        />
        <div>
          {t('Referral_list_is_empty_')}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.structure_lvl}>
        <div className={styles.structure_lvl_container}>
          {Object.keys(list).map((item) => (
            <WhiteContainer
              className={styles.structure_lvl_content}
              key={item}
            >
              <div
                className={cn(styles.structure_lvl_top, {
                  [styles.structure_lvl_top_first]: item === FIRST_LVL_COPY,
                  [styles.structure_lvl_top_status]: !!statusMain,
                })}
              >
                <div className={styles.structure_lvl_title}>
                  {item === FIRST_LVL_COPY ? (
                    <div>
                      {t('Direct_sales_')}
                      <br />
                      <span className={styles.structure_lvl_title_percent}>
                        16%
                      </span>
                    </div>
                  ) : (
                    <>
                      {item}
                      {' '}
                      {trans('Level_')}
                      {' '}
                      <span className={styles.structure_lvl_title_orange}>
                        {PERCENT_LVL[Number(item)]}
                      </span>
                    </>
                  )}
                </div>

                {item === FIRST_LVL_COPY && <div className={styles.structure_line} />}

                <div className={styles.structure_lvl_top_info}>
                  <div className={styles.structure_lvl_top_info_label}>
                    {t(item === FIRST_LVL_COPY ? 'Licenses_full_' : 'Team_')}
                  </div>
                  <div className={styles.structure_lvl_top_info_value}>
                    {item === FIRST_LVL_COPY ? list[item]?.direct_licenses : list[item]?.count || 0}
                    {' '}
                    {t(item === FIRST_LVL_COPY ? '' : 'Agents_')}
                  </div>
                </div>
                <div className={styles.structure_line} />
                {item === FIRST_LVL_COPY && (
                  <div
                    className={cn(styles.structure_lvl_top_info)}
                  >
                    <div className={styles.structure_lvl_top_info_label}>
                      {t('Licenses_sold_by_team_')}
                    </div>
                    <div className={styles.structure_lvl_top_info_value}>
                      {allTeamSales || 0}
                      {' '}
                      {t(item === FIRST_LVL_COPY ? '' : 'Agents_')}
                    </div>
                  </div>
                )}
                {item === FIRST_LVL_COPY && statusMain && (
                  <div className={styles.structure_line} />
                )}
                {item === FIRST_LVL_COPY && statusMain && (
                  <div
                    className={styles.structure_lvl_top_info}
                  >
                    <div className={styles.structure_lvl_top_info_value_status}>
                      {tStatus(statusMain?.title)}
                    </div>
                  </div>
                )}
                {item !== FIRST_LVL_COPY && (
                  <div className={styles.structure_lvl_title}>
                    {t('Licenses_full_')}
                  </div>
                )}

                {item !== FIRST_LVL_COPY && item === FIRST_LVL && (
                  <div
                    className={styles.structure_lvl_top_info}
                  >
                    <div className={styles.structure_lvl_top_info_label}>
                      {t('Direct_sales_')}
                    </div>
                    <div className={styles.structure_lvl_top_info_value}>
                      {list[item]?.direct_licenses || 0}
                    </div>
                  </div>
                )}

                <div
                  className={cn(styles.structure_lvl_top_info, {
                    [styles.structure_lvl_top_info_first]: item === FIRST_LVL_COPY,
                  })}
                >
                  <div className={styles.structure_lvl_top_info_label}>
                    {t('Sales_team_')}
                  </div>
                  <div className={styles.structure_lvl_top_info_value}>
                    {list[item]?.licenses || 0}
                  </div>
                </div>

                {item !== FIRST_LVL && (
                  <div
                    className={cn(styles.structure_lvl_top_info, {
                      [styles.structure_lvl_top_info_first]:
                      !list[item]?.direct_licenses || item === FIRST_LVL_COPY,
                    })}
                  >
                    <div className={styles.structure_lvl_top_info_label}>
                      {t('Direct_sales_')}
                    </div>
                    <div className={styles.structure_lvl_top_info_value}>
                      {list[item]?.direct_licenses || 0}
                    </div>
                  </div>
                )}

              </div>
              <div className={styles.structure_lvl_users}>
                {users(item, item === FIRST_LVL_COPY)}
              </div>
            </WhiteContainer>
          ))}
        </div>
      </div>
      {maxReferrals > displayedCount && (
        <Button
          onClick={handleShowMore}
          className={styles.structure_show_more_btn}
        >
          {t('Show_more_')}
        </Button>
      )}
    </>
  );
};
