import { ReactNode, useState } from "react";

export type DefaultModalType = "view" | "create" | "update";

export type CommonModalConfig<T extends string = DefaultModalType> = Record<
  T,
  {
    title: string;
    description: string;
    component: ReactNode;
  }
>

interface UseModalProps<T extends string> {
  fnOpen?: (id?: bigint) => void;
  initialType?: T;
}

interface ModalState<T extends string> {
  isOpen: boolean;
  type: T;
}

const useCommonModal = <T extends string = DefaultModalType>({
  fnOpen,
  initialType
}: UseModalProps<T> = {}) => {
  const defaultType = initialType || ("view" as T);

  const [modal, setModal] = useState<ModalState<T>>({
    isOpen: false,
    type: defaultType,
  });

  const openModal = (type: T, id?: bigint) => {
    setModal({
      isOpen: true,
      type: type,
    });

    if (fnOpen) fnOpen(id);
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: defaultType,
    });
  };

  const onOpenChange = (open: boolean) => {
    setModal((prev) => ({
      ...prev,
      isOpen: open,
    }));
  };

  return {
    setModal,
    openModal,
    closeModal,
    onOpenChange,
    state: modal,
    type: modal.type,
    open: modal.isOpen,
  };
};

export { useCommonModal };
