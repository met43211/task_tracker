import { createSlice } from "@reduxjs/toolkit";
import { IPassedTask, ITask } from "../../models/ITask";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../helpers/localStorageHelpers";
import {
  sortPassedTasks,
  sortTodayTasks,
} from "../../helpers/tasksSliceHelpers/sortTasks";
import { setStartTime } from "../../helpers/tasksSliceHelpers/setStartTime";
import { addPassedTask } from "../../helpers/tasksSliceHelpers/addTasks";
import { editCurrentOrTodayTask } from "../../helpers/tasksSliceHelpers/editTasks";
import { filterPassedTasks } from "../../helpers/tasksSliceHelpers/filterTasks";
import { changeOrder } from "../../helpers/tasksSliceHelpers/cnahgeOrder";

interface TasksState {
  currentTasks: ITask[];
  todayTasks: ITask[];
  passedTasks: IPassedTask[];
  showMore: boolean;
  isTimer: boolean;
  messageModal: boolean;
  editModal: boolean;
  pickedTask: ITask | null;
  message: string;
  potentialId: number | null;
  isDragging: boolean;
}

const initialState: TasksState = {
  currentTasks: getFromLocalStorage("currentTasks") || [],
  todayTasks: getFromLocalStorage("todayTasks") || [],
  passedTasks: getFromLocalStorage("passedTasks") || [],
  showMore: false,
  isTimer: false,
  messageModal: false,
  editModal: false,
  pickedTask: null,
  message: "",
  potentialId: null,
  isDragging: false,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setPotentialId(state, action) {
      state.potentialId = action.payload;
    },
    setIsDragging(state, action) {
      state.isDragging = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setMessageModal(state, action) {
      state.messageModal = action.payload;
    },
    setEditModal(state, action) {
      state.editModal = action.payload;
    },
    setPickedTask(state, action) {
      state.pickedTask = action.payload;
    },
    setShowMore(state, action) {
      state.showMore = action.payload;
    },
    setIsTimer(state, action) {
      state.isTimer = action.payload;
    },
    setStartTimeById(state, action) {
      state.currentTasks = setStartTime(state.currentTasks, action.payload);
      saveToLocalStorage("currentTasks", state.currentTasks);
    },
    addCurrentTask(state, action) {
      state.currentTasks.unshift(action.payload);
      saveToLocalStorage("currentTasks", state.currentTasks);
    },
    addPassedByDateAndId(state, action) {
      addPassedTask(state.passedTasks, action.payload);
      saveToLocalStorage("passedTasks", state.passedTasks);
      state.passedTasks = sortPassedTasks(getFromLocalStorage("passedTasks"));
      saveToLocalStorage("passedTasks", state.passedTasks);
    },
    addTodayTask(state, action) {
      state.todayTasks.push(action.payload);
      sortTodayTasks(state.todayTasks);
      saveToLocalStorage("todayTasks", state.todayTasks);
    },
    editCurrentById(state, action) {
      state.currentTasks = editCurrentOrTodayTask(
        state.currentTasks,
        action.payload
      );
      saveToLocalStorage("currentTasks", state.currentTasks);
    },
    editTodayById(state, action) {
      state.todayTasks = editCurrentOrTodayTask(
        state.todayTasks,
        action.payload
      );
      sortTodayTasks(state.todayTasks);
      saveToLocalStorage("todayTasks", state.todayTasks);
    },
    changeCurrentOrder(state, action) {
      state.currentTasks =
        changeOrder(
          state.currentTasks,
          action.payload.current,
          action.payload.over
        ) || state.currentTasks;
      saveToLocalStorage("currentTasks", state.currentTasks);
    },
    filterCurrentById(state, action) {
      state.currentTasks = state.currentTasks.filter(
        (task) => task.id != action.payload
      );
      if (!state.currentTasks) {
        state.isTimer = false;
      }
      saveToLocalStorage("currentTasks", state.currentTasks);
    },
    filterTodayById(state, action) {
      state.todayTasks = state.todayTasks.filter(
        (task) => task.id != action.payload
      );
      saveToLocalStorage("todayTasks", state.todayTasks);
    },
    filterPassedByDateAndId(state, action) {
      state.passedTasks = filterPassedTasks(state.passedTasks, action.payload);
      saveToLocalStorage("passedTasks", state.passedTasks);
    },
  },
});

export const tasksReducer = tasksSlice.reducer;
export const {
  addCurrentTask,
  setIsDragging,
  setPotentialId,
  setShowMore,
  addTodayTask,
  filterCurrentById,
  setIsTimer,
  setStartTimeById,
  setMessageModal,
  filterTodayById,
  editCurrentById,
  filterPassedByDateAndId,
  editTodayById,
  addPassedByDateAndId,
  changeCurrentOrder,
  setMessage,
  setEditModal,
  setPickedTask,
} = tasksSlice.actions;
