import { ComponentProps, Fragment, useDeferredValue, useMemo, useState } from "react";

import clsx from "clsx";

import { Tooltip } from "@nextui-org/react";
import {
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import SessionCellsMux from "@/components/Exams/ProfessorExams/ExamDetails/MonitorTab/SessionCellsMux";
import SessionDetails from "@/components/Exams/ProfessorExams/ExamDetails/MonitorTab/SessionDetails";
import Icon from "@/components/ui/Icon";
import TableHeading from "@/components/ui/Table/TableHeading";
import TablePagination from "@/components/ui/Table/TablePagination";
import TableSearch from "@/components/ui/Table/TableSearch";

import { SESSION_COLUMNS } from "@/constants/students";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { MonitorExamContext } from "@/context/MonitorExamContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { StudentSessionProvider } from "@/context/StudentSessionContext";
import { useCtx } from "@/hooks/useCtx";
import { usePaginate } from "@/hooks/usePaginate";
import { useToggle } from "@/hooks/useToggle";

const SessionsTable = () => {
  const { isMobileSm } = useCtx(ResponsiveContext);
  const { studentSessions } = useCtx(MonitorExamContext);
  const { examDetails } = useCtx(ExamDetailsContext);
  const totalSessions = studentSessions.length;

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const selectedSession = useMemo(() => {
    if (!selectedSessionId) return null;

    const session = studentSessions.find((studentSession) => studentSession.sessionId === selectedSessionId);
    if (!session) return null;

    return session;
  }, [selectedSessionId, studentSessions]);

  const selectedKeys = useMemo(
    () => new Set(selectedSession ? [selectedSession.student.id] : []),
    [selectedSession],
  );

  const detailsDialog = useToggle();

  const [search, setSearch] = useState("");
  const searchQuery = useDeferredValue(search);

  const pagination = usePaginate(studentSessions);
  const { items: sessionItems } = pagination;

  const sessionsList = useMemo(() => {
    if (searchQuery.trim().length === 0) return sessionItems;

    return sessionItems.filter((session) => {
      const { student } = session;
      const studentName = `${student.firstName} ${student.lastName}`;

      return studentName.match(new RegExp(searchQuery, "i"));
    });
  }, [searchQuery, sessionItems]);

  const disabledSessions = useMemo(() => {
    const removedSessions = studentSessions.filter((session) => !!session.removed);

    return new Set(removedSessions.map((session) => session.student.id));
  }, [studentSessions]);

  const handleSelect = (key: Selection) => {
    const [studentId] = [...new Set(key)];
    const session = sessionsList.find((session) => session.student.id === studentId);

    if (!session) return;

    setSelectedSessionId(session.sessionId);
    detailsDialog.toggleOn();
  };

  return (
    <Fragment>
      <Table
        removeWrapper
        onSelectionChange={handleSelect}
        selectionMode={isMobileSm ? "none" : "single"}
        selectedKeys={selectedKeys}
        disabledKeys={disabledSessions}
        topContent={
          <TableHeading itemName="Student" totalItems={totalSessions}>
            <TableSearch search={search} onSearch={setSearch} />
          </TableHeading>
        }
        bottomContent={<TablePagination {...pagination} items={sessionsList} disabled={!!searchQuery} />}
        aria-label={`List of students doing ${examDetails.name} exam.`}
        classNames={{ td: "py-3" }}
      >
        <TableHeader columns={isMobileSm ? SESSION_COLUMNS.sm : SESSION_COLUMNS.lg}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={
                column.key === "actions"
                  ? isMobileSm
                    ? "end"
                    : "center"
                  : column.key === "paste" || column.key === "blur" || column.key === "status"
                    ? "center"
                    : "start"
              }
              className="text-xs font-bold uppercase text-foreground-300"
            >
              <div
                className={clsx("flex w-full items-center gap-2", {
                  "justify-center":
                    column.key === "paste" || column.key === "blur" || column.key === "status",
                  "lg:justify-end": column.key === "actions",
                })}
              >
                {column.label}
                {(column.key === "paste" || column.key === "blur") && (
                  <Tooltip
                    content={
                      <p className="p-1">
                        {column.key === "paste" &&
                          "Number of times the Student has pasted code into the editor."}

                        {column.key === "blur" &&
                          "Total time the Student has opened a different tab/window from the session."}
                      </p>
                    }
                  >
                    <p className="cursor-help">
                      <Icon name="info" className="h-3 w-3" />
                    </p>
                  </Tooltip>
                )}
              </div>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sessionsList} emptyContent="No one has joined exam yet.">
          {(session) => (
            <TableRow
              key={session.student.id}
              className="cursor-pointer data-[disabled]:select-none data-[disabled]:opacity-50 lg:cursor-default"
            >
              {(columnKey) => (
                <TableCell
                  align={
                    columnKey === "actions"
                      ? isMobileSm
                        ? "right"
                        : "center"
                      : columnKey === "paste" || columnKey === "blur" || columnKey === "status"
                        ? "center"
                        : "left"
                  }
                >
                  <StudentSessionProvider session={session}>
                    <SessionCellsMux
                      columnKey={columnKey as ComponentProps<typeof SessionCellsMux>["columnKey"]}
                    />
                  </StudentSessionProvider>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <SessionDetails
        dialog={detailsDialog}
        session={selectedSession}
        onClose={() => setSelectedSessionId(null)}
      />
    </Fragment>
  );
};

export default SessionsTable;
