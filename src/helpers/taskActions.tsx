import { Action, Dispatch } from "@reduxjs/toolkit";
import ModalMessage from "../components/ModalMessage/ModalMessage";
import {
  addTodayTask,
  filterCurrentById,
  setIsTimer,
  setModal,
  setModalComponent,
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
    dispatch(
      setModalComponent(
        <ModalMessage>Сначала завершите текущую задачу</ModalMessage>
      )
    );
    dispatch(setModal(true));
  }
};
export const handleStopTask = (
  dispatch: Dispatch<Action>,
  timer: number,
  body: string,
  startTime: number,
  id: number,
  setTimer: (n: number) => void,
  intervalRefCurrent: number | null,
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
    dispatch(
      setModalComponent(
        <ModalMessage>
          Задачи длительностью менее 10 секунд не сохраняюся
        </ModalMessage>
      )
    );
    dispatch(setModal(true));
  }
  setTimer(0);
  saveToLocalStorage("timer", 0);
  stopTimer(intervalRefCurrent);
  dispatch(setIsTimer(false));
  dispatch(filterCurrentById(id));
};
