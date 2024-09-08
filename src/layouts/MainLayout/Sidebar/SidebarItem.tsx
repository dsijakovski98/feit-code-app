import { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";

import { ClassValue } from "clsx";
import clsx from "clsx";

import { Skeleton } from "@nextui-org/react";

type Props =
  | {
      isSkeleton?: undefined;
      href: string;
      target?: ComponentProps<"a">["target"];
      label: string;
      icon: ReactNode;
      className?: ClassValue;
    }
  | {
      isSkeleton: boolean;
      href?: never;
      target?: never;
      label?: never;
      icon?: never;
      className?: never;
    };

const SidebarItem = (props: Props) => {
  if (props.isSkeleton) {
    return <Skeleton as="li" className="h-12 w-12 rounded-full" />;
  }

  const { href, icon, label, target, className = "" } = props;

  return (
    <li>
      <Link
        to={href!}
        target={target}
        className={clsx(
          "group flex flex-col items-center gap-1 *:transition-colors hover:text-primary focus:text-primary",
          className,
        )}
      >
        <div className="h-7 w-7 overflow-hidden rounded-full">{icon}</div>
        <p className="max-w-[7ch] text-center text-sm">{label}</p>
      </Link>
    </li>
  );
};

export default SidebarItem;
