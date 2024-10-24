import { SharedSelection } from "@nextui-org/react";
import { Select, SelectItem, SelectProps } from "@nextui-org/select";

import { Filter, Option } from "@/hooks/useFilter";

type Props<T extends Option[]> = {
  filter: Filter<T>;
} & Omit<SelectProps, "children">;

const SelectFilter = <T extends Option[]>({ filter, ...rest }: Props<T>) => {
  const { value: filterValue, updateFilter, options } = filter;

  const handleChange = (keys: SharedSelection) => {
    const [newValue] = [...keys];
    if (!newValue) return;

    updateFilter(newValue as Option["value"]);
  };

  return (
    <Select
      {...rest}
      items={options}
      variant="bordered"
      selectionMode="single"
      selectedKeys={new Set([filterValue])}
      onSelectionChange={handleChange}
      radius="lg"
      classNames={{
        label: "text-base font-semibold !text-foreground",
      }}
    >
      {({ value, label }) => <SelectItem key={value}>{label}</SelectItem>}
    </Select>
  );
};

export default SelectFilter;
