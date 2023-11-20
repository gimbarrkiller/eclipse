import React, {
  FC,
  memo,
  useCallback,
  useState,
} from 'react';
import cn from 'classnames';

import { plusIcon } from 'assets/images';

import { ButtonIcon } from 'components';

import styles from './styles.module.scss';

type IQuestion = {
  question: string;
  answer: string
};

export const Question:FC<IQuestion> = memo(({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className={styles.question_container}>
      <div className={cn(styles.question_card, { [styles.question_card_answer]: isOpen })}>
        <div className={styles.question_card_text}>
          {question}
        </div>
        <ButtonIcon
          onClick={onChangeOpen}
          imageURL={plusIcon}
          className={styles.question_card_icon_container}
          classNameImage={cn(styles.question_card_icon, {
            [styles.question_card_icon_open]: isOpen,
          })}
        />
      </div>
      <div
        className={cn(styles.question_card_close, { [styles.question_card]: isOpen })}
      >
        <div className={styles.question_card_text}>
          {answer}
        </div>
      </div>
    </div>
  );
});
