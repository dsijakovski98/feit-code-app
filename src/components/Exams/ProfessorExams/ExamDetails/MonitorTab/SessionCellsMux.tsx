import { useMemo } from "react";

import { motion } from "framer-motion";

import { Chip } from "@nextui-org/chip";

import SessionActions from "@/components/Exams/ProfessorExams/ExamDetails/MonitorTab/SessionActions";
import StudentCell from "@/components/ui/Table/Cells/StudentCell";

import { SESSION_COLUMNS } from "@/constants/students";
import { StudentSessionContext } from "@/context/StudentSessionContext";
import { useCtx } from "@/hooks/useCtx";
import { ColumnKey } from "@/types";
import { sessionStatusColor, sessionTimeOffDuration } from "@/utils/exams/sessions";

type Props = {
  columnKey: ColumnKey<typeof SESSION_COLUMNS.lg>;
};

const SessionCellsMux = ({ columnKey }: Props) => {
  const { session } = useCtx(StudentSessionContext);
  const { student, status, pasteCount, timeOff } = session;
  const { firstName, lastName, email } = student;

  const totalTimeOff = useMemo(() => {
    const timeChunks = Object.values(timeOff ?? {});

    return timeChunks.reduce((acc, current) => acc + current, 0);
  }, [timeOff]);

  const timeOffDuration = useMemo(() => sessionTimeOffDuration(totalTimeOff), [totalTimeOff]);

  if (columnKey === "student") {
    return <StudentCell student={{ firstName, lastName, email }} avatar={{ url: student.avatarUrl }} />;
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
