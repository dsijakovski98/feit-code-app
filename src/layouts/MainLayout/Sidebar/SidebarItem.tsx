import { ComponentProps, ReactNode, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

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
  const { pathname } = useLocation();
  const active = useMemo(() => props.href === pathname, [props.href, pathname]);

  if (props.isSkeleton) {
    return <Skeleton as="li" className="h-12 w-12 rounded-full" />;
  }

  const { href, icon, label, target, className = "" } = props;

  return (
    <li className="mx-auto min-w-fit max-w-[8ch]">
      <Link
        to={href!}
        target={target}
        className={clsx(
          "group flex w-full flex-col items-center gap-1 *:transition-colors visited:text-current target:text-danger hover:text-primary",
          {
            "!text-primary-500": active,
          },
          className,
        )}
      >
        <div className="h-7 w-7 overflow-hidden rounded-full">{icon}</div>
        <p className="w-full text-center text-sm font-semibold">{label}</p>
      </Link>
    </li>
  );
};

export default SidebarItem;
