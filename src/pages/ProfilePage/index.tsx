import React, {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { SelectOption } from 'types';
import { getProfileData, profileSetState, saveProfileData } from 'store/profile/actionCreators';
import { profileSelectors } from 'store/profile/selectors';
import { authSelectors } from 'store/auth/selectors';
import { getCountry } from 'store/auth/actionCreators';

import {
  Button,
  Dropzone,
  Input, Select,
  TitleText,
  toastError,
  toastSuccess,
} from 'components';
import { WhiteContainer } from 'containers';

import { profileCustomStyles } from './profileCustomStyles';

import styles from './styles.module.scss';

export const ProfilePage: FC = () => {
  const { t } = useTranslation('profile');
  const trans = useTranslation('welcome').t;
  const transDep = useTranslation('deposit').t;
  const dispatch = useDispatch();

  const avatar = useSelector(profileSelectors.getProp('avatar'));
  const lastName = useSelector(profileSelectors.getProp('lastName'));
  const firstName = useSelector(profileSelectors.getProp('firstName'));
  const email = useSelector(profileSelectors.getProp('email'));
  const phone = useSelector(profileSelectors.getProp('phone'));
  const isLoading = useSelector(profileSelectors.getProp('isLoading'));
  const country = useSelector(profileSelectors.getProp('countryProfile'));
  const countries = useSelector(authSelectors.getProp('country'));

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const onChangeCountry = useCallback((value: SelectOption<string>) => {
    dispatch(profileSetState({
      countryProfile: value.value,
    }));
  }, [dispatch]);

  const onChangeLastName = useCallback((str: string) => {
    dispatch(profileSetState({
      lastName: str,
    }));
  }, [dispatch]);

  const onChangeFirstName = useCallback((str: string) => {
    dispatch(profileSetState({
      firstName: str,
    }));
  }, [dispatch]);

  const onChangeEmail = useCallback((str: string) => {
    dispatch(profileSetState({
      email: str,
    }));
  }, [dispatch]);

  const onChangePhone = useCallback((str: string) => {
    dispatch(profileSetState({
      phone: str,
    }));
  }, [dispatch]);

  const onCallbackRequest = useCallback(() => {
    toastSuccess(t('Saved_change_'));
    setOldPassword('');
    setNewPassword('');
    setRepeatNewPassword('');
  }, [
    t,
    setOldPassword,
    setNewPassword,
    setRepeatNewPassword,
  ]);

  useEffect(() => {
    dispatch(getProfileData());
    dispatch(getCountry());
  }, [dispatch]);

  const onSubmitForm = useCallback(() => {
    if (newPassword !== repeatNewPassword) {
      toastError(trans('Sign_in_password_mismatch_'));
      return;
    }
    dispatch(saveProfileData({
      password: newPassword,
      password_confirm: repeatNewPassword,
      onCallback: onCallbackRequest,
    }));
  }, [
    trans,
    dispatch,
    newPassword,
    repeatNewPassword,
    onCallbackRequest,
  ]);

  return (
    <div className={styles.profile}>
      <div className={styles.profile_container}>
        <TitleText text={t('Avatar_')} />
        <Dropzone
          data={avatar}
          textInfo={t('Avatar_info_')}
          textBtn={t('Select_file_')}
        />
      </div>

      <WhiteContainer className={styles.profile_container}>
        <TitleText text={t('Personal_info_')} />
        <div className={styles.profile_form}>
          <Input
            value={lastName}
            onChangeValue={onChangeLastName}
            label={t('Last_name_')}
          />
          <Input
            value={firstName}
            onChangeValue={onChangeFirstName}
            label={t('First_name_')}
          />
          <Input
            value={email}
            onChangeValue={onChangeEmail}
            label={t('Email_')}
          />
          <Input
            value={phone}
            onChangeValue={onChangePhone}
            label={t('Phone_number_')}
          />
          <Select
            options={countries}
            onChange={onChangeCountry}
            value={country ? { value: country, label: country } : null}
            style={{ ...profileCustomStyles }}
            placeholder={transDep('Country_')}
            isSearchable
          />
        </div>
      </WhiteContainer>

      <WhiteContainer className={styles.profile_container}>
        <TitleText text={t('Password_')} />
        <div className={styles.profile_form}>
          <Input
            value={oldPassword}
            onChangeValue={setOldPassword}
            label={t('Old_password_')}
          />
          <Input
            value={newPassword}
            onChangeValue={setNewPassword}
            label={t('New_password_')}
          />
          <Input
            value={repeatNewPassword}
            onChangeValue={setRepeatNewPassword}
            label={t('Repeat_new_password_')}
          />
        </div>
      </WhiteContainer>

      <Button
        onClick={onSubmitForm}
        isLoading={isLoading}
      >
        {t('Save_changes_')}
      </Button>
    </div>
  );
};
