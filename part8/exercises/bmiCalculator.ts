interface BMIValues {
  height: number;
  weight: number;
}

const parseArgs = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error("Not Enough Arguments");
  if (args.length > 4) throw new Error("Too Many Arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBMI = (height: number, weight: number): string => {
  let bmi: number = weight / Math.pow(height / 100, 2);
  let category: string;
  bmi < 18.5
    ? (category = "Underweight")
    : bmi > 24.9
    ? (category = "Overweight")
    : (category = "Normal");

  return category;
};

try {
  const { height, weight } = parseArgs(process.argv);
  console.log(calculateBMI(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error " + error.message;
  }

  console.log(errorMessage);
}

//take in height and weight number args
//multiply args and compare to BMI range
//return category string depending on the number
