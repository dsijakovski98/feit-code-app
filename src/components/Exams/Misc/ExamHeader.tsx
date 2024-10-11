import { PropsWithChildren } from "react";

type Props = {
  title: string;
} & PropsWithChildren;

const ExamHeader = ({ title, children }: Props) => {
  return (
    <div className="flex items-end justify-start gap-4 px-8 lg:flex-col lg:items-stretch lg:gap-5 lg:px-5">
      <h2 className="translate-y-1 text-lg font-bold uppercase text-foreground/90">{title}</h2>

      <div className="ml-auto flex items-center gap-6 lg:contents">{children}</div>
    </div>
  );
};

export default ExamHeader;
