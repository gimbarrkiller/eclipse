export interface NewsState {
  news: NewsRequestType[],
  newsItem?: NewsRequestType,
  isLoading: boolean,
}

export interface NewsType {
  id: number,
  created_at: string,
  description: string,
  text: string,
  image: string,
  title: string,
}

interface Translations {
  [key: string]: {
    title: string;
    description: string;
    text: string;
    image: string;
  };
}

export interface NewsRequestType {
  id: number;
  created_at: string;
  translations: Translations;
}
