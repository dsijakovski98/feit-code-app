import { ButtonGroup } from "@nextui-org/button";

import Button from "@/components/ui/Button";

import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { Filter, Option } from "@/hooks/useFilter";

type Props<T extends [Option, Option]> = {
  filter: Filter<T>;
};

const SwitchFilter = <T extends [Option, Option]>({ filter }: Props<T>) => {
  const { isMobileSm } = useCtx(ResponsiveContext);

  const { value: filterValue, updateFilter, options } = filter;

  return (
    <ButtonGroup size={isMobileSm ? "sm" : "md"} className="*:basis-full *:px-3 *:py-2 *:text-xs md:order-1">
      {options.map(({ value, label }) => (
        <Button
          variant="solid"
          key={value}
          color={filterValue === value ? "primary" : "default"}
          onPress={() => updateFilter(value)}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default SwitchFilter;
