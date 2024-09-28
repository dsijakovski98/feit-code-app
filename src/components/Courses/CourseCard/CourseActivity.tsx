import Button from "@/components/ui/Button";

type Props = {
  label: string;
  onPress: () => void;
};

const CourseActivity = ({ label, onPress }: Props) => {
  return (
    <div className="absolute inset-0 bg-background/50">
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-stretch justify-between bg-foreground/80 dark:bg-default-100">
        <p className="px-4 py-2.5 text-center font-serif text-xs font-bold uppercase text-background dark:text-foreground">
          Archived
        </p>

        <Button
          size="sm"
          color="danger"
          onPress={onPress}
          className="h-auto rounded-none px-7 text-xs dark:bg-danger-600"
        >
          {label}
        </Button>
      </div>
    </div>
  );
};

export default CourseActivity;
