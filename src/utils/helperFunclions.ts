import { NewsRequestType } from 'store/news/types';

import { LocaleKey } from './i18n';

export const transformData = (item: NewsRequestType, selectedLanguage: string) => {
  const translation = item?.translations[selectedLanguage] || item?.translations[LocaleKey.en];
  return {
    id: item?.id,
    created_at: item?.created_at,
    title: translation?.title || '',
    description: translation?.description || '',
    text: translation?.text || '',
    image: translation?.image || '',
  };
};

export const transformName = (first_name?: string | null, last_name?: string | null) => {
  if (!first_name && !last_name) {
    return 'User';
  }
  return `${first_name ?? ''} ${last_name ?? ''}`.trim();
};
