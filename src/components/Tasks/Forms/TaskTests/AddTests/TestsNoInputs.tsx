import { Fragment } from "react";

import clsx from "clsx";

import { ModalBody } from "@nextui-org/modal";
import { Pagination } from "@nextui-org/pagination";
import { Tooltip } from "@nextui-org/react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";

import TestParameterCell from "@/components/Tasks/Forms/TaskTests/AddTests/TestParameterCell";
import TestsTableFooter from "@/components/Tasks/Forms/TaskTests/AddTests/TestTableFooter";
import NewOutputForm from "@/components/Tests/Forms/NewOutputForm";
import Icon from "@/components/ui/Icon";

import { TaskFormContext } from "@/context/TaskFormContext";
import { useCtx } from "@/hooks/useCtx";
import { ROWS_PER_PAGE, usePaginate } from "@/hooks/usePaginate";

const columns = [{ name: "Inputs" }, { name: "Output" }, { name: "Actions" }];

const TestNoInputsTable = () => {
  const { formState: examFormState, testsState } = useCtx(TaskFormContext);
  const [{ title }] = examFormState;
  const [tests] = testsState;

  const { page, pages, setPage, items: paginatedTests } = usePaginate(tests);

  return (
    <Fragment>
      <ModalBody>
        <div className="mb-10 space-y-6">
          <div>
            <p className="text-lg font-semibold">Add Tests</p>
            <p className="text-foreground-300">Finally, let's add some actual tests</p>
          </div>

          <Table
            removeWrapper
            classNames={{ emptyWrapper: "!h-fit" }}
            aria-label={`Tests for new task "${title}"`}
            topContent={
              paginatedTests.length > 1 && (
                <div className="flex items-center gap-2 font-semibold text-warning">
                  <Tooltip
                    placement="top-start"
                    content="Depending on the Task, it may be impossible for a function to  have multiple Outputs given the same (empty) Inputs."
                    className="p-4"
                    classNames={{ content: "text-base" }}
                  >
                    <div>
                      <Icon name="info" className="h-5 w-5 cursor-pointer" />
                    </div>
                  </Tooltip>
                  <p>Be careful adding multiple Tests with no Inputs</p>
                </div>
              )
            }
            bottomContent={
              <div className="mt-4 space-y-4">
                <Pagination
                  showControls
                  size="sm"
                  radius="full"
                  color="default"
                  variant="bordered"
                  page={page}
                  total={pages}
                  onChange={setPage}
                  hidden={tests.length < ROWS_PER_PAGE}
                  classNames={{
                    wrapper: "ml-auto",
                    cursor: "bg-foreground text-background",
                    prev: "w-5 h-5 p-0.5 min-w-0",
                    chevronNext: "w-5 h-5 p-0.5 min-w-0",
                  }}
                />

                <NewOutputForm />
              </div>
            }
          >
            <TableHeader columns={columns}>
              {({ name }) => (
                <TableColumn
                  key={name}
                  className={clsx("w-fit min-w-[120px] py-2 text-base first-of-type:!pl-4", {
                    "!w-[20px] !min-w-[20px] pl-5": name === "Actions",
                  })}
                >
                  {name === "Actions" ? <Icon name="down" className="h-6 w-6 scale-110 opacity-50" /> : name}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody items={paginatedTests} emptyContent={<p className="pt-6">No Tests added yet.</p>}>
              {(test) => (
                <TableRow key={test.id} className="group relative hover:bg-default-100">
                  {(columnKey) => (
                    <TableCell>
                      {columnKey === "Inputs" ? (
                        <p className="pl-1 text-base font-semibold text-foreground-300">None</p>
                      ) : (
                        <TestParameterCell test={test} columnKey={columnKey as string} />
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ModalBody>

      <TestsTableFooter />
    </Fragment>
  );
};

export default TestNoInputsTable;
