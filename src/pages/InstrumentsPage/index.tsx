import React from 'react';
import { useSelector } from 'react-redux';

import { profileSelectors } from 'store/profile/selectors';

import { BannerContainer } from './BannerContainer';
import { VideoContainer } from './VideoContainer';

import styles from './styles.module.scss';

const baseURL = process.env.REACT_APP_URL;

export const InstrumentsPage = () => {
  const { referralCode } = useSelector(profileSelectors.getState);

  return (
    <div className={styles.instruments_container}>
      <VideoContainer />
      <BannerContainer
        pack={1}
        href={`${baseURL}/signup?ref=${referralCode}`}
      />
      <BannerContainer
        pack={2}
        href={`https://eclipse.club/?ref=${referralCode}`}
      />
      <BannerContainer
        href={`https://eclipse.club/?ref=${referralCode}`}
        pack={3}
      />
    </div>
  );
};
