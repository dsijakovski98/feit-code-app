import { useEffect, useMemo } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { Avatar } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";

import { useAssistants } from "@/hooks/useAssistants";
import { NewCourseSchema } from "@/utils/formSchemas/courses/newCourseSchema";

type Props = {
  form: UseFormReturn<NewCourseSchema>;
};

const AssistantSelect = ({ form }: Props) => {
  const {
    control,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const { assistants, isLoading, error } = useAssistants({
    id: true,
    email: true,
    lastName: true,
    firstName: true,
  });

  useEffect(() => {
    if (!error) return;

    setError("assistantId", { message: error.message });
  }, [error, setError]);

  const description = useMemo(() => {
    if (errors.assistantId?.message) return errors.assistantId.message;

    if (assistants?.length === 0) return "There are no Teaching Assistants yet!";

    return "";
  }, [errors.assistantId?.message, assistants?.length]);

  return (
    <Controller
      control={control}
      name="assistantId"
      disabled={isSubmitting || isLoading}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          size="lg"
          color="default"
          variant="underlined"
          label="Teaching Assistant (optional)"
          placeholder="Select a Teaching Assistant"
          selectionMode="single"
          description={description}
          isLoading={isLoading}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          isDisabled={isLoading || isSubmitting || assistants?.length === 0}
          renderValue={(items) => <p className="font-medium">{items[0]["aria-label"]}</p>}
          classNames={{
            label: "font-semibold text-lg lg:text-base !text-foreground",
          }}
        >
          {(assistants ?? []).map(({ id, firstName, lastName, email, avatarUrl }) => {
            const fullName = `${firstName} ${lastName}`;

            return (
              <SelectItem key={id} textValue={id} aria-label={fullName}>
                <div className="flex items-start gap-2">
                  <Avatar src={avatarUrl ?? ""} />
                  <div>
                    <p className="text-sm font-medium">{fullName}</p>
                    <p className="text-xs font-light">{email}</p>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </Select>
      )}
    />
  );
};

export default AssistantSelect;