import { Controller, UseFormReturn } from "react-hook-form";

import { today } from "@internationalized/date";

import { DatePicker, TimeInput } from "@nextui-org/react";

import { nextUIDate, nextUITime, nextUITimeToDate } from "@/utils/dates";
import { ExamSchema } from "@/utils/formSchemas/exams/examSchema";

type Props = {
  form: UseFormReturn<ExamSchema>;
};

const ScheduleExam = ({ form }: Props) => {
  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <div className="contents">
      <Controller
        control={control}
        name="startDate"
        disabled={isSubmitting}
        render={({ field }) => (
          <DatePicker
            size="lg"
            variant="underlined"
            // @ts-expect-error NextUI types mismatch
            minValue={today("UTC")}
            value={nextUIDate(field.value)}
            onChange={(e) => field.onChange(e.toDate("UTC"))}
            label={<span className="font-semibold text-foreground">Start Date</span>}
            classNames={{
              selectorIcon: "h-6 w-6",
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="startTime"
        disabled={isSubmitting}
        render={({ field }) => (
          <TimeInput
            size="lg"
            hourCycle={24}
            hideTimeZone
            variant="underlined"
            value={nextUITime(field.value)}
            onChange={(e) => field.onChange(nextUITimeToDate(e.toString()))}
            label={<span className="font-semibold text-foreground">Time</span>}
          />
        )}
      />
    </div>
  );
};

export default ScheduleExam;