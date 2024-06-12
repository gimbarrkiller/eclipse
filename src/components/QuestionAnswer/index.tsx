import React, {
  FC,
  memo,
  useCallback,
  useState,
} from 'react';
import cn from 'classnames';

import { plusDarkIcon, plusIcon } from 'assets/images';

import { ButtonIcon } from 'components';

import styles from './styles.module.scss';

type IQuestionAnswer = {
  question: string;
  answer: string
  isHome?: boolean
};

export const QuestionAnswer:FC<IQuestionAnswer> = memo(({
  question,
  answer,
  isHome,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className={cn(styles.question_container, { [styles.question_container_home]: isHome })}>
      <div
        className={cn(styles.question_card, {
          [styles.question_card_answer]: isOpen && isHome,
          [styles.question_card_home]: isHome,
        })}
      >
        <div className={styles.question_card_text}>
          {question}
        </div>
        <ButtonIcon
          onClick={onChangeOpen}
          imageURL={isHome ? plusIcon : plusDarkIcon}
          className={cn(styles.question_card_icon_container, {
            [styles.question_card_icon_container_home]: isHome,
          })}
          classNameImage={cn(styles.question_card_icon, {
            [styles.question_card_icon_open]: isOpen,
          })}
        />
      </div>
      <div
        className={cn(styles.question_card_close, {
          [styles.question_card]: isOpen,
          [styles.question_card_home]: isOpen && isHome,
          [styles.question_subcard]: !isHome,
        })}
      >
        <div
          className={cn(styles.question_card_text, {
            [styles.question_card_subtitle]: !isHome,
          })}
        >
          {answer}
        </div>
      </div>
    </div>
  );
});
