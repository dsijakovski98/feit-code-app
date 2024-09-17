import { Link } from "react-router-dom";

import NewCourseForm from "@/components/Courses/Forms/NewCourseForm";
import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";

const NewCoursePage = () => {
  const { isMobile } = useCtx(ResponsiveContext);

  return (
    <section className="grid h-full grid-rows-[auto_1fr] gap-4 px-8 py-6 lg:gap-8">
      <Link
        to={ROUTES.courses}
        className="flex w-fit items-center gap-1 text-lg font-bold uppercase transition-colors hover:text-primary-500 focus:text-primary-500 lg:text-base"
      >
        <Icon name="back" className="h-6 w-6 lg:h-5 lg:w-5" />
        {isMobile && "Back to"} Courses
      </Link>

      <div className="mx-auto h-full w-[75ch] lg:w-full lg:translate-y-0">
        <NewCourseForm />
      </div>
    </section>
  );
};

export default NewCoursePage;
