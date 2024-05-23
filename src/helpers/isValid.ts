import { getDateWithoutTime } from "./getDateWithoutTime";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const isValidTimeFormat = (timeString: string) => {
  return timeRegex.test(timeString);
};
export const isDateValid = (selectedDate: string) => {
  const today = getDateWithoutTime(new Date());
  const inputDate = getDateWithoutTime(new Date(selectedDate));
  return new Date(inputDate) <= new Date(today);
};
