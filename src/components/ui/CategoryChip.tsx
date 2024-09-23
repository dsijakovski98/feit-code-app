import clsx from "clsx";
import { InferSelectModel } from "drizzle-orm";

import { Chip } from "@nextui-org/react";

import { categories } from "@/db/schema";

import { getContrastText } from "@/utils";

type Props = {
  category: InferSelectModel<typeof categories>;
  size?: "xs" | "sm";
};

const CategoryChip = ({ category, size = "xs" }: Props) => {
  const { label, color } = category;

  return (
    <Chip
      size="sm"
      className={clsx("text-xs lg:!text-xs", {
        "text-sm": size === "sm",
      })}
      style={
        color
          ? {
              backgroundColor: color,
              color: getContrastText(color),
            }
          : {}
      }
      classNames={{
        content: "font-bold",
      }}
    >
      {label}
    </Chip>
  );
};

export default CategoryChip;
