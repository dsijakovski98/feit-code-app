import { UserCoursesContext } from "@/context/UserCoursesContext";
import { useCtx } from "@/hooks/useCtx";
import { FCUser } from "@/hooks/useFCUser";

type Props = {
  userData: NonNullable<FCUser>;
};

const LatestExams = ({ userData }: Props) => {
  const { courseIds } = useCtx(UserCoursesContext);

  return <div>LatestExams</div>;
};

export default LatestExams;
