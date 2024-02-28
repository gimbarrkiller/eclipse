import {
  format,
} from 'date-fns';

export const dateFormat = (date: Date | string | number, formated?: string) => {
  const dateToFormat = new Date(date);
  return format(dateToFormat, formated || 'dd.MM.yyyy');
};
