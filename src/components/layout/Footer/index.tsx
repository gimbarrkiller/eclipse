import React, { memo } from 'react';

import { logoImage, paypassLogosIcon, visaLogosIcon } from 'assets/images';

import { Image } from 'components';

import { LinksFooter } from './LinksFooter';
import { LinksSocialFooter } from './LinksSocialFooter';
import { LinksOthers } from './LinksOthers';
import {
  linksOthers,
  linksOthers2,
  linksSocial,
  linksSocialApp,
} from './constants';

import styles from './styles.module.scss';

export const Footer = memo(() => (
  <div className={styles.footer}>
    <div className={styles.footer_content}>
      <div className={styles.footer_logo}>
        <Image url={logoImage} />
      </div>
      <LinksFooter />
      <LinksSocialFooter
        links={linksSocial}
        classNameContainer={styles.footer_social_link}
      />

      <div className={styles.footer_pays}>
        <Image url={visaLogosIcon} />
        <Image url={paypassLogosIcon} />
      </div>

      <LinksOthers
        links={linksOthers}
        classNameContainer={styles.footer_others_first}
      />
      <LinksOthers
        links={linksOthers2}
        classNameContainer={styles.footer_others_second}
      />

      <div className={styles.footer_border} />
      <div className={styles.footer_copyright}>
        Copyright © Imwork 2022
      </div>
      <LinksSocialFooter
        links={linksSocialApp}
        classNameContainer={styles.footer_social_app}
      />
    </div>
  </div>
));
