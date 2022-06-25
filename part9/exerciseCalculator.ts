interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exercise: Array<number>,
  target: number
): Results => {
  const trained = exercise.filter((days) => days !== 0).length;
  let succeeded: boolean = true;

  for (let day of exercise) {
    if (day === 0) succeeded = false;
    else if (exercise.reduce((a, b) => a + b, 0) < target * trained)
      succeeded = false;
  }

  const avg: number = exercise.reduce((a, b) => a + b, 0) / exercise.length;

  return {
    periodLength: exercise.length,
    trainingDays: trained,
    success: succeeded,
    rating: Math.round(avg),
    ratingDescription: "cool",
    target: target,
    average: avg,
  };
};

console.log(calculateExercises([1, 2, 3, 1, 3, 3, 3], 4));
