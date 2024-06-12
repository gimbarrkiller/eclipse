import { emailRegex } from 'appConstants';

export const passwordValidator = (password: string) => {
  if (!password) {
    return 'Поле "пароль" обязательное дял заполнения';
  } if (password.length < 8) {
    return 'Введите минимум 8 символов';
  }
  return '';
};

export const emailValidator = (email: string) => {
  if (!email) {
    return 'Поле Email обязательное дял заполнения';
  } if (!new RegExp(emailRegex).test(email)) {
    return 'Невалидный Email';
  }
  return '';
};
