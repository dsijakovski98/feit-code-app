import { useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Select, SelectItem, Textarea } from "@nextui-org/react";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-7">
      <div className="space-y-3">
        {/* TODO: Implement avatar handling */}
        <div className="flex items-center gap-4">
          <img
            alt="Avatar"
            src={avatarUrl ?? ""}
            className="max-h-[84px] max-w-[84px] shrink-0 overflow-hidden rounded-full bg-primary"
          />

          <div className="space-y-2">
            <p className="font-semibold">Avatar</p>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" color="default" className="text-xs">
                Upload
              </Button>

              <Button
                isIconOnly
                variant="light"
                radius="full"
                color="danger"
                className="p-1.5 text-xs"
              >
                <Icon name="trash" />
              </Button>
            </div>
          </div>
        </div>

        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              autoFocus
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
              minRows={3}
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
                autoFocus
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

      <div className="mt-10">
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
