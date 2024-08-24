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

  return (
    (!show.open || minimized.open) && (
      <section
        className={clsx(
          "absolute animate-appearance-in [animation-delay:300ms] inset-5 grid place-items-center",
        )}
      >
        <div className="text-center">
          <h2 className="text-4xl mb-2">
            {!show.open ? "Welp...That was fun I guess" : "Wow, you made it disappear!"}
          </h2>
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
    )
  );
};

export default WindowBlank;
