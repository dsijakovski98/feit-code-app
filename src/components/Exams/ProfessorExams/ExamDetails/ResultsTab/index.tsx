import { Fragment, useDeferredValue, useMemo, useState } from "react";

import {
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import TableHeading from "@/components/ui/Table/TableHeading";
import TablePagination from "@/components/ui/Table/TablePagination";
import TableSearch from "@/components/ui/Table/TableSearch";

import { EXAM_RESULTS_COLUMNS } from "@/constants/exams";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { usePaginate } from "@/hooks/usePaginate";
import { useToggle } from "@/hooks/useToggle";

const ResultsTab = () => {
  const { isMobileSm } = useCtx(ResponsiveContext);
  const { examDetails } = useCtx(ExamDetailsContext);
  const { submissions } = examDetails;
  const totalSubmissions = submissions.length;

  const submissionDialog = useToggle();

  const [selectedSubmission, setSelectedSubmission] = useState<(typeof submissions)[number] | null>(null);

  const selectedKeys = useMemo(
    () => new Set(selectedSubmission ? [selectedSubmission.id] : []),
    [selectedSubmission],
  );

  const [search, setSearch] = useState("");
  const searchQuery = useDeferredValue(search);

  const pagination = usePaginate(submissions);
  const { items: submissionItems } = pagination;

  const submissionsList = useMemo(() => {
    if (searchQuery.trim().length === 0) return submissionItems;

    return submissionItems.filter((submission) => {
      const { student } = submission;
      const studentName = `${student.firstName} ${student.lastName}`;

      return studentName.match(new RegExp(searchQuery, "i"));
    });
  }, [searchQuery, submissionItems]);

  const handleSelect = (key: Selection) => {
    const [submissionId] = [...new Set(key)];
    const submission = submissionsList.find((submission) => submission.id === submissionId);

    if (!submission) return;

    setSelectedSubmission(submission);
    submissionDialog.toggleOn();
  };

  return (
    <Fragment>
      <Table
        removeWrapper
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelect}
        selectionMode={isMobileSm ? "none" : "single"}
        topContent={
          <TableHeading itemName="Submission" totalItems={totalSubmissions}>
            <TableSearch search={search} onSearch={setSearch} />
          </TableHeading>
        }
        bottomContent={<TablePagination {...pagination} items={submissionsList} disabled={!!searchQuery} />}
        aria-label={`List of students that have submitted solutions for ${examDetails.name} exam.`}
        classNames={{ td: "py-3" }}
      >
        <TableHeader columns={isMobileSm ? EXAM_RESULTS_COLUMNS.sm : EXAM_RESULTS_COLUMNS.lg}>
          {(column) => (
            <TableColumn key={column.key} className="text-xs font-bold uppercase text-foreground-300">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={submissionsList} emptyContent="No one has submitted a solution.">
          {(submission) => (
            <TableRow key={submission.id}>{(columnKey) => <TableCell>{columnKey}</TableCell>}</TableRow>
          )}
        </TableBody>
      </Table>

      {/* TODO: Submission Details dialog */}
    </Fragment>
  );
};

export default ResultsTab;
