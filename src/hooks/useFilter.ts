import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type FilterOptions<T extends string> = {
  name: string;
  defaultValue: T;
};

export const useFilter = <T extends string>({ name, defaultValue }: FilterOptions<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState<T>((searchParams.get(name) as T) ?? defaultValue);

  const updateFilter = (filter: T) => {
    setFilter(filter);
    setSearchParams({ [name]: filter });
  };

  return [filter, updateFilter] as const;
};
