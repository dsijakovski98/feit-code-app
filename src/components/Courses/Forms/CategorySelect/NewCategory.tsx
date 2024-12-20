import { FormEvent } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { InferInput, nonEmpty, object, pipe, string, trim } from "valibot";

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Spinner, Tooltip } from "@nextui-org/react";

import { categories } from "@/db/schema";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";

import { db } from "@/db";
import { Toggle } from "@/hooks/useToggle";

const NewCategorySchema = object({
  label: pipe(string(), trim(), nonEmpty("Field is required!")),
  color: pipe(string(), trim()),
});
type NewCategorySchema = InferInput<typeof NewCategorySchema>;

type Props = {
  formToggle: Toggle;
  loading?: boolean;
};

const NewCategory = ({ formToggle, loading = false }: Props) => {
  const { theme } = useTheme();

  const queryClient = useQueryClient();

  const {
    reset,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewCategorySchema>({
    resolver: valibotResolver(NewCategorySchema),
    defaultValues: {
      label: "",
      color: theme === "light" ? "#000000" : "#FFFFFF",
    },
  });

  const onSubmit: SubmitHandler<NewCategorySchema> = async ({ label, color }) => {
    clearErrors("label");

    try {
      const existingCategory = await db.query.categories.findFirst({
        where: (categories, { ilike }) => ilike(categories.label, `%${label}%`),
      });

      if (existingCategory) {
        const message = `Similar category "${existingCategory.label}" exists!`;

        setError("label", { message });
        toast(message);

        return;
      }

      await db.insert(categories).values({ label, color });
      await queryClient.invalidateQueries({ queryKey: [{ name: "categories" }] });

      toast.success(`${label} category created!`);

      reset();
    } catch (e) {
      // TODO: Sentry logging
      console.log({ e });
      const message = "Failed to create new category!";

      setError("label", { message });
      toast.error(message);
    }
  };

  const handleChildFormSubmit = (e: FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    handleSubmit(onSubmit)();
  };

  return (
    <Popover
      offset={12}
      placement="bottom-end"
      isOpen={formToggle.open || isSubmitting}
      onOpenChange={formToggle.set}
    >
      <PopoverTrigger disabled={loading}>
        <Button
          size="sm"
          color="default"
          className="shrink-0 text-xs"
          startContent={<Icon name="add" className="h-4 w-4" />}
        >
          New Category
        </Button>
      </PopoverTrigger>

      <PopoverContent className="border border-content1 bg-background">
        <form id="add-label-form" onSubmit={handleChildFormSubmit} className="flex items-end gap-4 p-1.5">
          <Controller
            control={control}
            name="color"
            disabled={isSubmitting}
            render={({ field }) => (
              <Tooltip content={field.value} classNames={{ content: "font-serif" }}>
                <input
                  {...field}
                  type="color"
                  disabled={isSubmitting}
                  className="-mx-2 h-9 w-8 cursor-pointer transition-[transform] hover:scale-110 focus:scale-110 disabled:pointer-events-none disabled:brightness-75"
                />
              </Tooltip>
            )}
          />

          <Controller
            control={control}
            name="label"
            disabled={isSubmitting}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                autoFocus
                size="sm"
                type="text"
                label="Category"
                color="default"
                variant="underlined"
                isDisabled={isSubmitting}
                isInvalid={!!fieldState.error}
                placeholder="ex. Web Dev, Python..."
                className="h-10"
                classNames={{
                  label: "!-translate-y-3.5",
                }}
              />
            )}
          />

          <Button
            size="sm"
            type="submit"
            form="add-label-form"
            variant="bordered"
            color="default"
            className="text-xs"
            isDisabled={isSubmitting}
          >
            {isSubmitting ? <Spinner size="sm" color="default" className="scale-90" /> : "Add"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default NewCategory;
