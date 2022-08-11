interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (arr: number[], target: number): ExerciseValues => {
  return {
    periodLength: arr.length,
    trainingDays: arr.filter((a) => Number(a) !== Number(0)).length,
    success: arr.find((a) => a < target && a !== 0) ? false : true,
    rating: 2,
    ratingDescription: "Do better",
    target: target,
    average: arr.reduce((sum, current) => sum + current, 0) / arr.length,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 3], 2));

export default calculateExercises;
