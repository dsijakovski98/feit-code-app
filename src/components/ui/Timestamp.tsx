import { useMemo } from "react";

import { Tooltip } from "@nextui-org/react";

import { getRelativeTimeString } from "@/utils";

type Props = {
  children: string;
};

const Timestamp = ({ children: timestamp }: Props) => {
  const relativeTime = useMemo(() => getRelativeTimeString(new Date(timestamp)), [timestamp]);
  const formattedDate = useMemo(() => new Date(timestamp).toDateString(), [timestamp]);

  return (
    <Tooltip content={formattedDate} classNames={{ content: "font-semibold" }}>
      <b className="cursor-help font-semibold">{relativeTime}</b>
    </Tooltip>
  );
};

export default Timestamp;
