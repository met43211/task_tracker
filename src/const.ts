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
