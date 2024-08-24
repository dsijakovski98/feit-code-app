import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { type Toggle } from "@/hooks/useToggle";

type Props = {
  show: Toggle;
  minimized: Toggle;
  fullScreen: Toggle;
};

const WindowControls = ({ show, minimized, fullScreen }: Props) => {
  return (
    <ul className="flex items-center justify-end gap-3 [&_button]:!min-w-0">
      <li>
        <Button
          isIconOnly
          variant="shadow"
          radius="full"
          className="h-5 w-5 p-1"
          onClick={minimized.toggleOn}
        >
          <Icon name="minus" />
        </Button>
      </li>

      <li>
        <Button
          isIconOnly
          radius="full"
          color="warning"
          className="h-5 w-5 p-1"
          onClick={fullScreen.toggle}
        >
          {fullScreen.open ? <Icon name="off-screen" /> : <Icon name="full-screen" />}
        </Button>
      </li>

      <li>
        <Button
          isIconOnly
          radius="full"
          color="danger"
          className="h-5 w-5 p-1"
          onClick={show.toggleOff}
        >
          <Icon name="close" />
        </Button>
      </li>
    </ul>
  );
};

export default WindowControls;
