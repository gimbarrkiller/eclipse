import React, { FC } from 'react';

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

export const HomePage: FC = () => (
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
