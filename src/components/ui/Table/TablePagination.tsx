import { Pagination } from "@nextui-org/pagination";

import { UsePaginate } from "@/hooks/usePaginate";

type Props = UsePaginate<unknown> & {
  disabled?: boolean;
  className?: string;
};

const TablePagination = ({ page, pages, setPage, disabled = false, className = "" }: Props) => {
  return (
    <Pagination
      showControls
      size="sm"
      radius="full"
      color="default"
      variant="light"
      page={page}
      total={pages}
      onChange={setPage}
      isDisabled={disabled}
      className={className}
      classNames={{
        cursor: "bg-foreground text-background",
        prev: "w-7 h-7 p-0.5 min-w-0",
        chevronNext: "w-7 h-7 p-0.5 min-w-0",
      }}
    />
  );
};

export default TablePagination;
