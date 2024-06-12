import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { SelectOption } from 'types';

import {
  QuestionAnswer,
  Select,
  TitleText,
} from 'components';

import { data } from './data';

import styles from './styles.module.scss';

export const FAQContainer = () => {
  const { t } = useTranslation('support');

  const timeOptions = [
    { value: 'allTime', label: t('All_') },
  ];

  const [timeSelect, setTimeSelect] = useState<SelectOption<string>>(timeOptions[0]);

  useEffect(() => {
    // Обновляем timeSelect при изменении языка
    setTimeSelect((prevTimeSelect) => ({
      ...prevTimeSelect,
      label: t('All_'),
    }));
  }, [t]);

  const onChangeTime = useCallback((value: SelectOption<string>) => {
    setTimeSelect(value);
  }, [setTimeSelect]);

  const questionsCards = useMemo(() => (
    <div className={styles.faq_cards}>
      {data.map(({ question, answer }) => (
        <QuestionAnswer
          key={question}
          question={t(question)}
          answer={t(answer)}
        />
      ))}
    </div>
  ), [t]);

  return (
    <div>
      <div className={styles.faq_top}>
        <TitleText
          text={t('FAQ_')}
          className={styles.faq_top_title}
        />
        <div className={styles.faq_top_select}>
          <Select
            options={timeOptions}
            onChange={onChangeTime}
            value={timeSelect}
          />
        </div>
      </div>
      {questionsCards}
    </div>
  );
};
