import { ComponentProps } from "react";

import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";

import { UseState } from "@/types";

type Props = {
  search: string;
  onSearch: UseState<string>[1];
  className?: string;
} & Partial<ComponentProps<typeof Input>>;

const TableSearch = ({ search, onSearch, className, ...inputProps }: Props) => {
  return (
    <div className={className}>
      <Input
        fullWidth
        variant="bordered"
        placeholder="Search by name..."
        startContent={<Icon name="search" className="h-5 w-5" />}
        value={search}
        onValueChange={onSearch}
        {...inputProps}
      />
    </div>
  );
};

export default TableSearch;
