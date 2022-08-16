import diaryData from "../../data/diaries";
import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const diaries: Array<DiaryEntry> = diaryData;

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
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
