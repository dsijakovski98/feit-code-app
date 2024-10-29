import clsx from "clsx";

import { Badge } from "@nextui-org/react";

type Props = {
  value: number;
  label: string;
  badge?: boolean;
  size?: "sm" | "md";
};

const Stat = ({ value, label, badge = false, size = "md" }: Props) => {
  return (
    <div>
      <p
        className={clsx("font-bold", {
          "text-6xl font-bold": size === "md",
          "text-4xl font-semibold": size === "sm",
        })}
      >
        {value > 9 ? "9+" : value}
      </p>

      <Badge
        content=""
        color="warning"
        isDot
        isInvisible={!badge}
        className="translate-x-[18px] translate-y-0 scale-85 animate-pulse"
      >
        <p>{label}</p>
      </Badge>
    </div>
  );
};

export default Stat;
