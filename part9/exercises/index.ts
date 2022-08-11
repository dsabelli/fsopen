import express from "express";
import "dotenv/config";
import calculateBMI from "./bmiCalculator";
const app = express();

app.get("/hello", (_req: any, res: any) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: any, res: any) => {
  const query = req.query;
  const weight = query.weight;
  const height = query.height;
  const bmi = calculateBMI(height, weight);
  res.json({ weight, height, bmi });

  res.json();
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on port ${process.env.PORT || 3001}`);
});
