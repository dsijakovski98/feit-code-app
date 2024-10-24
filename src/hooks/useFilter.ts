import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export type Option = { value: string; label: string };

type FilterOptions<T extends Option[]> = {
  name: string;
  options: T;
  defaultValue: T[number]["value"];
};

export const useFilter = <T extends Option[]>({ name, defaultValue, options }: FilterOptions<T>) => {
  type OptionType = T[number]["value"];

  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState<OptionType>((searchParams.get(name) as string) ?? defaultValue);

  const updateFilter = (filter: OptionType) => {
    setFilter(filter);
    setSearchParams({ [name]: filter });
  };

  return { value: filter, updateFilter, options };
};

export type Filter<T extends Option[]> = ReturnType<typeof useFilter<T>>;
