import { useMemo } from "react";

import { Tooltip } from "@nextui-org/react";

import { getDaytime, getRelativeTimeString } from "@/utils";

type Props = {
  children: string;
};

const Timestamp = ({ children: timestamp }: Props) => {
  const date = useMemo(() => new Date(timestamp), [timestamp]);

  const relativeTime = useMemo(() => getRelativeTimeString(date), [date]);
  const formattedDate = useMemo(() => getDaytime(date), [date]);

  return (
    <Tooltip content={formattedDate} classNames={{ content: "font-semibold" }}>
      <b className="cursor-help font-semibold">{relativeTime}</b>
    </Tooltip>
  );
};

export default Timestamp;
