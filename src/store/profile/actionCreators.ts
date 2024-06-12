import { ProfileState, SaveProfileData } from 'types';
import { ProfileActionType } from './actionsTypes';

export const profileSetState = (payload: Partial<ProfileState>) => ({
  type: ProfileActionType.SetState,
  payload,
});

export const getProfileData = () => ({
  type: ProfileActionType.GET_DATA,
});

export const saveProfileData = (
  payload: SaveProfileData,
) => ({
  type: ProfileActionType.SAVE_DATA,
  payload,
});
