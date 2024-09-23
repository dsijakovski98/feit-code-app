import { Link } from "react-router-dom";

import clsx, { ClassValue } from "clsx";

import { ROUTES } from "@/constants/routes";

type Props = {
  className?: ClassValue;
};

const LogoFC = ({ className = "" }: Props) => {
  return (
    <Link
      aria-label="Homepage"
      to={ROUTES.dashboard}
      className={clsx(
        "flex w-fit max-w-14 brightness-90 transition-[filter] hover:!brightness-105 dark:!brightness-100 dark:hover:drop-shadow-[0px_0px_8px_theme(colors.primary)] lg:max-w-12",
        className,
      )}
    >
      <img src="/images/logo.svg" alt="FEIT Code logo" className="scale-[1.35] lg:scale-[1.5]" />
    </Link>
  );
};

export default LogoFC;
