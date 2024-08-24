import { Fragment, PropsWithChildren, createContext } from "react";

import clsx from "clsx";
import { ClassValue } from "clsx";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { useDrag } from "@/hooks/useDrag";
import { useToggle } from "@/hooks/useToggle";

type Props = {
  className?: ClassValue;
} & PropsWithChildren;

const WindowContext = createContext<{ fullScreen: boolean } | null>(null);

const Window = ({ className = "", children }: Props) => {
  const { trigger, windowEl } = useDrag();

  const show = useToggle(true);
  const minimized = useToggle();

  const fullScreen = useToggle();

  const bringBack = () => {
    show.toggleOn();
    minimized.toggleOff();
  };

  return (
    <Fragment>
      <section
        ref={windowEl}
        className={clsx(
          "opacity-100 absolute rounded-xl lg:static overflow-hidden bg-content1 transition-all duration-300 data-[moving]:opacity-80 shadow-lg group",
          {
            "!opacity-0 translate-y-4": !show.open,
            "opacity-100 translate-y-0": show.open,
            "!opacity-0 scale-0": minimized.open,
            "!inset-0": fullScreen.open,
          },
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
                variant="light"
                color="warning"
                className="h-7 w-7 p-1 translate-y-0.5"
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
        </nav>

        <div className="px-3 py-4">
          <WindowContext.Provider value={{ fullScreen: fullScreen.open }}>
            {children}
          </WindowContext.Provider>
        </div>
      </section>

      {(!show.open || minimized.open) && (
        <section
          className={clsx(
            "debug absolute animate-appearance-in [animation-delay:300ms] inset-0 grid place-items-center",
          )}
        >
          <div className="text-center">
            <h1 className="text-4xl mb-2">
              {!show.open ? "Welp...That was fun I guess" : "Wow, you made it disappear!"}
            </h1>
            <p className="font-sans text-lg font-light mb-8">
              {!show.open ? "Let's get you back on track" : "Okay let's sign you in now"}
            </p>

            <Button
              color="default"
              variant="flat"
              startContent={<Icon name="login" className="w-4" />}
              onClick={bringBack}
            >
              Sign in
            </Button>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Window;
