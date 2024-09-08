import { Badge } from "@nextui-org/badge";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const NOTIFICATIONS: number = 20;

const NotificationsMenu = () => {
  // TODO: Notification system
  return (
    <Dropdown placement="bottom-end">
      <Badge
        isDot
        isInvisible={NOTIFICATIONS === 0}
        variant="solid"
        color="warning"
        className="aspect-square -translate-x-1 translate-y-0.5 border-[1.5px] border-current dark:border-white"
      >
        <DropdownTrigger>
          <Button
            isIconOnly
            radius="full"
            variant="light"
            color="default"
            className="!bg-transparent p-1"
          >
            <Icon name="bell" />
          </Button>
        </DropdownTrigger>
      </Badge>
      <DropdownMenu disabledKeys={["empty", "notifications"]}>
        <DropdownItem key="notifications" className="opacity-100" textValue="Notifications">
          <p className="font-quicksand text-sm font-semibold">
            Notifications ({NOTIFICATIONS} new)
          </p>
        </DropdownItem>

        <DropdownItem
          key="empty"
          textValue="Empty"
          className="opacity-100"
          hidden={NOTIFICATIONS > 0}
        >
          {NOTIFICATIONS === 0 && "No notifications yet."}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationsMenu;
