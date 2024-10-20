import TestInputsTable from "@/components/Tasks/Forms/TaskTests/AddTests/TestInputs";
import TestNoInputsTable from "@/components/Tasks/Forms/TaskTests/AddTests/TestsNoInputs";

import { TestFormContext } from "@/context/TestFormContext";
import { useCtx } from "@/hooks/useCtx";

const AddTests = () => {
  const { withInputs } = useCtx(TestFormContext);

  if (withInputs.open) {
    return <TestInputsTable />;
  }

  return <TestNoInputsTable />;
};

export default AddTests;
