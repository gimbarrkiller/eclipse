import React, { FC, useEffect } from 'react';

import {
  MainContainer,
  ReferralBonusContainer,
  AgentStatusContainer,
  ComfortBonusContainer,
  VideoCallContainer,
  WorkAllDeviceContainer,
  PopularQuestionsContainer,
  ContactUsContainer,
} from 'containers';

interface IHomePage {
  goingFooter?: boolean;
}

export const HomePage: FC<IHomePage> = ({ goingFooter }) => {
  useEffect(() => {
    if (goingFooter) {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 500);
    }
  }, [goingFooter]);

  return (
    <>
      <MainContainer />
      <ReferralBonusContainer />
      <AgentStatusContainer />
      <ComfortBonusContainer />
      <VideoCallContainer />
      <WorkAllDeviceContainer />
      <PopularQuestionsContainer />
      <ContactUsContainer />
    </>
  );
};
