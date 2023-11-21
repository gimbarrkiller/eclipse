import { PathName } from 'appConstants';
import {
  deviceAppStoreIcon,
  deviceGoogleIcon,
  deviceMacIcon, deviceWebIcon,
  deviceWindowsIcon,
  linkFacebookIcon,
  linkInstagramIcon,
  linkLinkedInIcon,
  linkTelegramIcon,
  linkTwitterIcon,
  linkYoutubeIcon,
} from 'assets/images';

export const linksApp = [
  {
    title: 'Цены',
    pathName: PathName.WhatWeOffer,
  },
  {
    title: 'О нас',
    pathName: PathName.Sellers,
  },
  {
    title: 'Скачать',
    pathName: PathName.ConnectUs,
  },
  {
    title: 'Центр помощи',
    pathName: PathName.ConnectUs,
  },
  {
    title: 'Свидетельства и лицензии',
    pathName: PathName.ConnectUs,
  },
  {
    title: 'Карьера',
    pathName: PathName.ConnectUs,
  },
];

export const linksSocial = [
  {
    icon: linkTelegramIcon,
    link: PathName.Telegram,
  },
  {
    icon: linkTwitterIcon,
    link: PathName.Twitter,
  },
  {
    icon: linkFacebookIcon,
    link: PathName.Facebook,
  },
  {
    icon: linkLinkedInIcon,
    link: PathName.LinkedIn,
  },
  {
    icon: linkInstagramIcon,
    link: PathName.Instagram,
  },
  {
    icon: linkYoutubeIcon,
    link: PathName.Youtube,
  },
];

export const linksOthers = [
  {
    title: 'Процедура заказа и предоставления услуги на сайте',
    link: PathName.ConnectUs,
  },
  {
    title: 'Социальная ответственность',
    link: PathName.ConnectUs,
  },
  {
    title: 'Политика по противодейтсвию коррупции',
    link: PathName.ConnectUs,
  },
];

export const linksOthers2 = [
  {
    title: 'Правила оплаты и безопасность платежей, конфиденциальность информации и отказ от услуги',
    link: PathName.ConnectUs,
  },
  {
    title: 'Пользовательская документация',
    link: PathName.ConnectUs,
  },
  {
    title: 'Инструкция по установки',
    link: PathName.ConnectUs,
  },
];

export const linksSocialApp = [
  {
    title: 'Google Play',
    icon: deviceGoogleIcon,
    link: PathName.GooglePlay,
  },
  {
    title: 'App Store',
    icon: deviceAppStoreIcon,
    link: PathName.AppStore,
  },
  {
    title: 'MacOS-версия',
    icon: deviceMacIcon,
    link: PathName.MacOS,
  },
  {
    title: 'Веб-версия',
    icon: deviceWebIcon,
    link: PathName.Web,
  },
  {
    title: 'Windows-версия',
    icon: deviceWindowsIcon,
    link: PathName.Windows,
  },
];
