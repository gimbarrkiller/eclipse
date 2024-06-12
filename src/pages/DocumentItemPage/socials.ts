import {
  socialFacebookIcon,
  socialGoogleIcon,
  socialLinkedInIcon,
  socialTwitterIcon,
} from 'assets/images';

export const socials = [
  {
    icon: socialLinkedInIcon,
    title: 'LinkedIn',
    link: 'http://www.linkedin.com/shareArticle?mini=true&url=_URL_',
  },
  {
    icon: socialFacebookIcon,
    title: 'Facebook',
    link: 'http://www.facebook.com/sharer.php?u=_URL_&t=_DESCTEXT_',
  },
  {
    icon: socialGoogleIcon,
    title: 'Google',
    link: 'https://apis.google.com/_/+1/fastbutton?usegapi=1&size=large&hl=en&url=_URL_',
  },
  {
    icon: socialTwitterIcon,
    title: 'Twitter',
    link: 'http://twitter.com/share?url=_URL_&text=_DESCTEXT_',
  },
];
