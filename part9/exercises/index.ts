import "dotenv/config";
import express from "express";
import calculateBMI from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req: any, res: any) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: any, res: any) => {
  // const query = req.query;
  // const weight = query.weight;
  // const height = query.height;
  const { weight, height } = req.query;
  const bmi = calculateBMI(height, weight);
  res.json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  const { exercises, target } = req.body;

  const response = calculateExercises(exercises, target);
  res.json(response);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on port ${process.env.PORT || 3001}`);
});
