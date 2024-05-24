import { IRoute } from "./models/IRoute";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";

export const routes: IRoute[] = [
  {
    component: MainPage,
    route: "/task_tracker",
  },
  {
    component: AuthPage,
    route: "/task_tracker/auth",
  },
];

export const passedTasksConst = [
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
