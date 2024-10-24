import { Fragment, useMemo } from "react";

import clsx from "clsx";

import { ModalBody } from "@nextui-org/modal";
import { Pagination } from "@nextui-org/pagination";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";

import TestParameterCell from "@/components/Tasks/Forms/TaskTests/AddTests/TestParameterCell";
import TestsTableFooter from "@/components/Tasks/Forms/TaskTests/AddTests/TestTableFooter";
import NewInputsForm from "@/components/Tests/Forms/NewInputsForm";
import Icon from "@/components/ui/Icon";
import ParameterTypeIcon from "@/components/ui/ParameterTypeIcon";

import { TaskFormContext } from "@/context/TaskFormContext";
import { TestFormContext } from "@/context/TestFormContext";
import { useCtx } from "@/hooks/useCtx";
import { ROWS_PER_PAGE, usePaginate } from "@/hooks/usePaginate";

const TestInputsTable = () => {
  const { formState: examFormState, testsState } = useCtx(TaskFormContext);
  const [{ title }] = examFormState;
  const [tests] = testsState;

  const { inputsMetaState, outputTypeState } = useCtx(TestFormContext);
  const [inputsMeta] = inputsMetaState;
  const [outputType] = outputTypeState;

  const columns = useMemo(() => {
    const cols = [...inputsMeta];
    cols.push({ name: "Output", type: outputType });
    cols.push({ name: "Actions", type: outputType });

    return cols;
  }, [inputsMeta, outputType]);

  const { page, pages, setPage, items: paginatedTests } = usePaginate(tests);

  return (
    <Fragment>
      <ModalBody>
        <div className="mb-10 space-y-6 lg:hidden">
          <div>
            <p className="text-lg font-semibold">Add Tests</p>
            <p className="text-foreground-300">Finally, let's add some actual tests</p>
          </div>

          <Table
            removeWrapper
            classNames={{
              emptyWrapper: "!h-fit",
            }}
            aria-label={`Tests for new task "${title}"`}
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

                <NewInputsForm columns={columns} />
              </div>
            }
          >
            <TableHeader columns={columns}>
              {({ name, type }) => (
                <TableColumn key={name} className="py-2">
                  <div
                    className={clsx("flex w-[100px] items-center gap-2 !text-base", {
                      "justify-center rounded-lg bg-default py-1 *:text-foreground": name === "Output",
                      "!w-[20px] justify-end": name === "Actions",
                    })}
                  >
                    {name !== "Actions" && (
                      <Fragment>
                        <ParameterTypeIcon type={type} className="h-4 w-4" /> {name}
                      </Fragment>
                    )}

                    {name === "Actions" && <Icon name="down" className="h-6 w-6 scale-110 opacity-50" />}
                  </div>
                </TableColumn>
              )}
            </TableHeader>

            <TableBody items={paginatedTests} emptyContent={<p className="pt-6">No Tests added yet.</p>}>
              {(test) => (
                <TableRow key={test.id} className="group relative hover:bg-default-100">
                  {(columnKey) => (
                    <TableCell>
                      <div
                        className={clsx("w-[100px] text-start text-base", {
                          "!text-center": columnKey === "Output",
                          "!w-[20px] -translate-x-2": columnKey === "Actions",
                        })}
                      >
                        <TestParameterCell test={test} columnKey={columnKey as string} />
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <p className="mb-4 hidden text-center font-sans text-lg font-semibold text-danger lg:block">
          For the best experience, add the Tests on the Desktop version. Sorry for the inconvenience.
        </p>
      </ModalBody>

      <TestsTableFooter />
    </Fragment>
  );
};

export default TestInputsTable;
