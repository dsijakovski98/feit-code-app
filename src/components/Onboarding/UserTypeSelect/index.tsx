import { Fragment } from "react";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { RadioGroup } from "@nextui-org/radio";

import RadioSelect from "@/components/Onboarding/UserTypeSelect/RadioSelect";
import Button from "@/components/ui/Button";

import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { USER_TYPE, UserType } from "@/types";

const UserTypeSelector = () => {
  const {
    nextStep,
    userState: [userType, setUserType],
  } = useCtx(OnboardingContext);

  const confirmDialog = useToggle();

  const handleChange = (val: string) => {
    setUserType(val as UserType);
  };

  const confirmChoice = () => {
    nextStep();
    confirmDialog.toggleOff();
  };

  return (
    <Fragment>
      <motion.div layout className="py-10">
        <AnimatePresence>
          {confirmDialog.open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <p className="text-2xl font-light">
                  Are you sure you are a {userType}? You cannot change this later.
                </p>

                <div className="flex justify-between gap-4 *:basis-full">
                  <Button
                    size="lg"
                    color="default"
                    variant="bordered"
                    onPress={confirmDialog.toggleOff}
                  >
                    Go back
                  </Button>
                  <Button size="lg" onPress={confirmChoice}>
                    Continue
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!confirmDialog.open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between gap-8 md:items-start">
                <p className="text-2xl font-light">
                  First thing's first, what type of FEIT Coder are you?
                </p>

                <Button
                  disabled={!userType}
                  tabIndex={userType ? 0 : -1}
                  color="primary"
                  className={clsx("font-semibold opacity-100 transition-opacity", {
                    "pointer-events-none opacity-0": !userType,
                  })}
                  onPress={confirmDialog.toggleOn}
                >
                  Continue
                </Button>
              </div>
              <RadioGroup
                value={userType}
                onValueChange={handleChange}
                description="You will NOT be able to change this at a later time"
                classNames={{
                  wrapper: "grid grid-cols-2 md:grid-cols-1 gap-4  w-full",
                  description: "text-sm text-gray-400 font-medium mt-2",
                }}
              >
                <RadioSelect
                  value={USER_TYPE.student}
                  description="Take coding exams, get fast results and keep track of your grades"
                >
                  I'm a Student
                </RadioSelect>
                <RadioSelect
                  value={USER_TYPE.professor}
                  description="Create and manage courses, coding exams and receive insights"
                >
                  I'm a Professor
                </RadioSelect>
              </RadioGroup>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Fragment>
  );
};

export default UserTypeSelector;
