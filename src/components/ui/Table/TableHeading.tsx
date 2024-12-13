import { PropsWithChildren } from "react";

import clsx, { ClassValue } from "clsx";

import { simplePlural } from "@/utils";

type Props = {
  itemName: string;
  totalItems: number;
  className?: ClassValue;
} & PropsWithChildren;

const TableHeading = ({ itemName, totalItems, children, className = "" }: Props) => {
  return (
    <div className={clsx("flex items-end justify-between gap-6 md:items-center", className)}>
      <p className="leading-none text-foreground-300">
        Total: {totalItems} {simplePlural(itemName, totalItems)}
      </p>

      {children}
    </div>
  );
};

export default TableHeading;
