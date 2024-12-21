import { ComponentProps, useMemo } from "react";

import dayjs from "dayjs";

import Countdown from "@/components/ui/Countdown";
import TableHeading from "@/components/ui/Table/TableHeading";
import TableSearch from "@/components/ui/Table/TableSearch";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { MonitorExamContext } from "@/context/MonitorExamContext";
import { useCtx } from "@/hooks/useCtx";

type Props = {} & ComponentProps<typeof TableSearch>;

const SessionsHeader = ({ ...searchProps }: Props) => {
  const { studentSessions } = useCtx(MonitorExamContext);
  const { examDetails } = useCtx(ExamDetailsContext);
  const { startedAt, durationMinutes } = examDetails;

  const totalSessions = studentSessions.length;

  const activeSessionsCount = useMemo(
    () => studentSessions.filter((session) => session.status === "Active").length,
    [studentSessions],
  );
  const finishedSessionsCount = useMemo(
    () => studentSessions.filter((session) => session.status === "Finished").length,
    [studentSessions],
  );

  const targetDate = useMemo(
    () => dayjs(startedAt).add(durationMinutes, "minutes"),
    [startedAt, durationMinutes],
  );

  return (
    <TableHeading itemName="Student" totalItems={totalSessions} className="!gap-0">
      <div className="mr-auto text-foreground-300 lg:hidden">
        <p className="pl-1 leading-none">
          ・ Active: {activeSessionsCount} ・ Finished: {finishedSessionsCount}
        </p>
      </div>

      <Countdown
        targetDate={targetDate}
        className="mr-5 text-2xl leading-none text-foreground-300 lg:hidden"
      />

      <TableSearch {...searchProps} className="w-[280px]" />
    </TableHeading>
  );
};

export default SessionsHeader;
