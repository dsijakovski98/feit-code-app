import Button from "@/components/ui/Button";

const ArchiveCourse = () => {
  // TODO: Confirmation modal
  return (
    <Button
      variant="ghost"
      color="default"
      className="w-[140px] border-foreground-300 py-[22px] text-sm font-semibold text-foreground lg:w-full"
      // TODO: Disabled based on conditions
    >
      Archive
    </Button>
  );
};

export default ArchiveCourse;
