import { useMemo } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { Progress } from "@nextui-org/react";

import ExamForm from "@/components/Exams/Forms/NewExamForm/ExamForm";
import ExamTasks from "@/components/Exams/Forms/NewExamForm/ExamTasks";
import ScheduleExam from "@/components/Exams/Forms/NewExamForm/ScheduleExam";

import { ExamFormContext } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";

const NewExamForm = () => {
  const { stepState } = useCtx(ExamFormContext);
  const [step] = stepState;

  const progress = useMemo(() => {
    if (step === "exam") return 1.5;
    if (step === "tasks") return 50;
    return 98.5;
  }, [step]);

  return (
    <div className="h-full">
      <div className="mb-12">
        <h2 className="text-2xl font-semibold">Create a new exam</h2>
        <p className="mb-3 text-foreground-300 lg:text-sm">
          Construct the perfect exam and test your students' skills the right way.
        </p>

        <Progress size="sm" value={progress} aria-label="Exam creation progress" />
      </div>

      <AnimatePresence>
        {step === "exam" && (
          <motion.div
            initial={{ opacity: 0, height: "0" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ExamForm />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === "tasks" && (
          <motion.div
            initial={{ opacity: 0, height: "0" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ExamTasks />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === "end" && (
          <motion.div
            initial={{ opacity: 0, height: "0" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ScheduleExam />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewExamForm;
