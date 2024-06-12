import {
  format,
} from 'date-fns';

export const dateFormat = (date: Date | string | number, formated?: string) => {
  if (typeof date === 'string' && date.length < 11) {
    return date;
  }
  const dateToFormat = new Date(date);
  return format(dateToFormat, formated || 'dd.MM.yyyy');
};

export const formatBalance = (amount: number | string | undefined) => {
  if (!amount) {
    return '0.0';
  }
  const amountNumber = typeof amount === 'string' ? Number(amount) : amount;
  return amountNumber.toFixed(2);
};
