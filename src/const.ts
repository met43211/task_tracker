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
        startTime: 1715973960000,
        endTime: 1715979000000,
        date: "2024-05-17",
      },
      {
        id: 2,
        body: "Текст для тестовой задачи",
        startTime: 1715968980000,
        endTime: 1715973480000,
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
        startTime: 1715973960000,
        endTime: 1715979000000,
        date: "2024-05-15",
      },
      {
        id: 4,
        body: "Текст для тестовой задачи",
        startTime: 1715961000000,
        endTime: 1715964000000,
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
        startTime: 1715974500000,
        endTime: 1715976300000,
        date: "2024-05-14",
      },
      {
        id: 6,
        body: "Текст для тестовой задачи",
        startTime: 1715961000000,
        endTime: 1715964000000,
        date: "2024-05-14",
      },
    ],
  },
];
