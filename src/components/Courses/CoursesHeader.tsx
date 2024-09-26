import { PropsWithChildren } from "react";

import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";

import { UseState } from "@/types";

type Props = {
  title: string;
  searchFilter: UseState<string>;
} & PropsWithChildren;

const CoursesHeader = ({ title, searchFilter, children }: Props) => {
  const [search, setSearch] = searchFilter;

  return (
    <div className="flex items-end justify-start gap-6 px-8 lg:px-5 md:flex-wrap md:gap-4">
      <h2 className="text-lg font-bold uppercase text-foreground/90 md:mr-auto md:translate-y-1.5">
        {title}
      </h2>

      <div className="ml-auto md:order-2 md:basis-full">
        <Input
          radius="lg"
          variant="bordered"
          placeholder="Search by name..."
          startContent={<Icon name="search" className="h-5 w-5" />}
          value={search}
          onValueChange={setSearch}
        />
      </div>

      <div>{children}</div>
    </div>
  );
};

export default CoursesHeader;
