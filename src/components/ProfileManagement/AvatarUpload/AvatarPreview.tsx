import { Fragment, forwardRef } from "react";

import { Avatar } from "@nextui-org/avatar";
import { Modal, ModalContent } from "@nextui-org/modal";

import Button from "@/components/ui/Button";

import { useToggle } from "@/hooks/useToggle";

type Props = {
  avatar: string;
};

const AvatarPreview = forwardRef<HTMLImageElement, Props>(({ avatar }, ref) => {
  const previewToggle = useToggle();

  if (!avatar) {
    return <Avatar className="h-[100px] w-[100px] lg:h-[80px] lg:w-[80px]" />;
  }

  return (
    <Fragment>
      <Button
        isIconOnly
        radius="full"
        color="default"
        variant="bordered"
        className="h-[100px] w-[100px] bg-transparent lg:h-[80px] lg:w-[80px]"
        onPress={previewToggle.toggleOn}
      >
        <img ref={ref} alt="Avatar" src={avatar} className="h-full w-full object-cover" />
      </Button>

      <Modal
        backdrop="blur"
        placement="center"
        hideCloseButton
        isOpen={previewToggle.open}
        onClose={previewToggle.toggleOff}
        classNames={{
          backdrop: "backdrop-blur-sm brightness-50 dark:mix-blend-darken",
          base: "max-w-[480px] lg:max-w-[70%] lg:min-w-0",
        }}
      >
        <ModalContent>
          <img
            src={avatar}
            alt="Avatar preview"
            className="w-full overflow-hidden rounded-lg object-cover"
          />
        </ModalContent>
      </Modal>
    </Fragment>
  );
});

export default AvatarPreview;
