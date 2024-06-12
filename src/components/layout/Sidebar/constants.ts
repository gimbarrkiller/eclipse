import { PathName } from 'appConstants';
import {
  detailsDarkIcon, detailsIcon,
  docsActiveIcon, docsIcon, FAQActiveIcon,
  FAQIcon, instrumentActiveIcon, instrumentIcon,
  newsActiveIcon, newsIcon,
  partnerActiveIcon, partnerIcon,
  starActiveIcon, statusIcon,
  supportActiveIcon, supportIcon,
  transactionActiveIcon, transactionIcon,
  userActiveIcon, userIcon,
} from 'assets/images';

export const linksSidebar = [
  {
    title: 'Profile_',
    pathName: PathName.Profile,
    icon: userIcon,
    iconActive: userActiveIcon,
  },
  {
    title: 'Partner_',
    pathName: PathName.Partner,
    icon: partnerIcon,
    iconActive: partnerActiveIcon,
  },
  {
    title: 'Status_',
    pathName: PathName.Status,
    icon: statusIcon,
    iconActive: starActiveIcon,
  },
  {
    title: 'Pool_',
    pathName: PathName.Pool,
    icon: detailsIcon,
    iconActive: detailsDarkIcon,
  },
  {
    title: 'Instruments_',
    pathName: PathName.Instruments,
    icon: instrumentIcon,
    iconActive: instrumentActiveIcon,
  },
  {
    title: 'Transaction_',
    pathName: PathName.Transactions,
    icon: transactionIcon,
    iconActive: transactionActiveIcon,
  },
  {
    title: 'News_',
    pathName: PathName.News,
    icon: newsIcon,
    iconActive: newsActiveIcon,
  },
  {
    title: 'Support_',
    pathName: PathName.Support,
    icon: supportIcon,
    iconActive: supportActiveIcon,
  },
  {
    title: 'FAQ_',
    pathName: PathName.Faq,
    icon: FAQIcon,
    iconActive: FAQActiveIcon,
  },
  {
    title: 'Documents_',
    pathName: PathName.Documents,
    icon: docsIcon,
    iconActive: docsActiveIcon,
  },
];
