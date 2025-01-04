import { InferSelectModel } from "drizzle-orm";

import { Chip } from "@nextui-org/chip";

import { categories } from "@/db/schema";

import { getContrastText } from "@/utils";

type Props = {
  category: InferSelectModel<typeof categories>;
};

const CategoryChip = ({ category }: Props) => {
  const { label, color } = category;

  return (
    <Chip
      size="sm"
      className="text-sm lg:text-xs"
      style={
        color
          ? {
              backgroundColor: `${color}ef`,
              color: getContrastText(color),
            }
          : {}
      }
      classNames={{
        content: "font-semibold",
      }}
    >
      {label}
    </Chip>
  );
};

export default CategoryChip;
