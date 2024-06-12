import React, {
  createContext,
  useMemo,
  useCallback,
  ReactNode,
  useState,
} from 'react';

type ModalContextProps = {
  isJsxModalOpen: boolean;
  currentModal: ReactNode;
  closeJsxModal: () => void;
  openJsxModal: (modal: ReactNode) => void;
};

export const ModalContext = createContext<ModalContextProps>({
  isJsxModalOpen: false,
  currentModal: undefined,
  closeJsxModal: () => {},
  openJsxModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [currentModal, setCurrentModal] = useState<ReactNode | undefined>(undefined);

  const openJsxModal = useCallback((modal: ReactNode) => {
    setCurrentModal(modal);
  }, [setCurrentModal]);

  const closeJsxModal = useCallback(() => {
    setCurrentModal(undefined);
  }, [setCurrentModal]);

  const isJsxModalOpen = currentModal !== undefined;

  const value = useMemo(() => ({
    isJsxModalOpen,
    currentModal,
    openJsxModal,
    closeJsxModal,
  }), [
    isJsxModalOpen,
    currentModal,
    closeJsxModal,
    openJsxModal,
  ]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};
