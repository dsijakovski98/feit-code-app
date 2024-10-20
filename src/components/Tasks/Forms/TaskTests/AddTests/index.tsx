import TestInputsTable from "@/components/Tasks/Forms/TaskTests/AddTests/TestInputs";
import TestNoInputs from "@/components/Tasks/Forms/TaskTests/AddTests/TestsNoInputs";

import { TestFormContext } from "@/context/TestFormContext";
import { useCtx } from "@/hooks/useCtx";

const AddTests = () => {
  const { withInputs } = useCtx(TestFormContext);

  if (withInputs.open) {
    return <TestInputsTable />;
  }

  return <TestNoInputs />;
};

export default AddTests;
