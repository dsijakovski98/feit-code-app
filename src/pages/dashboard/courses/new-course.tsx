import { Link } from "react-router-dom";

import NewCourseForm from "@/components/Courses/Forms/NewCourseForm";
import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";

const NewCoursePage = () => {
  return (
    <section className="bg-main flex h-auto items-start gap-4 px-8 py-6 lg:flex-col lg:justify-start lg:gap-6 lg:px-6">
      <Link
        to={ROUTES.courses}
        className="flex w-fit items-center gap-1 font-semibold uppercase transition-colors hover:text-primary-500 focus:text-primary-500 lg:-translate-x-1 lg:gap-0.5 lg:text-lg"
      >
        <Icon name="left" className="h-6 w-6" />
        Courses
      </Link>

      <div className="mx-auto w-[75ch] -translate-x-[50px] -translate-y-1 xl:translate-x-0 lg:w-full lg:translate-y-0">
        <NewCourseForm />
      </div>
    </section>
  );
};

export default NewCoursePage;
