import { Controller, UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { Select, SelectItem } from "@nextui-org/select";

import Icon from "@/components/ui/Icon";

import { PROGRAMMING_LANGUAGE, ProgrammingLanguage } from "@/constants/enums";
import { PROGRAMMING_LANGUAGES } from "@/constants/exams";
import { supportsTests } from "@/utils/code";
import { ExamSchema } from "@/utils/schemas/exams/examSchema";

type Props = {
  form: UseFormReturn<ExamSchema>;
};

const ProgrammingLanguageSelect = ({ form }: Props) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  const renderItem = ({ name, img = "", size }: { name: string; img?: string; size: "sm" | "md" }) => (
    <div className="flex items-center gap-2.5">
      <img
        src={img}
        alt={img}
        width={size === "md" ? 26 : 20}
        height={size === "md" ? 26 : 20}
        className={clsx({ "scale-[1.75] dark:invert": name === PROGRAMMING_LANGUAGE.rust })}
      />
      <div className="mr-5 flex grow items-center justify-between gap-4">
        <p className="text-base font-semibold leading-none">{name}</p>

        {supportsTests(name as ProgrammingLanguage) && <Icon name="test" className="h-3.5 w-3.5" />}
      </div>
    </div>
  );

  return (
    <Controller
      control={control}
      name="language"
      render={({ field, fieldState }) => (
        <Select
          {...field}
          size="lg"
          color="default"
          variant="underlined"
          selectionMode="single"
          label="Language"
          description={
            <div className="flex translate-y-0.5 items-center text-foreground">
              <Icon name="test" className="mr-px h-4 w-4" /> - Supports Tests
            </div>
          }
          isDisabled={isSubmitting}
          isInvalid={fieldState.invalid}
          defaultSelectedKeys={[field.value]}
          errorMessage={fieldState.error?.message}
          renderValue={([item]) => renderItem({ name: item.key as string, img: item.textValue, size: "sm" })}
          classNames={{
            label: "font-semibold text-lg lg:text-base !text-foreground",
            description: "text-sm text-foreground-300",
          }}
        >
          {PROGRAMMING_LANGUAGES.map(({ name, img }) => (
            <SelectItem key={name} textValue={img}>
              {renderItem({ name, img, size: "md" })}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default ProgrammingLanguageSelect;
