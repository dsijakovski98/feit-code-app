import clsx from "clsx";

type Props = {
  value: number;
  label: string;
  size?: "sm" | "md";
};

const Stat = ({ value, label, size = "md" }: Props) => {
  return (
    <div>
      <p
        className={clsx("font-bold", {
          "text-6xl font-bold": size === "md",
          "text-4xl font-semibold": size === "sm",
        })}
      >
        {value > 9 ? "9+" : value}
      </p>

      <p>{label}</p>
    </div>
  );
};

export default Stat;
