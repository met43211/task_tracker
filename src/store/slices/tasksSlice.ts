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

const passedTasks = [
  {
    date: "2024-05-17",
    tasks: [
      {
        id: 1,
        body: "Текст для тестовой задачи",
        startTime: 70000000,
        endTime: 75000000,
        date: "2024-05-17",
      },
      {
        id: 2,
        body: "Текст для тестовой задачи",
        startTime: 65000000,
        endTime: 69500000,
        date: "2024-05-17",
      },
    ],
  },
  {
    date: "2024-05-15",
    tasks: [
      {
        id: 3,
        body: "Текст для тестовой задачи",
        startTime: 70000000,
        endTime: 75000000,
        date: "2024-05-15",
      },
      {
        id: 4,
        body: "Текст для тестовой задачи",
        startTime: 57000000,
        endTime: 97500000,
        date: "2024-05-15",
      },
    ],
  },
  {
    date: "2024-05-14",
    tasks: [
      {
        id: 5,
        body: "Текст для тестовой задачи",
        startTime: 70500000,
        endTime: 79500000,
        date: "2024-05-14",
      },
      {
        id: 6,
        body: "Текст для тестовой задачи",
        startTime: 70000000,
        endTime: 75000000,
        date: "2024-05-14",
      },
    ],
  },
];

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
  passedTasks: getFromLocalStorage("passedTasks") || passedTasks,
  showMore: false,
  isTimer: Boolean(getFromLocalStorage("isTimer")) || false,
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
    addCurrentTask(state, action) {
      state.currentTasks.unshift(action.payload);
      saveToLocalStorage("currentTasks", state.currentTasks);
    },
    addTodayTask(state, action) {
      state.todayTasks.push(action.payload);
      sortTodayTasks(state.todayTasks);
      saveToLocalStorage("todayTasks", state.todayTasks);
    },
    changeCurrentOrder(state, action) {
      const current = action.payload.current;
      const over = action.payload.over;
      const currentIndex = state.currentTasks.findIndex(
        (task) => task.id === current.id
      );
      const overIndex = state.currentTasks.findIndex(
        (task) => task.id === over.id
      );
      if (currentIndex !== -1 && overIndex !== -1) {
        const updatedCurrentTasks = [...state.currentTasks];
        [updatedCurrentTasks[currentIndex], updatedCurrentTasks[overIndex]] = [
          updatedCurrentTasks[overIndex],
          updatedCurrentTasks[currentIndex],
        ];
        state.currentTasks = updatedCurrentTasks;
        saveToLocalStorage("currentTasks", updatedCurrentTasks);
      }
    },
    setShowMore(state, action) {
      state.showMore = action.payload;
    },
    setIsTimer(state, action) {
      saveToLocalStorage("isTimer", action.payload);
      state.isTimer = action.payload;
    },
    setStartTimeById(state, action) {
      state.currentTasks = setStartTime(state.currentTasks, action.payload);
      saveToLocalStorage("currentTasks", state.currentTasks);
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
    addPassedByDateAndId(state, action) {
      addPassedTask(state.passedTasks, action.payload);
      sortPassedTasks(state.passedTasks);
      saveToLocalStorage("passedTasks", state.passedTasks);
    },
    filterCurrentById(state, action) {
      state.currentTasks = state.currentTasks.filter(
        (task) => task.id != action.payload
      );
      saveToLocalStorage("currentTasks", state.currentTasks);
    },
    filterTodayById(state, action) {
      state.todayTasks = state.todayTasks.filter(
        (task) => task.id != action.payload
      );
      saveToLocalStorage("todayTasks", state.todayTasks);
    },
    filterPassedByDateAndId(state, action) {
      state.passedTasks = state.passedTasks.map((date) => {
        if (date.date === action.payload.date) {
          return {
            ...date,
            tasks: date.tasks.filter((task) => task.id !== action.payload.id),
          };
        }
        return date;
      });
      state.passedTasks = state.passedTasks.filter(
        (date) => date.tasks.length > 0
      );
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
