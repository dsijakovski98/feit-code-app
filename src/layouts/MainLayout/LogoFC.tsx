import { Link } from "react-router-dom";

import clsx, { ClassValue } from "clsx";

import logo from "@/images/logo.svg?w=75&h=75&img";

import { ROUTES } from "@/constants/routes";

type Props = {
  className?: ClassValue;
};

const LogoFC = ({ className = "" }: Props) => {
  return (
    <Link
      aria-label="Homepage"
      to={ROUTES.dashboard}
      className={clsx("flex w-fit max-w-14 brightness-90 lg:max-w-12", className)}
    >
      <img src={logo} alt="FEIT Code logo" className="scale-[1.35] lg:scale-[1.5]" />
    </Link>
  );
};

export default LogoFC;
