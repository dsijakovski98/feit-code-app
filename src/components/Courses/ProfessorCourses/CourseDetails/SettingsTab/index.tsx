import { Accordion, AccordionItem } from "@nextui-org/react";

import CourseDangerZone from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/CourseDangerZone";
import EditCourseForm from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/EditCourseForm";
import Icon from "@/components/ui/Icon";

const SettingsTab = () => {
  return (
    <Accordion
      variant="splitted"
      defaultExpandedKeys={["edit"]}
      itemClasses={{
        trigger: "py-4 px-2",
        title: "text-lg font-semibold",
        subtitle: "font-medium text-foreground-300",
        base: "bg-transparent mx-8 mb-4 shadow-lg border border-content3 dark:border-content2",
        content: "px-8 pb-4 -translate-y-4",
        indicator: "!rotate-0 w-6 h-6 text-foreground",
      }}
    >
      <AccordionItem
        key="edit"
        title="Edit Course"
        subtitle="Update the details of this course"
        indicator={<Icon name="edit" />}
      >
        <EditCourseForm />
      </AccordionItem>

      <AccordionItem
        key="danger"
        title="Danger Zone"
        subtitle="Be careful operating in here"
        indicator={<Icon name="info" className="text-danger" />}
        classNames={{ title: "text-danger text-lg font-semibold" }}
      >
        <CourseDangerZone />
      </AccordionItem>
    </Accordion>
  );
};

export default SettingsTab;
