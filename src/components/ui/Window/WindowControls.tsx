import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

import { type Toggle } from "@/hooks/useToggle";

type Props = {
  show: Toggle;
  minimized: Toggle;
  fullScreen: Toggle;
};

const WindowControls = ({ show, minimized, fullScreen }: Props) => {
  return (
    <ul className="flex translate-y-1 items-start justify-end gap-3 md:gap-4 [&_button]:!min-w-0">
      <li className="*:-translate-y-0.5">
        <ThemeSwitcher size="sm" />
      </li>

      <li>
        <Button
          isIconOnly
          variant="light"
          radius="full"
          color="default"
          aria-label="Minimize window"
          className="h-6 w-6 p-px"
          onPress={minimized.toggleOn}
        >
          <Icon name="minus" />
        </Button>
      </li>

      <li>
        <Button
          isIconOnly
          variant="light"
          radius="full"
          color="default"
          aria-label="Toggle fullscreen"
          className="h-6 w-6 p-1"
          onPress={fullScreen.toggle}
        >
          {fullScreen.open ? <Icon name="off-screen" /> : <Icon name="full-screen" />}
        </Button>
      </li>

      <li>
        <Button
          isIconOnly
          variant="light"
          radius="full"
          color="default"
          aria-label="Close window"
          className="h-6 w-6 p-0.5"
          onPress={show.toggleOff}
        >
          <Icon name="close" />
        </Button>
      </li>
    </ul>
  );
};

export default WindowControls;
