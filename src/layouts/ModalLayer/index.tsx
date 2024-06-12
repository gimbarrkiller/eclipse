import { useContext } from 'react';

import { ModalContext } from 'context';

export const ModalLayer = () => {
  const {
    currentModal: jsxModal,
  } = useContext(ModalContext);

  return (
    jsxModal as JSX.Element
  );
};
