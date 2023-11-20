import React, { memo, useMemo } from 'react';

import { Question } from './Question';
import { data } from './data';

import styles from './styles.module.scss';

export const PopularQuestionsContainer = memo(() => {
  const questionsCards = useMemo(() => (
    <div className={styles.questions_cards}>
      {data.map(({ question, answer }) => (
        <Question
          key={question}
          question={question}
          answer={answer}
        />
      ))}
    </div>
  ), []);

  return (
    <div className={styles.questions_container}>
      <div className={styles.questions_title}>
        Популярные вопросы о нашем продукте:
      </div>
      {questionsCards}
    </div>
  );
});
