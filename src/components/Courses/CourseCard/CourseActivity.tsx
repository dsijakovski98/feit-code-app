import { Chip } from "@nextui-org/react";

import Button from "@/components/ui/Button";

type Props = {
  label: string;
  onPress: () => void;
};

const CourseActivity = ({ label, onPress }: Props) => {
  return (
    <div className="absolute inset-0 bg-background/50">
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between p-4">
        <Chip size="sm" color="default" classNames={{ content: "font-semibold text-xs" }}>
          Archived
        </Chip>
        {/* <p className="text-sm font-semibold text-foreground">Archived</p> */}

        <Button size="sm" color="danger" onPress={onPress} className="px-5 text-xs dark:bg-danger-600">
          {label}
        </Button>
      </div>
    </div>
  );
};

export default CourseActivity;
