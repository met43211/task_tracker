import { Action, Dispatch } from "@reduxjs/toolkit";
import { ITask } from "../models/ITask";
import {
  addPassedByDateAndId,
  addTodayTask,
  editCurrentById,
  editTodayById,
  filterCurrentById,
  filterPassedByDateAndId,
  filterTodayById,
  setEditModal,
  setIsTimer,
} from "../store/slices/tasksSlice";
import { saveToLocalStorage } from "./localStorageHelpers";
import { parseTimeToMilliseconds } from "./formatTime";
import { isValidTimeFormat } from "./isValid";
import { getDateWithoutTime } from "./getDateWithoutTime";

export const deleteTask = (dispatch: Dispatch<Action>, task: ITask) => {
  if (task.date === new Date().toISOString().slice(0, 10)) {
    if (task.endTime) {
      dispatch(filterTodayById(task.id));
    } else {
      if (task.startTime) {
        dispatch(setIsTimer(false));
        saveToLocalStorage("timer", 0);
      }
      dispatch(filterCurrentById(task.id));
    }
  } else {
    dispatch(filterPassedByDateAndId({ date: task.date, id: task.id }));
  }
};

interface newDataI {
  body: string;
  startTime: string;
  endTime: string;
  id: number;
  date: string;
}

export const editTask = (
  dispatch: Dispatch<Action>,
  task: ITask,
  newData: newDataI
) => {
  if (!task.endTime) {
    if (newData.body.length > 0) {
      dispatch(editCurrentById({ ...task, body: newData.body }));
      dispatch(setEditModal(false));
    } else {
      alert("Некорректные данные");
    }
  } else {
    const sT = parseTimeToMilliseconds(newData.startTime);
    const eT = parseTimeToMilliseconds(newData.endTime);
    if (
      task.body.length > 0 &&
      isValidTimeFormat(newData.startTime) &&
      isValidTimeFormat(newData.endTime) &&
      sT <= eT
    ) {
      const newTask = {
        ...task,
        body: newData.body,
        startTime: sT,
        endTime: eT,
        date: newData.date,
      };
      if (newData.date === new Date().toISOString().slice(0, 10)) {
        if (new Date(task.date) < new Date(getDateWithoutTime(new Date()))) {
          dispatch(addTodayTask(newTask));
          dispatch(filterPassedByDateAndId(task));
        } else {
          dispatch(editTodayById(newTask));
        }
      } else {
        dispatch(filterPassedByDateAndId(task));
        dispatch(filterTodayById(newTask.id));
        dispatch(addPassedByDateAndId(newTask));
      }
      dispatch(setEditModal(false));
    } else {
      alert("Некорректные данные");
    }
  }
};
