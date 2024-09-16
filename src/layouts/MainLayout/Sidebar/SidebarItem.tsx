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

  const active = useMemo(
    () => props.href === pathname || pathname.endsWith(props.href ?? ""),
    [props.href, pathname],
  );

  if (props.isSkeleton) {
    return <Skeleton as="li" className="h-12 w-12 rounded-full lg:h-11 lg:w-11" />;
  }

  const { href, icon, label, target, className = "" } = props;

  return (
    <li className="mx-auto min-w-fit max-w-[8ch] lg:mx-[initial] lg:w-[8ch]">
      <Link
        to={href!}
        target={target}
        className={clsx("group grid w-full place-items-center text-primary-foreground", className)}
      >
        <div className="grid place-items-center">
          <div
            className={clsx(
              "h-7 w-7 overflow-hidden rounded-full text-primary-foreground transition-colors group-target:hover:text-black group-focus:text-black dark:group-hover:text-primary-500 dark:group-focus:text-primary-500 lg:h-6 lg:w-6",
              {
                "!text-black dark:!text-primary-500": active,
              },
            )}
          >
            {icon}
          </div>
          <p
            className={clsx(
              "w-full text-center text-sm font-semibold text-primary-foreground transition-colors group-hover:text-black group-focus:text-black dark:group-hover:text-primary-500 dark:group-focus:text-primary-500",
              {
                "!text-black dark:!text-primary-500": active,
              },
            )}
          >
            {label}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default SidebarItem;
