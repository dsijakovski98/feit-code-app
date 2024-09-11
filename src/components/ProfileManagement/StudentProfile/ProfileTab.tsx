import { useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Select, SelectItem, Textarea } from "@nextui-org/react";

import AvatarUpload from "@/components/ProfileManagement/AvatarUpload";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { MAJORS } from "@/constants/students";
import { UseStudentProfile } from "@/hooks/students/useStudentProfile";
import { StudentProfileSchema } from "@/utils/formSchemas/profile/studentProfile";

type Props = {
  student: NonNullable<UseStudentProfile["student"]>;
};

const ProfileTab = ({ student }: Props) => {
  const { firstName, lastName, bio = "", avatarUrl, indexNumber, indexYear, major } = student;

  const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<StudentProfileSchema>({
    resolver: valibotResolver(StudentProfileSchema),
    defaultValues: {
      fullName,
      bio: bio ?? "",
      indexNumber: indexNumber.toString(),
      indexYear: indexYear.toString(),
      major: major,
    },
  });

  const onSubmit: SubmitHandler<StudentProfileSchema> = async (userData) => {
    console.log(userData);
    // TODO: Add image to Firebase storage
    // TODO: Update user info in DB
    // TODO: Error handling
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-7">
      <div className="space-y-0.5">
        <AvatarUpload avatarUrl={avatarUrl} />

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

        <Controller
          control={control}
          name="bio"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              minRows={2}
              size="lg"
              color="default"
              variant="underlined"
              label="Bio (optional)"
              placeholder="Tell us something about yourself"
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                label: "text-base font-semibold",
              }}
            />
          )}
        />

        <div className="flex gap-8">
          <Controller
            control={control}
            name="indexNumber"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                size="lg"
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
                size="lg"
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
              size="lg"
              label="Major"
              color="default"
              variant="underlined"
              isDisabled={isSubmitting}
              defaultSelectedKeys={[student.major]}
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
      </div>

      <div className="mt-7 translate-y-2">
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

export default ProfileTab;
