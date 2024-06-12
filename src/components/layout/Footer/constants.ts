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
    title: 'Footer_links_others_1_',
    link: PathName.LegalInfo,
  },
  {
    title: 'Footer_links_others_2_',
    link: PathName.PersonalData,
  },
];

export const linksOthers2 = [
  {
    title: 'Footer_links_others_4_',
    link: PathName.AntiCorruption,
  },
  {
    title: 'Footer_links_others_5_',
    link: PathName.OrderAndProviding,
  },
  {
    title: 'Footer_links_others_6_',
    link: PathName.PaymentRules,
  },
];

export const linksSocialApp = [
  {
    title: 'Footer_links_social_app_1_',
    icon: deviceGoogleIcon,
    link: PathName.GooglePlay,
  },
  {
    title: 'Footer_links_social_app_2_',
    icon: deviceAppStoreIcon,
    link: PathName.AppStore,
  },
  {
    title: 'Footer_links_social_app_3_',
    icon: deviceMacIcon,
    link: PathName.MacOS,
  },
  {
    title: 'Footer_links_social_app_4_',
    icon: deviceWebIcon,
    link: PathName.Web,
  },
  {
    title: 'Footer_links_social_app_5_',
    icon: deviceWindowsIcon,
    link: PathName.Windows,
  },
];
