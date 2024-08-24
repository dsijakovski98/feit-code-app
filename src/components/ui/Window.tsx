import { PropsWithChildren } from "react";

import clsx from "clsx";
import { ClassValue } from "clsx";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { useDrag } from "@/hooks/useDrag";

type Props = {
  className?: ClassValue;
} & PropsWithChildren;

const Window = ({ className = "", children }: Props) => {
  const { trigger, windowEl } = useDrag();

  return (
    <section
      ref={windowEl}
      className={clsx(
        "max-w-[60dvw] absolute rounded-xl overflow-hidden bg-content1 data-[moving]:opacity-80 shadow-lg group",
        className,
      )}
    >
      <nav className="flex items-center p-3 py-2 justify-between bg-content2">
        <div
          ref={trigger}
          className="grow cursor-grab group-data-[moving]:cursor-grabbing lg:cursor-default"
        >
          <p className="font-semibold text-lg group-data-[moving]:select-none">Sign in</p>
        </div>
        <ul className="flex items-center justify-end gap-3 [&_button]:!min-w-0">
          <li>
            <Button isIconOnly variant="shadow" radius="full" className="h-5 w-5 p-1">
              <Icon name="minus" />
            </Button>
          </li>

          <li>
            <Button
              isIconOnly
              variant="light"
              color="warning"
              radius="full"
              className="h-6 w-6 p-1 translate-y-px"
            >
              <Icon name="full-screen" />
            </Button>
          </li>

          <li>
            <Button isIconOnly color="danger" radius="full" size="sm" className="h-5 w-5 p-1">
              <Icon name="close" />
            </Button>
          </li>
        </ul>
      </nav>

      <div className="px-3 py-4">{children}</div>
    </section>
  );
};

export default Window;
