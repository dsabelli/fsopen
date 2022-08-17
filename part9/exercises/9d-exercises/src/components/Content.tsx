import { CourseProps } from "../types";

const Content = ({ courseParts }: { courseParts: Array<CourseProps> }) => {
  const courses: Array<JSX.Element> = courseParts.map((course) => (
    <p key={courseParts.indexOf(course)}>
      {course.name} {course.exerciseCount}
    </p>
  ));

  return <div>{courses}</div>;
};

export default Content;
