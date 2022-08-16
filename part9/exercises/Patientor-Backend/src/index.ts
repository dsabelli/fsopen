import cors from "cors";
import express from "express";
import { getDiagnoses } from "./services/diagnoseService";
import getPatients from "./services/patientService";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = 3001;

app.get("/api/diagnoses", (_req: any, res: any) => {
  res.json(getDiagnoses());
});

app.get("/api/patients", (_req: any, res: any) => {
  res.json(getPatients());
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
