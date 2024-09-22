import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const EmptyAssistantCourses = () => {
  // TODO: Send notification to professor, requesting to TA a course
  return (
    <div className="grid place-items-center gap-4 p-8 text-center">
      <p className="font-semibold text-foreground-300">You are not assisting on any courses yet.</p>

      <Button color="primary" startContent={<Icon name="help" className="h-5 w-5" />}>
        Request TA Position
      </Button>
    </div>
  );
};

export default EmptyAssistantCourses;
