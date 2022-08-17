import { CoursePart } from "../types";

const Parts = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const courses = courseParts.map((part) => {
    switch (part.type) {
      case "normal":
        return (
          <p key={courseParts.indexOf(part)}>
            {part.name} {part.exerciseCount} <br /> {part.description}
          </p>
        );

      case "groupProject":
        return (
          <p key={courseParts.indexOf(part)}>
            {part.name} {part.exerciseCount} <br /> {part.groupProjectCount}
          </p>
        );

      case "submission":
        return (
          <p key={courseParts.indexOf(part)}>
            {part.name} {part.exerciseCount} <br /> {part.description}
          </p>
        );

      case "special":
        return (
          <p key={courseParts.indexOf(part)}>
            {part.name} {part.exerciseCount} <br /> {part.description}
          </p>
        );

      default:
        return assertNever(part);
    }
  });

  return <div>{courses}</div>;
};

export default Parts;
