import { CourseProps } from "../types";

const Total = ({ courseParts }: { courseParts: Array<CourseProps> }) => {
  const courseTotal: number = courseParts.reduce(
    (a, b) => a + b.exerciseCount,
    0
  );

  return <p>Number of exercises {courseTotal}</p>;
};

export default Total;
