import { getLocalTimeZone, now } from "@internationalized/date";

import { DatePicker } from "@nextui-org/date-picker";

// TODO: Controlled input
// TODO: Create exam
const ScheduleExam = () => {
  return (
    <section className="space-y-6">
      <h3 className="font-semibold">Schedule Exam</h3>

      <DatePicker
        size="lg"
        label="Start date"
        hideTimeZone
        showMonthAndYearPickers
        //@ts-expect-error NextUI issue
        defaultValue={now(getLocalTimeZone())}
        classNames={{
          timeInputLabel: "text-sm",
          selectorButton: "mr-1 mb-2 w-10 h-10",
          selectorIcon: "w-6 h-6",
        }}
      />
    </section>
  );
};

export default ScheduleExam;
