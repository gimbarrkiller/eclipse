import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { QuestionAnswer } from 'components';

import { data } from './data';

import styles from './styles.module.scss';

export const PopularQuestionsContainer = memo(() => {
  const { t } = useTranslation('welcome');
  const questionsCards = useMemo(() => (
    <div className={styles.questions_cards}>
      {data.map(({ question, answer }) => (
        <QuestionAnswer
          key={question}
          question={t(question)}
          answer={t(answer)}
          isHome
        />
      ))}
    </div>
  ), [t]);

  return (
    <div className={styles.questions_container}>
      <div className={styles.questions_title}>
        {t('Popular_title_')}
      </div>
      {questionsCards}
    </div>
  );
});
