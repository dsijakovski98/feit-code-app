import clsx from "clsx";
import { ClassValue } from "clsx";

type Props = {
  name: string;
  prefix?: string;
  color?: string;
  className?: ClassValue;
};

const Icon = ({ name, prefix = "icon", color = "currentColor", className = "", ...props }: Props) => {
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg {...props} aria-hidden="true" className={clsx(className)}>
      <use href={symbolId} fill={color} />
    </svg>
  );
};

export default Icon;
