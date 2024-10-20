import clsx, { ClassValue } from "clsx";

import Icon from "@/components/ui/Icon";

import { InputValueType, VALUE_TYPE } from "@/constants/enums";

type Props = {
  type: InputValueType;
  className?: ClassValue;
};

const ParameterTypeIcon = ({ type, className = "" }: Props) => {
  return (
    <Icon
      name={type}
      className={clsx("text-primary", className, {
        "scale-125": type === VALUE_TYPE.boolean || type === VALUE_TYPE.number,
      })}
    />
  );
};

export default ParameterTypeIcon;
