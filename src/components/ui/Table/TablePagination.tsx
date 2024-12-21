import { Pagination } from "@nextui-org/pagination";

import { ROWS_PER_PAGE, UsePaginate } from "@/hooks/usePaginate";

type Props = UsePaginate<unknown> & {
  disabled?: boolean;
};

const TablePagination = ({ page, pages, setPage, items, disabled = false }: Props) => {
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
      classNames={{
        cursor: "bg-foreground text-background",
        prev: "w-7 h-7 p-0.5 min-w-0",
        chevronNext: "w-7 h-7 p-0.5 min-w-0",
      }}
    />
  );
};

export default TablePagination;
