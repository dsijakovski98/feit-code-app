import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Select, SelectItem } from "@heroui/select";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation } from "@tanstack/react-query";

import { StudentOnboardingContext } from "@/components/Onboarding/Student";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { checkStudentIndex } from "@/actions/students";
import { MAJORS } from "@/constants/students";
import { OnboardingContext } from "@/context/OnboardingContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { StudentOnboardingMajorSchema } from "@/utils/schemas/onboarding/studentOnboarding";

const StudentMajor = () => {
  const { isMobile } = useCtx(ResponsiveContext);
  const { prevStep, nextStep } = useCtx(OnboardingContext);
  const [form, setForm] = useCtx(StudentOnboardingContext);

  const { control, handleSubmit } = useForm<StudentOnboardingMajorSchema>({
    resolver: valibotResolver(StudentOnboardingMajorSchema),
    defaultValues: {
      indexNumber: form.indexNumber,
      indexYear: form.indexYear,
      major: form.major,
    },
  });

  const successSubmit = (majorData: StudentOnboardingMajorSchema) => {
    setForm((prev) => ({ ...prev, ...majorData }));
    nextStep();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: checkStudentIndex,

    onSuccess: (_, { studentData }) => {
      successSubmit(studentData);
    },

    onError: (error) => toast.error(error.message),
  });

  const onSubmit: SubmitHandler<StudentOnboardingMajorSchema> = (majorData) => {
    const newIndexNumber = form.indexNumber !== majorData.indexNumber;
    const newIndexYear = form.indexYear !== majorData.indexYear;
    const newIndex = newIndexNumber || newIndexYear;

    if (newIndex) {
      mutate({ studentData: majorData });
    } else {
      successSubmit(majorData);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 px-14 py-8 lg:px-0 lg:py-4 md:space-y-10"
    >
      <h3 className="text-xl font-semibold">What do you study?</h3>

      <div className="!mb-10">
        <div className="flex gap-8">
          <Controller
            control={control}
            name="indexNumber"
            disabled={isPending}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                autoFocus
                size="lg"
                color="default"
                variant="underlined"
                inputMode="numeric"
                label="Index number"
                placeholder="ex. 203"
                pattern="[0-9]+"
                isDisabled={isPending}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="indexYear"
            disabled={isPending}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                size="lg"
                color="default"
                variant="underlined"
                inputMode="numeric"
                label="Index year"
                placeholder="ex. 2017"
                isDisabled={isPending}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="major"
          disabled={isPending}
          render={({ field, fieldState }) => (
            <Select
              {...field}
              size="lg"
              label="Major"
              color="default"
              variant="underlined"
              defaultSelectedKeys={[form.major]}
              isInvalid={fieldState.invalid}
              isDisabled={isPending}
              errorMessage={fieldState.error?.message}
              classNames={{ label: "font-semibold !text-foreground text-lg" }}
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

      <div className="flex gap-4">
        <Button
          fullWidth
          color="default"
          variant="bordered"
          size={isMobile ? "md" : "lg"}
          isDisabled={isPending}
          onPress={prevStep}
        >
          Go back
        </Button>

        <Button fullWidth type="submit" size={isMobile ? "md" : "lg"} isLoading={isPending}>
          Continue
        </Button>
      </div>
    </form>
  );
};

export default StudentMajor;
