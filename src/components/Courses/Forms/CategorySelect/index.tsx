import { useEffect, useMemo } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import clsx from "clsx";

import { Select, SelectItem } from "@nextui-org/select";

import NewCategory from "@/components/Courses/Forms/CategorySelect/NewCategory";
import CategoryChip from "@/components/ui/CategoryChip";

import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCourseCategories } from "@/hooks/course/useCourseCategories";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { CourseSchema } from "@/utils/formSchemas/courses/courseSchema";

type Props = {
  form: UseFormReturn<CourseSchema>;
  defaultValue?: string[];
};

const CategorySelect = ({ form, defaultValue }: Props) => {
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
            defaultSelectedKeys={defaultValue ?? []}
            isDisabled={isLoading || isSubmitting || categories?.length === 0}
            renderValue={(items) => {
              return (
                <ul className="flex flex-wrap gap-2 lg:gap-1">
                  {items.map((item) => (
                    <li key={item.key}>
                      <CategoryChip
                        size="sm"
                        category={{
                          id: item.textValue ?? "",
                          label: item["aria-label"] ?? "",
                          color: item.props?.children[0].props.style.backgroundColor,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              );
            }}
            classNames={{
              label: "text-lg font-semibold !text-foreground lg:text-base",
              description: clsx("text-xs translate-y-0.5", fieldState.error ? "text-danger" : ""),
              value: "py-1 min-h-8",
            }}
          >
            {(categories ?? []).map(({ id, label, color }) => (
              <SelectItem
                key={id}
                textValue={id}
                aria-label={label}
                classNames={{ title: "flex items-center gap-2" }}
              >
                <div
                  className={clsx("h-4 w-4 rounded-full", {
                    "bg-default": !color,
                  })}
                  style={{
                    backgroundColor: color ?? "",
                  }}
                />
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
