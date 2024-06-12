import { useShallowSelector } from 'hooks';
import { authSelectors } from 'store/auth/selectors';
import { profileSelectors } from '../store/profile/selectors';

export const useUser = (): boolean => {
  const { accessToken } = useShallowSelector(authSelectors.getState);
  const { id } = useShallowSelector(profileSelectors.getState);

  return accessToken !== undefined && !!id;
};
