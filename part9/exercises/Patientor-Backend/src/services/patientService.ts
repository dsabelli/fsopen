import patientData from "../../data/patients";
import { Patients, PatientsNoSSN } from "../types";

const patients: Patients[] = patientData;

const getPatients = (): PatientsNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default getPatients;
