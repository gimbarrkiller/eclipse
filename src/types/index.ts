export * from './redux';
export * from './componetTypes';

export type FormStateType = 'form' | 'confirm' | 'success';

export interface IAutontificationComponent {
  onChange: (n: FormStateType) => void;
}

export interface FileObjectType extends File {
  preview: string;
  id: number;
  path?: string;
}

export enum OnlyStatusType {
  New = 'New',
  Pending = 'Pending',
  Closed = 'Closed',
  InProgress = 'in_progress',
  Decline = 'decline',
}
