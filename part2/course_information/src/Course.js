const Course = ({ courses }) => {
  console.log(courses);

  const partElements = courses.map((course) =>
    course.parts.map((part) => (
      <li key={part.id}>
        {part.name} {part.exercises}
      </li>
    ))
  );

  const total = courses.map((course) =>
    course.parts.reduce((sum, current) => sum + current.exercises, 0)
  );

  const courseNames = courses.map((course) => (
    <>
      <h2 key={course.id}>{course.name}</h2>
      <ul>{partElements[course.id - 1]}</ul>
      <p>
        <strong>{`total of ${total[course.id - 1]} exercises`}</strong>
      </p>
    </>
  ));

  return <>{courseNames}</>;
};

export default Course;
