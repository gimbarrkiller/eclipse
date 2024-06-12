import { useEffect, useState } from 'react';

import { NewsRequestType, NewsType } from 'store/news/types';
import { transformData } from 'utils';

export const useTransformData = (data: NewsRequestType[], selectedLanguage: string) => {
  const [customData, setCustomData] = useState<NewsType[]>([]);

  useEffect(() => {
    const customMappedData = data.map((item) => transformData(item, selectedLanguage));
    setCustomData(customMappedData);
  }, [data, selectedLanguage]);

  return customData;
};
