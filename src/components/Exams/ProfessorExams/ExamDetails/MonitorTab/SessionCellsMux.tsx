import { useMemo } from "react";

import clsx from "clsx";
import { motion } from "framer-motion";

import { Chip } from "@nextui-org/chip";
import { User } from "@nextui-org/user";

import SessionActions from "@/components/Exams/ProfessorExams/ExamDetails/MonitorTab/SessionActions";

import { SESSION_COLUMNS } from "@/constants/students";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { StudentSessionContext } from "@/context/StudentSessionContext";
import { useCtx } from "@/hooks/useCtx";
import { ColumnKey } from "@/types";
import { sessionStatusColor, sessionTimeOffDuration } from "@/utils/examSession";

type Props = {
  columnKey: ColumnKey<(typeof SESSION_COLUMNS)["lg"]> | ColumnKey<(typeof SESSION_COLUMNS)["sm"]>;
};

const SessionCellsMux = ({ columnKey }: Props) => {
  const { isMobile, isMobileSm } = useCtx(ResponsiveContext);
  const { session } = useCtx(StudentSessionContext);

  const { student, status, pasteCount, timeOff } = session;
  const { firstName, lastName, email } = student;

  const totalTimeOff = useMemo(() => {
    const timeChunks = Object.values(timeOff ?? {});

    return timeChunks.reduce((acc, current) => acc + current, 0);
  }, [timeOff]);

  const timeOffDuration = useMemo(() => sessionTimeOffDuration(totalTimeOff), [totalTimeOff]);

  if (columnKey === "student") {
    return (
      <User
        name={`${firstName} ${lastName}`}
        description={email}
        avatarProps={{
          size: isMobile ? "md" : "lg",
          src: student.avatarUrl ?? "",
          className: clsx({
            "scale-[1.2]": isMobile,
            hidden: isMobileSm,
          }),
        }}
        classNames={{
          base: clsx({
            "gap-3": isMobile,
          }),
          name: clsx("text-base font-semibold", {
            "text-sm": isMobile,
          }),
          description: clsx("text-sm", {
            "text-xs sm:hidden": isMobile,
          }),
        }}
      />
    );
  }

  if (columnKey === "status") {
    return (
      <Chip size="sm" color={sessionStatusColor(status)} classNames={{ content: "font-semibold text-sm" }}>
        {status}
      </Chip>
    );
  }

  if (columnKey === "paste") {
    return (
      <motion.p
        key={pasteCount}
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="text-base font-semibold"
      >
        {pasteCount}
      </motion.p>
    );
  }

  if (columnKey === "blur") {
    return (
      <motion.p
        key={timeOffDuration}
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="text-base"
      >
        {timeOffDuration}
      </motion.p>
    );
  }

  if (columnKey === "actions") {
    return (
      <div className="w-fit lg:w-auto">
        <SessionActions />
      </div>
    );
  }

  throw new Error(`Column key ${columnKey} is not supported!`);
};

export default SessionCellsMux;
