import { Action, Dispatch } from "@reduxjs/toolkit";
import {
  addTodayTask,
  filterCurrentById,
  setIsTimer,
  setMessage,
  setMessageModal,
  setStartTimeById,
} from "../store/slices/tasksSlice";
import { saveToLocalStorage } from "./localStorageHelpers";
import { stopTimer } from "./timer";

export const handleStartTask = (
  dispatch: Dispatch<Action>,
  id: number,
  isTimer: boolean
) => {
  if (!isTimer) {
    dispatch(setIsTimer(true));
    dispatch(setStartTimeById(id));
  } else {
    dispatch(setMessage("Задачи длительностью менее 10 секунд не сохраняюся"));
    dispatch(setMessageModal(true));
  }
};
export const handleStopTask = (
  dispatch: Dispatch<Action>,
  timer: number,
  body: string,
  startTime: number,
  id: number,
  setTimer: (n: number) => void,
  intervalRef: React.MutableRefObject<number | null>,
  date: string
) => {
  if (timer > 10000) {
    dispatch(
      addTodayTask({
        body,
        startTime,
        id,
        date,
        endTime: new Date().getTime(),
      })
    );
  } else {
    dispatch(setMessage("Задачи длительностью менее 10 секунд не сохраняюся"));
    dispatch(setMessageModal(true));
  }
  setTimer(0);
  saveToLocalStorage("timer", 0);
  stopTimer(intervalRef);
  dispatch(setIsTimer(false));
  dispatch(filterCurrentById(id));
};
