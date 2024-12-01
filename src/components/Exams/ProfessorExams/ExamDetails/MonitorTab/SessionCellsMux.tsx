import { useMemo } from "react";

import clsx from "clsx";
import { motion } from "framer-motion";

import { User } from "@nextui-org/user";

import SessionActions from "@/components/Exams/ProfessorExams/ExamDetails/MonitorTab/SessionActions";

import { SESSION_COLUMNS } from "@/constants/students";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { StudentSessionContext } from "@/context/StudentSessionContext";
import { useAvatar } from "@/hooks/useAvatar";
import { useCtx } from "@/hooks/useCtx";
import { ColumnKey } from "@/types";

type Props = {
  columnKey: ColumnKey<(typeof SESSION_COLUMNS)["lg"]> | ColumnKey<(typeof SESSION_COLUMNS)["sm"]>;
};

const SessionCellsMux = ({ columnKey }: Props) => {
  const { isMobile, isMobileSm } = useCtx(ResponsiveContext);
  const { session } = useCtx(StudentSessionContext);

  const { student, pasteCount, timeOff } = session;
  const { id, firstName, lastName, email } = student;

  const totalTimeOff = useMemo(() => {
    const timeChunks = Object.values(timeOff ?? {});

    if (timeChunks.length === 0) return 0;

    return timeChunks.reduce((acc, current) => acc + current, 0);
  }, [timeOff]);

  const timeOffDuration = useMemo(() => {
    const timePlural = (time: string, value: number) => `${time}${value > 1 && "s"}`;

    if (totalTimeOff < 60) return `${totalTimeOff} ${timePlural("second", totalTimeOff)}`;

    const totalMinutes = Math.floor(totalTimeOff / 60);
    if (totalMinutes < 60) return `${totalMinutes} ${timePlural("minute", totalMinutes)}`;

    const totalHours = Math.floor(totalMinutes / 60);
    return `${totalHours} ${timePlural("hour", totalHours)}`;
  }, [totalTimeOff]);

  const [studentAvatar, isLoading] = useAvatar(id);

  if (columnKey === "student") {
    return (
      <User
        name={`${firstName} ${lastName}`}
        description={email}
        avatarProps={{
          size: isMobile ? "md" : "lg",
          src: studentAvatar ?? "",
          showFallback: isLoading,
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
