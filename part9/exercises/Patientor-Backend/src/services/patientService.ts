import { v1 as uuid } from "uuid";
import patientData from "../../data/patients";
import { NewPatient, Patients, PatientsNoSSN } from "../types";

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

const createPatients = (entry: NewPatient): Patients => {
  const newPatient = { ...entry, id: uuid() };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, createPatients };
