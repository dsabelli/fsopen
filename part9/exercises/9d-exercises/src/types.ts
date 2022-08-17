interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseRequirementsPart extends CourseDescription {
  type: "special";
  exerciseCount: 21;
  requirements: ["nodejs", "jest"];
}

type CoursePart =
  | CourseDescription
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseRequirementsPart;

export type {
  CoursePartBase,
  CoursePart,
  CourseNormalPart,
  CourseProjectPart,
  CourseSubmissionPart,
  CourseRequirementsPart,
};
