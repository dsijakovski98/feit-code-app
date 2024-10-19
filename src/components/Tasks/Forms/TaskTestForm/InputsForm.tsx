import { InputType } from "@/context/ExamFormContext";
import { UseState } from "@/types";

type Props = {
  inputsState: UseState<InputType[]>;
};

// TODO: Implement form
const InputsForm = ({ inputsState }: Props) => {
  const [inputs] = inputsState;
  return <div>{inputs.length} inputs so far</div>;
};

export default InputsForm;
