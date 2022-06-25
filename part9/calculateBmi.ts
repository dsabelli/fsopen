const calculateBmi = (height: number, weight: number): string | number => {
  const result = Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10;

  if (result < 18.5) return "Underweight " + result;
  else if (result < 25.0) return "Normal " + result;
  else if (result < 30.0) return "Overweight " + result;
  else return "Obese " + result;
};
console.log(calculateBmi(173, 71));
