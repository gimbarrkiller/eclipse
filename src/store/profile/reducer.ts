import { ProfileState } from 'types';
import { createReducer } from 'utils';
import { avatarImage } from 'assets/images';

import { profileHandlers } from './handlers';

export const profileInitialState: Readonly<ProfileState> = {
  isLoading: false,
  isSavingAvatar: false,
  avatar: avatarImage,
  lastName: '',
  firstName: '',
  fatherName: '',
  email: '',
  phone: '',
  telegram: '',
  balance: '00.00',
  id: 0,
  rank: '',
  countryProfile: '',
  isLicense: false,
  dataActive: '11.11.11',
  dataDeActive: '11.11.11',
};

export default createReducer(profileInitialState, profileHandlers);
