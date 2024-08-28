import { ElementRef, useLayoutEffect, useMemo, useReducer, useRef } from "react";

import clsx from "clsx";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { Toggle } from "@/hooks/useToggle";

type Props = {
  show: Toggle;
  minimized: Toggle;
};

const WindowBlank = ({ show, minimized }: Props) => {
  const bringBack = () => {
    show.toggleOn();
    minimized.toggleOff();
  };

  const signInBtn = useRef<ElementRef<"button">>(null);

  const shouldShow = useMemo(() => !show.open || minimized.open, [show.open, minimized.open]);

  useLayoutEffect(() => {
    if (!signInBtn.current) return;

    if (!shouldShow) return;

    signInBtn.current.focus();
  }, [shouldShow]);

  return (
    shouldShow && (
      <section
        className={clsx(
          "absolute inset-5 grid animate-appearance-in place-items-center [animation-delay:300ms]",
        )}
      >
        <div className="text-center">
          <h2 className="mb-2 text-4xl">
            {!show.open ? "Welp...That was fun I guess" : "Wow, you made it disappear!"}
          </h2>
          <p className="mb-8 font-sans text-lg font-light">
            {!show.open ? "Let's get you back on track" : "Okay let's sign you in now"}
          </p>

          <Button
            ref={signInBtn}
            color="default"
            variant="flat"
            onPress={bringBack}
            startContent={<Icon name="login" className="w-4" />}
          >
            Sign in
          </Button>
        </div>
      </section>
    )
  );
};

export default WindowBlank;
