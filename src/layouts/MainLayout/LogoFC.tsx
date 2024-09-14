import { Link } from "react-router-dom";

import clsx, { ClassValue } from "clsx";

import { ROUTES } from "@/constants/routes";

type Props = {
  className?: ClassValue;
};

const LogoFC = ({ className = "" }: Props) => {
  return (
    <Link
      to={ROUTES.dashboard}
      className={clsx(
        "flex w-fit max-w-14 transition-[filter] hover:brightness-150 dark:brightness-100 dark:hover:drop-shadow-[0px_0px_8px_theme(colors.primary)] lg:max-w-12",
        className,
      )}
    >
      <img src="/images/logo.svg" />
    </Link>
  );
};

export default LogoFC;
