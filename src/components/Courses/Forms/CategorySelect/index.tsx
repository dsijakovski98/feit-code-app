import { useEffect, useMemo } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { Chip } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";

import NewCategory from "@/components/Courses/Forms/CategorySelect/NewCategory";

import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCourseCategories } from "@/hooks/course/useCourseCategories";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { NewCourseSchema } from "@/utils/formSchemas/courses/newCourseSchema";

type Props = {
  form: UseFormReturn<NewCourseSchema>;
};

const CategorySelect = ({ form }: Props) => {
  const {
    control,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const categoryForm = useToggle();
  const { isMobile } = useCtx(ResponsiveContext);

  const { categories, isLoading, error } = useCourseCategories();

  useEffect(() => {
    if (!error) return;

    setError("categories", { message: error.message });
  }, [error, setError]);

  const description = useMemo(() => {
    if (errors.categories?.message) return errors.categories.message;

    if (categories?.length === 0) return "No categories found, why not create one!";

    return "";
  }, [errors.categories?.message, categories?.length]);

  return (
    <Controller
      control={control}
      name="categories"
      disabled={isSubmitting}
      render={({ field, fieldState }) => (
        <div className="flex items-end gap-4">
          <Select
            {...field}
            size={isMobile ? "md" : "lg"}
            isMultiline
            color="default"
            variant="underlined"
            selectionMode="multiple"
            label="Category (optional)"
            placeholder="Select categories that best describe this course"
            description={description}
            isLoading={isLoading}
            isInvalid={fieldState.invalid}
            isDisabled={isLoading || isSubmitting || categories?.length === 0}
            renderValue={(items) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip key={item.key} color="secondary" size="sm" className="text-xs">
                      {item["aria-label"]}
                    </Chip>
                  ))}
                </div>
              );
            }}
            classNames={{
              label: "text-lg font-semibold !text-foreground lg:text-base",
              description: clsx("text-xs translate-y-0.5", fieldState.error ? "text-danger" : ""),
              value: "py-1 min-h-8",
            }}
          >
            {(categories ?? []).map(({ id, label }) => (
              <SelectItem key={id} textValue={id} aria-label={label}>
                <p className="text-base font-medium">{label}</p>
              </SelectItem>
            ))}
          </Select>

          <NewCategory formToggle={categoryForm} loading={isLoading} />
        </div>
      )}
    />
  );
};

export default CategorySelect;
