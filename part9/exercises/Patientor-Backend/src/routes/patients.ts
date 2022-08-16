import express from "express";
import toNewPatient from "../../utils/utils";
import patientService from "../services/patientService";
const router = express.Router();

router.get("/", (_req: any, res: any) => {
  res.json(patientService.getPatients());
});

router.post("/", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient = patientService.createPatients(toNewPatient(req.body));
  res.json(newPatient);
});

export default router;
