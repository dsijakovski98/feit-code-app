import { useMemo, useState } from "react";

export const ROWS_PER_PAGE = 5;

export const usePaginate = <T>(items: T[]) => {
  const [page, setPage] = useState(1);
  const pages = useMemo(() => Math.ceil(items.length / ROWS_PER_PAGE), [items.length]);

  // Pagination
  const start = (page - 1) * ROWS_PER_PAGE;
  const end = start + ROWS_PER_PAGE;

  const paginatedItems = useMemo(() => items.slice(start, end), [start, end, items]);

  return {
    page,
    pages,
    setPage,
    items: paginatedItems,
  };
};
