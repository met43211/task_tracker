import { Dispatch } from "react";
import { ITask } from "../models/ITask";
import { Action } from "@reduxjs/toolkit";
import {
  addPassedByDateAndId,
  filterCurrentById,
  filterTodayById,
} from "../store/slices/tasksSlice";

export const checkIsTasksStillToday = (
  today: ITask[],
  current: ITask[],
  dispatch: Dispatch<Action>
) => {
  today.forEach((task) => {
    if (task.date != new Date().toISOString().slice(0, 10)) {
      addPassedByDateAndId(task);
      dispatch(filterTodayById(task.id));
    }
  });
  current.forEach((task) => {
    if (task.date != new Date().toISOString().slice(0, 10)) {
      dispatch(filterCurrentById(task.id));
    }
  });
};
