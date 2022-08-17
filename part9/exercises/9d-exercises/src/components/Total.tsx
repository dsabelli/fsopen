import { CoursePartBase } from "../types";

const Total = ({ courseParts }: { courseParts: Array<CoursePartBase> }) => {
  const courseTotal: number = courseParts.reduce(
    (a, b) => a + b.exerciseCount,
    0
  );

  return <p>Number of exercises {courseTotal}</p>;
};

export default Total;
