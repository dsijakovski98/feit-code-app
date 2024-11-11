import clsx from "clsx";

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
        variant="solid"
        isInvisible={NOTIFICATIONS === 0}
        className="aspect-square -translate-x-[5px] translate-y-1 scale-85 border-transparent bg-secondary dark:bg-warning-600"
      >
        <DropdownTrigger>
          <Button
            isIconOnly
            radius="full"
            variant="light"
            color="default"
            aria-label="Notifications menu"
            className="!bg-transparent p-1.5 lg:scale-90"
          >
            <Icon name="bell" />
          </Button>
        </DropdownTrigger>
      </Badge>
      <DropdownMenu disabledKeys={["empty", "notifications"]}>
        <DropdownItem key="notifications" className="opacity-100" textValue="Notifications">
          <p className="font-sans text-sm font-semibold">Notifications ({NOTIFICATIONS} new)</p>
        </DropdownItem>

        <DropdownItem
          key="empty"
          textValue="Empty"
          className={clsx("opacity-100", { hidden: NOTIFICATIONS > 0 })}
        >
          {NOTIFICATIONS === 0 && "No notifications yet."}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NotificationsMenu;
