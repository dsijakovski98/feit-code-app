import { Fragment } from "react/jsx-runtime";

import clsx from "clsx";

import { RadioGroup } from "@nextui-org/radio";

import ConfirmDialog from "@/components/Onboarding/UserTypeSelect/ConfirmDialog";
import RadioSelect from "@/components/Onboarding/UserTypeSelect/RadioSelect";
import Button from "@/components/ui/Button";

import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { USER_TYPES, UserType } from "@/types";

const UserTypeSelector = () => {
  const {
    userState: [userType, setUserType],
  } = useCtx(OnboardingContext);

  const confirmDialog = useToggle();

  const handleChange = (val: string) => {
    setUserType(val as UserType);
  };

  return (
    <Fragment>
      <div className="space-y-8 py-10">
        <div className="flex items-center justify-between">
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
            wrapper: "grid grid-cols-2 justify-between",
            description: "text-sm text-gray-400 font-medium mt-2",
          }}
        >
          <RadioSelect
            value={USER_TYPES.student}
            description="Take coding exams, get fast results and keep track of your grades"
          >
            I'm a Student
          </RadioSelect>
          <RadioSelect
            value={USER_TYPES.professor}
            description="Create and manage programming courses, coding exams and receive insights"
          >
            I'm a Professor
          </RadioSelect>
        </RadioGroup>
      </div>
      <ConfirmDialog dialog={confirmDialog} />
    </Fragment>
  );
};

export default UserTypeSelector;
