import { StylesConfig } from 'react-select';

export type SelectOption<T> = {
  value: T;
  label: string;
};

export type SelectProps<T> = {
  className?: string;
  onChange: (selectedOption: SelectOption<T>) => void;
  options: SelectOption<T>[];
  value: SelectOption<T> | null;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: StylesConfig<SelectOption<any>, false>;
  isSearchable?: boolean;
};
