import { Controller, UseFormReturn } from "react-hook-form";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

import { EXAM_DURATIONS } from "@/constants/exams";
import { ExamSchema } from "@/utils/schemas/exams/examSchema";

type Props = {
  form: UseFormReturn<ExamSchema>;
};

const DurationSelect = ({ form }: Props) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <Controller
      control={control}
      name="durationMinutes"
      disabled={isSubmitting}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...field}
          size="lg"
          color="default"
          variant="underlined"
          label="Duration (minutes)"
          isClearable={false}
          selectedKey={field.value}
          onSelectionChange={field.onChange}
          defaultItems={EXAM_DURATIONS}
          isInvalid={fieldState.invalid}
          isDisabled={isSubmitting}
          errorMessage={fieldState.error?.message}
          inputProps={{
            classNames: {
              label: "font-semibold !text-foreground text-lg lg:text-base",
              description: "text-xs",
            },
          }}
          classNames={{
            endContentWrapper: "pt-2 *:h-5 *:w-5 *:min-w-0",
          }}
        >
          {(item) => {
            const hours = Number(item.duration) / 60;

            return (
              <AutocompleteItem
                key={item.duration}
                textValue={item.duration}
                classNames={{ title: "font-sans text-base font-semibold" }}
                title={`${item.duration} min (${hours}h)`}
              />
            );
          }}
        </Autocomplete>
      )}
    />
  );
};

export default DurationSelect;
