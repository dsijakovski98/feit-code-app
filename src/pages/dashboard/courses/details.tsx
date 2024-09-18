import { useParams } from "react-router-dom";

const CourseDetails = () => {
  // TODO: Implement Course details page
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return <div>CourseDetails</div>;
};

export default CourseDetails;
