import { ComponentRef, Fragment, ReactNode, useLayoutEffect, useRef } from "react";

import { ButtonProps } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import Button from "@/components/ui/Button";

import { Toggle } from "@/hooks/useToggle";

type Props = {
  dialog: Toggle;
  title: ReactNode;
  description: ReactNode;
  color: ButtonProps["color"];
  action: {
    label: string;
    onConfirm?: () => unknown;
  };
  formId?: string;
  cancelable?: boolean;
  loading?: boolean;
};

const ConfirmDialog = (props: Props) => {
  const { dialog, title, description, color, action, formId, cancelable = true, loading } = props;
  const { label, onConfirm } = action;

  const confirmBtn = useRef<ComponentRef<typeof Button>>(null);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && !cancelable) return;
    if (loading) return;

    dialog.toggle();
  };

  useLayoutEffect(() => {
    if (!dialog.open) return;
    const button = confirmBtn.current as unknown as HTMLButtonElement;
    button.focus();
  }, [dialog.open]);

  return (
    <Modal
      isOpen={dialog.open}
      onOpenChange={handleOpenChange}
      hideCloseButton
      placement="center"
      backdrop="opaque"
      size="xl"
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

              <Button
                type="submit"
                form={formId}
                ref={confirmBtn}
                color={color}
                isLoading={!!loading}
                onPress={onConfirm}
              >
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
