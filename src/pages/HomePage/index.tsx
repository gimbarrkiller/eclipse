import React, { FC } from 'react';

import {
  MainContainer,
  ReferralBonusContainer,
  AgentStatusContainer,
  ComfortBonusContainer,
  VideoCallContainer,
  WorkAllDeviceContainer,
} from 'containers';

export const HomePage: FC = () => (
  <>
    <MainContainer />
    <ReferralBonusContainer />
    <AgentStatusContainer />
    <ComfortBonusContainer />
    <VideoCallContainer />
    <WorkAllDeviceContainer />
  </>
);
