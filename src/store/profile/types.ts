import { FileObjectType } from 'types';

export interface ProfileState {
  isLoading: boolean,
  isSavingAvatar: boolean,
  avatar?: FileObjectType | string,
  lastName: string,
  firstName: string,
  fatherName: string,
  email: string,
  phone: string,
  telegram: string,
  balance: string,
  id: number,
  referralCode?: string,
  rank: string,
  countryProfile: string,
  isLicense: boolean,
  dataActive?: string | null,
  dataDeActive?: string | null,
}

export interface AvatarType {
  avatar: string,
}

export interface ProfileData {
  avatar?: FileObjectType,
  lastName: string,
  firstName: string,
  fatherName: string,
  email: string,
  phone: string,
  telegram: string,
  country: string,
  balance?: string,
  id?: string,
  referralCode?: string,
  countryProfile?: string,
}

export interface SaveProfileData {
  password: string,
  password_confirm: string,
  onCallback: () => void,
}

export interface ProfileDataRequest {
  user: {
    avatar?: FileObjectType,
    balance: string,
    email: string,
    first_name: string,
    id: number,
    last_name: string,
    phone: string,
    referral_code: string,
    skype: string,
    telegram: string,
    third_name: string,
    rank: string,
    country?: string,
    license: boolean,
    license_purchase_date?: string | null,
    license_expiration?: string | null,
  },
}
