import { useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useQueryClient } from "@tanstack/react-query";

import { Select, SelectItem } from "@nextui-org/select";

import AvatarUpload from "@/components/ProfileManagement/AvatarUpload";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { updateProfessor } from "@/actions/users";
import { MAJORS } from "@/constants/students";
import { UserProfile } from "@/hooks/useProfile";
import { TEACHER_TYPE, USER_TYPE } from "@/types";
import { ProfessorProfileSchema } from "@/utils/formSchemas/profile/professorProfile";

type Props = {
  professor: UserProfile<"Professor">;
};

const ProfessorProfileForm = ({ professor }: Props) => {
  const { id: userId, firstName, lastName, department, type, email } = professor;

  const queryClient = useQueryClient();

  const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);

  const avatarState = useState(professor.avatarUrl ?? "");
  const [avatarUrl] = avatarState;

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<ProfessorProfileSchema>({
    resolver: valibotResolver(ProfessorProfileSchema),
    defaultValues: {
      fullName,
      type,
      department,
    },
  });

  const onSubmit: SubmitHandler<ProfessorProfileSchema> = async (formData) => {
    try {
      await updateProfessor({ ...formData, avatarUrl, userId });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [{ name: "profile", type: USER_TYPE.professor, userId }],
        }),
        queryClient.invalidateQueries({ queryKey: [{ name: "user", userId }] }),
      ]);

      toast.success("Profile updated!");
    } catch (error) {
      if (error instanceof Error) {
        const { message } = error;

        setError("root", { message });
        toast.error(message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3">
        <AvatarUpload avatarState={avatarState} email={email} />

        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              autoFocus
              size="lg"
              variant="underlined"
              label="Full Name"
              placeholder="Your first and last name"
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <div className="flex gap-8 lg:flex-col lg:gap-0">
          <Controller
            control={control}
            name="department"
            render={({ field, fieldState }) => (
              <Select
                {...field}
                size="lg"
                label="Major"
                color="default"
                variant="underlined"
                isDisabled={isSubmitting}
                defaultSelectedKeys={[professor.department]}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              >
                {MAJORS.map(({ label, description }) => (
                  <SelectItem key={label} textValue={label}>
                    <p className="text-base font-medium">{label}</p>
                    <p className="text-sm text-gray-400">{description}</p>
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="type"
            render={({ field, fieldState }) => (
              <Select
                {...field}
                size="lg"
                label="Type"
                color="default"
                variant="underlined"
                defaultSelectedKeys={[professor.type]}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              >
                {Object.values(TEACHER_TYPE).map((label) => (
                  <SelectItem key={label} textValue={label}>
                    <p className="text-base font-medium">{label}</p>
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
      </div>

      <div className="mt-12">
        <Button
          fullWidth
          size="lg"
          type="submit"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default ProfessorProfileForm;
