import diaryData from "../../data/diaries";
import { DiaryEntry } from "../types";

const diaries: Array<DiaryEntry> = diaryData;

const getNonSensitiveEntries = (): Omit<DiaryEntry, "comment">[] => {
  return diaries;
};

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
};
