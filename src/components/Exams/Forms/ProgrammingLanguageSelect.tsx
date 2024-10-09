import { Controller, UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { Select, SelectItem } from "@nextui-org/select";

import { PROGRAMMING_LANGUAGE } from "@/constants/enums";
import { PROGRAMMING_LANGUAGES } from "@/constants/exams";
import { ExamSchema } from "@/utils/formSchemas/exams/examSchema";

type Props = {
  form: UseFormReturn<ExamSchema>;
};

const ProgrammingLanguageSelect = ({ form }: Props) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  const renderItem = ({ name, img = "", size }: { name: string; img?: string; size: "sm" | "md" }) => (
    <div className="flex items-center gap-3">
      <img
        src={img}
        alt={img}
        width={size === "md" ? 26 : 20}
        height={size === "md" ? 26 : 20}
        className={clsx({ "scale-[1.75] dark:invert": name === PROGRAMMING_LANGUAGE.rust })}
      />
      <p className="text-base font-semibold">{name}</p>
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
          label="Programming language"
          description={"The base programming language used in the exam's Tasks"}
          isDisabled={isSubmitting}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          defaultSelectedKeys={[field.value]}
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
