import { Pagination } from "@nextui-org/pagination";

import { ROWS_PER_PAGE, UsePaginate } from "@/hooks/usePaginate";

type Props = UsePaginate<unknown> & {
  disabled?: boolean;
  className?: string;
};

const TablePagination = ({ page, pages, setPage, items, disabled = false, className = "" }: Props) => {
  return (
    <Pagination
      showControls
      hidden={items.length < ROWS_PER_PAGE}
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
