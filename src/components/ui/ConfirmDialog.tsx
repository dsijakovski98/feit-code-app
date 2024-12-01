import { ElementRef, Fragment, ReactNode, useLayoutEffect, useRef } from "react";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { ButtonProps } from "@nextui-org/react";

import Button from "@/components/ui/Button";

import { Toggle } from "@/hooks/useToggle";

type Props = {
  dialog: Toggle;
  title: ReactNode;
  description: ReactNode;
  color: ButtonProps["color"];
  action: {
    label: string;
    onConfirm: () => unknown;
  };
  cancelable?: boolean;
  loading?: boolean;
};

const ConfirmDialog = ({ dialog, title, description, color, action, cancelable = true, loading }: Props) => {
  const { label, onConfirm } = action;

  const confirmBtn = useRef<ElementRef<typeof Button>>(null);

  useLayoutEffect(() => {
    if (!dialog.open) return;
    confirmBtn.current?.focus();
  }, [dialog.open]);

  return (
    <Modal
      isOpen={dialog.open}
      onOpenChange={dialog.toggle}
      hideCloseButton
      placement="center"
      backdrop="opaque"
      classNames={{
        base: "font-serif",
        backdrop: "bg-background/50",
        header: "border-b border-b-content3 dark:border-b-content3/50 py-3",
        body: "pb-0 pt-4",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <Fragment>
            <ModalHeader className="text-xl">{title}</ModalHeader>

            <ModalBody className="relative mb-2 font-sans">{description}</ModalBody>

            <ModalFooter>
              {cancelable && (
                <Button color="default" variant="bordered" isDisabled={!!loading} onPress={onClose}>
                  Cancel
                </Button>
              )}

              <Button type="submit" ref={confirmBtn} color={color} isLoading={!!loading} onPress={onConfirm}>
                {label}
              </Button>
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDialog;
