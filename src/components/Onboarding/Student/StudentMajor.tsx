import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Select, SelectItem } from "@nextui-org/select";

import { StudentOnboardingContext } from "@/components/Onboarding/Student";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { MAJORS } from "@/constants/students";
import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { StudentOnboardingMajorSchema } from "@/utils/formSchemas/onboarding/studentOnboarding";

const StudentMajor = () => {
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

  const onSubmit: SubmitHandler<StudentOnboardingMajorSchema> = (majorData) => {
    setForm((prev) => ({ ...prev, ...majorData }));
    nextStep();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-14 py-8">
      <h3 className="text-xl font-semibold">What do you study?</h3>

      <div className="!mb-10">
        <div className="flex gap-8">
          <Controller
            control={control}
            name="indexNumber"
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
              defaultSelectedKeys={[form.major]}
              isInvalid={fieldState.invalid}
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
        <Button fullWidth color="default" variant="bordered" size="lg" onPress={prevStep}>
          Go back
        </Button>

        <Button fullWidth type="submit" size="lg">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default StudentMajor;
