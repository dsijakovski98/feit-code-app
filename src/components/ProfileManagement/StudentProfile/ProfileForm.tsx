import { useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useQueryClient } from "@tanstack/react-query";

import { Select, SelectItem, Textarea } from "@nextui-org/react";

import AvatarUpload from "@/components/ProfileManagement/AvatarUpload";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { updateStudent } from "@/actions/users";
import { MAJORS } from "@/constants/students";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { UserProfile } from "@/hooks/useProfile";
import { USER_TYPE } from "@/types";
import { StudentProfileSchema } from "@/utils/formSchemas/profile/studentProfile";

type Props = {
  student: UserProfile<"Student">;
};

const StudentProfileForm = ({ student }: Props) => {
  const { id: userId, firstName, lastName, bio, indexNumber, indexYear, major, email } = student;

  const { isMobile } = useCtx(ResponsiveContext);
  const queryClient = useQueryClient();

  const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);

  const avatarState = useState(student.avatarUrl ?? "");
  const [avatarUrl] = avatarState;

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<StudentProfileSchema>({
    resolver: valibotResolver(StudentProfileSchema),
    defaultValues: {
      fullName,
      bio: bio ?? "",
      indexNumber: indexNumber.toString(),
      indexYear: indexYear.toString(),
      major,
    },
  });

  const onSubmit: SubmitHandler<StudentProfileSchema> = async (formData) => {
    try {
      await updateStudent({ ...formData, avatarUrl, userId });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [{ name: "profile", type: USER_TYPE.student, userId }],
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
      <div className="space-y-3 lg:space-y-2">
        <AvatarUpload avatarState={avatarState} email={email} />

        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              autoFocus
              size={isMobile ? "md" : "lg"}
              variant="underlined"
              label="Full Name"
              placeholder="Your first and last name"
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="bio"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              minRows={2}
              size={isMobile ? "md" : "lg"}
              color="default"
              variant="underlined"
              label="Bio (optional)"
              placeholder="Tell us something about yourself"
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                label: "text-base font-semibold !text-foreground",
              }}
            />
          )}
        />

        <div className="flex gap-8 lg:flex-col lg:gap-0">
          <Controller
            control={control}
            name="indexNumber"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                size={isMobile ? "md" : "lg"}
                color="default"
                variant="underlined"
                inputMode="numeric"
                label="Index number"
                placeholder="ex. 203"
                pattern="[0-9]+"
                isDisabled={isSubmitting}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="indexYear"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                size={isMobile ? "md" : "lg"}
                color="default"
                variant="underlined"
                inputMode="numeric"
                label="Index year"
                placeholder="ex. 2017"
                isDisabled={isSubmitting}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="major"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              size={isMobile ? "md" : "lg"}
              label="Major"
              color="default"
              variant="underlined"
              isDisabled={isSubmitting}
              defaultSelectedKeys={[student.major]}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                label: "text-lg font-semibold !text-foreground",
              }}
            >
              {MAJORS.map(({ label, description }) => (
                <SelectItem key={label} textValue={label}>
                  <p className="text-base font-semibold">{label}</p>
                  <p className="text-sm text-foreground-400">{description}</p>
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      <div className="mt-7 translate-y-2 lg:mt-5 lg:translate-y-0.5">
        <Button fullWidth type="submit" size={isMobile ? "md" : "lg"} isLoading={isSubmitting}>
          Update Profile
        </Button>
      </div>
    </form>
  );
};

export default StudentProfileForm;
