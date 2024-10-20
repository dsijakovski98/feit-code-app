import TestInputsTable from "@/components/Tasks/Forms/TaskTests/AddTests/TestInputs";

import { TestFormContext } from "@/context/TestFormContext";
import { useCtx } from "@/hooks/useCtx";

const AddTests = () => {
  const { withInputs } = useCtx(TestFormContext);

  if (withInputs.open) {
    return <TestInputsTable />;
  }

  // TODO Implement Tests with no-inputs
  return null;
};

export default AddTests;
