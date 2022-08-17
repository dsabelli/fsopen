import { CoursePart } from "../types";
import Parts from "./Parts";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      <Parts courseParts={courseParts} />
    </div>
  );
};

export default Content;
