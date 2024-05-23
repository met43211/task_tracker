import { Route, Routes } from "react-router-dom";
import { routes } from "./const";
import { IRoute } from "./models/IRoute";

function Router() {
  return (
    <Routes>
      {routes.map((route: IRoute) => (
        <Route
          key={route.route}
          path={route.route}
          element={<route.component />}
        />
      ))}
    </Routes>
  );
}

export default Router;
