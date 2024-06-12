export interface DocumentsState {
  documents: DocumentsRequestType[],
  documentsItem?: DocumentsRequestType,
  isLoading: boolean,
}

export interface DocumentsType {
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

export interface DocumentsRequestType {
  id: number;
  created_at: string;
  translations: Translations;
}
