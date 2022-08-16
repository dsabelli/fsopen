import express from "express";
import patientService from "../services/patientService";
const router = express.Router();

router.get("/", (_req: any, res: any) => {
  res.json(patientService.getPatients());
});

router.post("/", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  console.log(req.body);

  const newPatient = patientService.createPatients({ ...req.body });
  res.json(newPatient);
});

export default router;
