import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export type Option = { value: string; label: string };

type FilterOptions<T extends Option[]> = {
  name: string;
  options: T;
  defaultValue: T[number]["value"];
};

export const useFilter = <T extends Option[]>({ name, defaultValue, options }: FilterOptions<T>) => {
  type OptionType = T[number]["value"];

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState<OptionType>((searchParams.get(name) as string) ?? defaultValue);

  const updateFilter = (filter: OptionType) => {
    setFilter(filter);

    const currentHash = window.location.hash;

    setSearchParams((prev) => {
      prev.set(name, filter);
      return prev;
    });

    if (currentHash) {
      navigate({ hash: currentHash, search: window.location.search });
    }
  };

  return { value: filter, updateFilter, options };
};

export type Filter<T extends Option[]> = ReturnType<typeof useFilter<T>>;
